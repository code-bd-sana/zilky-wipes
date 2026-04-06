"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type ProductCardProps = {
  productId: string;
  image: string;
  imageAlt: string;
  name: string;
  price: number;
  tags: string[];
  subscribeLabel?: string;
  imageLoading?: "eager" | "lazy";
};

export default function ProductCard({
  productId,
  image,
  imageAlt = "Product image",
  subscribeLabel = "Subscribe & Save 15%",
  name,
  price,
  tags = [],
  imageLoading = "lazy",
}: ProductCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const livePriceLabel = `Price: $${(price * quantity).toFixed(2)}`;

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    toast.success("Product successfully added to cart.", {
      description: `${name} x${quantity}`,
    });
  };

  const handleOpenDetails = () => {
    router.push(`/shop/${productId}`);
  };

  return (
    <div className='group flex w-full cursor-pointer flex-col overflow-hidden'>
      <div
        className='relative flex h-104 sm:h-120 md:h-140 items-center justify-center px-4 sm:px-5 md:px-6 pb-3 md:pb-4 pt-4 md:pt-6 bg-(--shop-card-bg) transition-colors duration-250 group-hover:bg-(--shop-card-hover-bg)'
        onClick={handleOpenDetails}>
        {subscribeLabel ? (
          <span className='absolute left-3 md:left-4 top-3 md:top-4 whitespace-nowrap rounded-[15px] border border-(--shop-badge-border) bg-white px-2.5 md:px-3 py-0.5 md:py-1 text-sm md:text-base text-(--shop-badge-text) group-hover:hidden'>
            {subscribeLabel}
          </span>
        ) : null}

        <span className='absolute left-3 md:left-4 top-3 md:top-4 hidden whitespace-nowrap rounded-[15px] border border-(--shop-badge-border) bg-white px-2.5 md:px-3 py-0.5 md:py-1 text-sm md:text-base text-(--shop-badge-text) group-hover:inline-flex'>
          {livePriceLabel}
        </span>

        <div className='relative h-[88%] w-[88%] transition-opacity duration-250 group-hover:opacity-0'>
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
          className='absolute inset-x-5 bottom-5 hidden flex-col gap-3 group-hover:flex'
          onClick={(event) => event.stopPropagation()}>
          <div
            className='flex h-12 md:h-14 items-center justify-between rounded-full border border-white px-4 md:px-5 text-white'
            onClick={(event) => event.stopPropagation()}>
            <button
              type='button'
              aria-label='Decrease quantity'
              onClick={(event) => {
                event.stopPropagation();
                handleDecrease();
              }}
              className='text-2xl md:text-3xl leading-none transition-opacity hover:opacity-80'>
              -
            </button>
            <span className='text-xl md:text-2xl leading-none'>{quantity}</span>
            <button
              type='button'
              aria-label='Increase quantity'
              onClick={(event) => {
                event.stopPropagation();
                handleIncrease();
              }}
              className='text-2xl md:text-3xl leading-none transition-opacity hover:opacity-80'>
              +
            </button>
          </div>

          <button
            type='button'
            onClick={(event) => {
              event.stopPropagation();
              handleAddToCart();
            }}
            className='h-12 md:h-14 rounded-full bg-white text-base md:text-lg font-medium text-(--text-primary) transition-opacity hover:opacity-90'>
            Add to Cart
          </button>
        </div>

        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            handleAddToCart();
          }}
          className='absolute inset-x-4 md:inset-x-5 bottom-4 md:bottom-5 flex h-13 md:h-16 items-center justify-between rounded-full bg-white px-5 md:px-6 text-(--text-primary) transition-opacity group-hover:hidden'>
          <span className='text-base md:text-lg font-medium leading-none'>Add to Cart</span>
          <span className='text-3xl md:text-4xl leading-none'>+</span>
        </button>
      </div>

      <div className='flex flex-col gap-2 pb-5 pt-1' onClick={handleOpenDetails}>
        <div>
          <h3 className='text-xl md:text-2xl leading-snug text-(--text-primary)'>
            {name}
          </h3>
          <p className='mt-0.5 text-xl md:text-2xl text-(--text-primary)'>
            ${price.toFixed(2)}
          </p>
        </div>

        {tags.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className='rounded-full border border-(--text-primary) bg-transparent px-2.5 py-0.5 text-sm md:text-base font-medium text-(--text-primary)'>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
