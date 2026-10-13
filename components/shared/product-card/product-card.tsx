"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  
  const currentCartQuantity = (cartItems.find(i => i.productVariantId === (variantId || productId))?.quantity || 0);
  const availableToAdd = Math.max(0, stock - currentCartQuantity);

  const handleAddToCart = () => {
    if (availableToAdd <= 0) {
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
      quantity: 1,
      image,
      maxStock: stock,
    });

    toast.success("Product successfully added to cart.", {
      description: `${name} added to cart`,
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
        className='relative flex h-80 sm:h-88 md:h-100 lg:h-115 xl:h-130 2xl:h-145 items-center justify-center px-3 sm:px-4 md:px-6 pb-3 md:pb-4 pt-4 md:pt-6 bg-(--shop-card-bg) rounded-2xl sm:rounded-3xl overflow-hidden'
        onClick={handleOpenDetails}>
        {subscribeLabel ? (
          <span className='absolute left-2.5 sm:left-3 md:left-4 top-2.5 sm:top-3 md:top-4 z-10 whitespace-nowrap rounded-[12px] sm:rounded-[15px] border border-(--shop-badge-border) bg-white px-2 sm:px-2.5 md:px-3 py-0.5 md:py-1 text-xs sm:text-sm md:text-base text-(--shop-badge-text) shadow-xs'>
            {subscribeLabel}
          </span>
        ) : null}

        <div className='relative h-[85%] w-[85%] transition-transform duration-300 ease-out group-hover:scale-108'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={100}
            loading={imageLoading}
            sizes='(min-width: 1536px) 33vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
            className='object-contain drop-shadow-md'
          />
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
          className='absolute inset-x-3 sm:inset-x-4 md:inset-x-5 bottom-3 sm:bottom-4 md:bottom-5 z-10 flex h-11 sm:h-13 md:h-15 items-center justify-between rounded-full bg-white px-4 sm:px-5 md:px-6 text-(--text-primary) transition-all duration-200 hover:bg-neutral-50 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'>
          <span className='text-sm sm:text-base md:text-lg font-medium leading-none'>
            {hasMultipleVariants || hasSubscriptionOption
              ? 'Select Options'
              : stock === 0
                ? 'Out of Stock'
                : availableToAdd === 0
                  ? 'Max Reached'
                  : 'Add to Cart'}
          </span>
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
