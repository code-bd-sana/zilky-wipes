"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";

type ProductCardProps = {
  productId: string;
  variantId?: string;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  tags: string[];
  subscribeLabel?: string;
  imageLoading?: "eager" | "lazy";
  stock?: number;
  hasMultipleVariants?: boolean;
  hasSubscriptionOption?: boolean;
};

export default function ProductCard({
  productId,
  variantId,
  image,
  imageAlt = "Product image",
  subscribeLabel,
  name,
  price,
  tags = [],
  imageLoading = "lazy",
  stock = 0,
  hasMultipleVariants = false,
  hasSubscriptionOption = false,
}: ProductCardProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [quantity, setQuantity] = useState(1);
  const livePriceLabel = `Price: $${(price * quantity).toFixed(2)}`;

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  
  const currentCartQuantity = (cartItems.find(i => i.productVariantId === (variantId || productId))?.quantity || 0);
  const availableToAdd = Math.max(0, stock - currentCartQuantity);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => Math.min(availableToAdd, current + 1));
  };

  const handleAddToCart = () => {
    if (quantity > availableToAdd) {
      toast.error("Not enough stock available", {
        description: `You already have ${currentCartQuantity} in your cart. Only ${stock} available in total.`
      });
      return;
    }

    addItem({
      productId,
      productVariantId: variantId || productId,
      name,
      price,
      quantity,
      image,
      maxStock: stock,
    });

    setQuantity(1);

    toast.success("Product successfully added to cart.", {
      description: `${name} x${quantity}`,
    });
  };

  const handleOpenDetails = () => {
    router.push(`/shop/${productId}`);
  };

  return (
    <motion.div
      className='group flex w-full cursor-pointer flex-col overflow-hidden'
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              scale: 1.008,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.996,
            }
      }
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
      <div
        className='relative flex h-84 sm:h-96 md:h-120 lg:h-135 items-center justify-center px-3 sm:px-4 md:px-6 pb-3 md:pb-4 pt-4 md:pt-6 bg-(--shop-card-bg) rounded-2xl sm:rounded-3xl overflow-hidden transition-colors duration-250 group-hover:bg-(--shop-card-hover-bg)'
        onClick={handleOpenDetails}>
        {subscribeLabel ? (
          <span className='absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 whitespace-nowrap rounded-[12px] sm:rounded-[15px] border border-(--shop-badge-border) bg-white px-2 sm:px-2.5 md:px-3 py-0.5 md:py-1 text-xs sm:text-sm md:text-base text-(--shop-badge-text) group-hover:hidden shadow-xs'>
            {subscribeLabel}
          </span>
        ) : null}

        <span className='absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 hidden whitespace-nowrap rounded-[12px] sm:rounded-[15px] border border-(--shop-badge-border) bg-white px-2 sm:px-2.5 md:px-3 py-0.5 md:py-1 text-xs sm:text-sm md:text-base text-(--shop-badge-text) group-hover:inline-flex shadow-xs'>
          {livePriceLabel}
        </span>

        <div className='relative h-[85%] w-[85%] transition-opacity duration-250 group-hover:opacity-0'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={100}
            loading={imageLoading}
            sizes='(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 768px) 44vw, 90vw'
            className='object-contain drop-shadow-md'
          />
        </div>

        <div
          className='absolute inset-x-3 sm:inset-x-4 md:inset-x-5 bottom-3 sm:bottom-4 md:bottom-5 hidden flex-col gap-2.5 sm:gap-3 group-hover:flex'
          onClick={(event) => event.stopPropagation()}>
          {!hasMultipleVariants && !hasSubscriptionOption && (
            <div
              className='flex h-11 sm:h-12 md:h-14 items-center justify-between rounded-full border border-white px-3 sm:px-4 md:px-5 text-white'
              onClick={(event) => event.stopPropagation()}>
              <button
                type='button'
                aria-label='Decrease quantity'
                onClick={(event) => {
                  event.stopPropagation();
                  handleDecrease();
                }}
                className='text-xl sm:text-2xl md:text-3xl leading-none transition-opacity hover:opacity-80'>
                -
              </button>
              <span className='text-lg sm:text-xl md:text-2xl leading-none font-medium'>{quantity}</span>
              <button
                type='button'
                aria-label='Increase quantity'
                disabled={quantity >= availableToAdd || availableToAdd === 0}
                onClick={(event) => {
                  event.stopPropagation();
                  handleIncrease();
                }}
                className='text-xl sm:text-2xl md:text-3xl leading-none transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed'>
                +
              </button>
            </div>
          )}

          <button
            type='button'
            disabled={!hasMultipleVariants && !hasSubscriptionOption && availableToAdd === 0}
            onClick={(event) => {
              event.stopPropagation();
              if (hasMultipleVariants || hasSubscriptionOption) {
                handleOpenDetails();
              } else {
                handleAddToCart();
              }
            }}
            className='h-11 sm:h-12 md:h-14 rounded-full bg-white text-sm sm:text-base md:text-lg font-medium text-(--text-primary) transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'>
            {hasMultipleVariants || hasSubscriptionOption ? "Select Options" : stock === 0 ? "Out of Stock" : availableToAdd === 0 ? "Max Reached" : "Add to Cart"}
          </button>
        </div>

        <button
          type='button'
          disabled={!hasMultipleVariants && !hasSubscriptionOption && availableToAdd === 0}
          onClick={(event) => {
            event.stopPropagation();
            if (hasMultipleVariants || hasSubscriptionOption) {
              handleOpenDetails();
            } else {
              handleAddToCart();
            }
          }}
          className='absolute inset-x-3 sm:inset-x-4 md:inset-x-5 bottom-3 sm:bottom-4 md:bottom-5 flex h-11 sm:h-13 md:h-15 items-center justify-between rounded-full bg-white px-4 sm:px-5 md:px-6 text-(--text-primary) transition-opacity group-hover:hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'>
          <span className='text-sm sm:text-base md:text-lg font-medium leading-none'>{hasMultipleVariants || hasSubscriptionOption ? "Select Options" : stock === 0 ? "Out of Stock" : availableToAdd === 0 ? "Max Reached" : "Add to Cart"}</span>
          <span className='text-2xl sm:text-3xl md:text-4xl leading-none'>+</span>
        </button>
      </div>

      <div className='flex flex-col gap-1.5 sm:gap-2 pb-4 pt-2' onClick={handleOpenDetails}>
        <div>
          <h3 className='text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-(--text-primary)'>
            {name}
          </h3>
          <p className='mt-0.5 text-lg sm:text-xl md:text-2xl text-(--text-primary) font-medium'>
            ${price.toFixed(2)}
          </p>
        </div>

        {tags.length > 0 ? (
          <div className='flex flex-wrap gap-1.5 sm:gap-2'>
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className='rounded-full border border-(--text-primary) bg-transparent px-2 sm:px-2.5 py-0.5 text-xs sm:text-sm font-medium text-(--text-primary)'>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
