"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import type { BackendProduct, BackendVariant } from "@/components/dashboard/products/product-list";

type ProductDetailsViewProps = {
  product: BackendProduct;
};

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<BackendVariant | null>(
    product.variants?.[0] || null
  );
  const totalPrice = (selectedVariant?.price || 0) * quantity;
  
  const sections = Array.isArray(product.accordionDetails) ? product.accordionDetails : [];
  const [openSectionTitle, setOpenSectionTitle] = useState(
    sections[0]?.title ?? "",
  );

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    toast.success("Product successfully added to cart.", {
      description: `${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''} x${quantity}`,
    });
  };


  return (
    <section
        className='mx-5 flex min-h-dvh flex-col md:mx-12.5 pb-6 md:pb-8'
      style={{ paddingTop: "5.5rem" }}>
        <div className='grid flex-1 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[1fr_1fr]'>
          <div className='relative min-h-[38vh] sm:min-h-[45vh] bg-(--shop-card-bg) lg:min-h-0 lg:h-full'>
          <Image
            src={product.images?.[0] || ""}
            alt={product.name}
            fill
            quality={100}
            loading='eager'
            sizes='(min-width: 1024px) 50vw, 100vw'
              className='object-contain p-6 sm:p-8 md:p-14'
          />
        </div>

        <div className='flex h-full flex-col'>
          <div>
              <h1 className='font-heading text-4xl sm:text-5xl font-bold leading-none text-(--text-primary) md:text-6xl'>
              {product.name}
            </h1>
              <p className='pt-3 md:pt-4 text-base sm:text-lg leading-relaxed text-(--text-secondary) md:text-2xl'>
              {product.description}
            </p>
          </div>

            <div className='flex flex-1 items-center py-4 md:py-6'>
            <div className='w-full '>
              {sections.map((section: any) => {
                const isOpen = section.title === openSectionTitle;

                return (
                  <div key={section.title} className='border-b border-(--text-primary)'>
                    <button
                      type='button'
                      onClick={() => setOpenSectionTitle(section.title)}
                        className='flex w-full items-center justify-between pt-3 pb-3 md:pb-4 text-left text-base sm:text-lg text-(--text-primary) md:text-2xl'>
                      <span>{section.title}</span>
                      {isOpen ? (
                        <X className='h-5 w-5' />
                      ) : (
                        <Plus className='h-5 w-5' />
                      )}
                    </button>

                    {isOpen ? (
                      <p className='pb-4 md:pb-6 text-sm sm:text-base leading-relaxed text-(--text-secondary)'>
                        {section.content}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className='space-y-4'>
            {product.variants && product.variants.length > 0 && (
              <div className='flex flex-col gap-2 pb-2'>
                <p className='text-sm sm:text-base font-medium text-(--text-secondary)'>Select Option:</p>
                <div className='flex flex-wrap gap-2 md:gap-3'>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type='button'
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-full px-4 py-2 border-2 text-sm sm:text-base transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-(--text-primary) bg-(--text-primary) text-white'
                          : 'border-(--text-primary) text-(--text-primary) hover:bg-(--text-primary)/10'
                      }`}
                    >
                      {variant.name} (${variant.price.toFixed(2)})
                    </button>
                  ))}
                </div>
              </div>
            )}

              <div className='flex h-12 sm:h-14 md:h-18 px-4 sm:px-5 md:px-6 items-center justify-between rounded-full border-2 border-(--text-primary) text-(--text-primary)'>
              <button
                type='button'
                aria-label='Decrease quantity'
                onClick={handleDecrease}
                  className='leading-none'>
                <Minus className='h-5 w-5' />
              </button>
                <span className='text-2xl sm:text-3xl leading-none'>{quantity}</span>
              <button
                type='button'
                aria-label='Increase quantity'
                onClick={handleIncrease}
                  className='leading-none'>
                <Plus className='h-5 w-5' />
              </button>
            </div>

            <button
              type='button'
              onClick={handleAddToCart}
                className='flex h-12 sm:h-14 md:h-18 text-base sm:text-lg md:text-2xl px-4 sm:px-5 md:px-6 w-full items-center justify-between rounded-full bg-(--text-primary) text-white'>
              <span>${totalPrice.toFixed(2)}</span>
              <span className='font-medium'>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
