'use client';

import type { BackendProduct, BackendVariant } from '@/components/dashboard/products/product-list';
import ReviewsSection from '@/components/reviews/reviews-section';
import { useCreateSubscription } from '@/hooks/useSubscriptions';
import { getMediaUrl } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

type ProductDetailsViewProps = {
  product: BackendProduct;
};

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<BackendVariant | null>(
    product.variants?.[0] || null,
  );
  const targetVariant = selectedVariant || product.variants?.[0];

  const rawImages = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const images = rawImages.length > 0 ? rawImages : ['/ZilkyWipes/p.png'];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const safeImageIndex = selectedImageIndex < images.length ? selectedImageIndex : 0;
  const currentImage = images[safeImageIndex] || images[0] || '/ZilkyWipes/p.png';

  const isSubEligible = targetVariant?.subscriptionEligible ?? false;
  const discountRate = (targetVariant?.subscriptionDiscount ?? 15) / 100;
  const basePrice = targetVariant?.price || 0;
  const subPrice = basePrice * (1 - discountRate);

  const [purchaseTypeState, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const purchaseType = isSubEligible ? purchaseTypeState : 'one-time';

  const [frequency, setFrequency] = useState('Every 1 Month');

  const createSubMutation = useCreateSubscription();

  // Subscriptions can now have quantities > 1
  const displayQuantity = quantity;
  const totalPrice = purchaseType === 'subscription' ? subPrice * quantity : basePrice * quantity;

  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const currentCartQuantity = targetVariant
    ? cartItems.find((i) => i.productVariantId === targetVariant.id)?.quantity || 0
    : 0;

  const maxStock = targetVariant?.stock || 0;
  const availableToAdd = Math.max(0, maxStock - currentCartQuantity);

  const sections = Array.isArray(product.accordionDetails) ? product.accordionDetails : [];
  const [openSectionTitle, setOpenSectionTitle] = useState(sections[0]?.title ?? '');

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => Math.min(availableToAdd, current + 1));
  };

  const handleAddToCart = () => {
    if (!targetVariant) {
      toast.error('No variant selected');
      return;
    }

    if (purchaseType === 'subscription') {
      createSubMutation.mutate({
        productVariantId: targetVariant.id || product.id,
        frequency,
        quantity,
      });
      return;
    }

    if (quantity > availableToAdd) {
      toast.error('Not enough stock available', {
        description: `You already have ${currentCartQuantity} in your cart. Only ${maxStock} available in total.`,
      });
      return;
    }

    addItem({
      productId: product.id,
      productVariantId: targetVariant.id || product.id,
      name: product.name,
      variantName: targetVariant.name || '',
      price: targetVariant.price,
      quantity,
      image: currentImage,
      isSubscription: false, // Standard items are false in cart
      maxStock: maxStock,
    });

    // Reset quantity after successful add if the remaining stock allows
    setQuantity(1);

    toast.success('Product successfully added to cart.', {
      description: `${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''} x${quantity}`,
    });
  };

  return (
    <section
      className='w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12.5 2xl:px-16 flex flex-col pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 2xl:pt-40 pb-8 md:pb-12'
    >
      <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-12 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
        <div className='md:col-span-1 lg:col-span-5 xl:col-span-5 flex flex-col items-center justify-center w-full my-auto self-center gap-3 sm:gap-4'>
          {/* Main Image Card */}
          <div className='relative w-full max-w-77.5 sm:max-w-87.5 md:max-w-95 lg:max-w-105 xl:max-w-115 2xl:max-w-120 aspect-square bg-(--shop-card-bg) rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs flex items-center justify-center'>
            <Image
              src={getMediaUrl(currentImage) || currentImage}
              alt={product.name}
              fill
              quality={100}
              loading='eager'
              sizes='(min-width: 1280px) 460px, (min-width: 1024px) 420px, (min-width: 768px) 380px, 310px'
              className='object-contain p-4 sm:p-5 md:p-6 lg:p-7 drop-shadow-md transition-all duration-300'
            />
          </div>

          {/* Thumbnails row (when multiple images exist) */}
          {images.length > 1 && (
            <div className='flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-77.5 sm:max-w-87.5 md:max-w-95 lg:max-w-105 xl:max-w-115 2xl:max-w-120 w-full'>
              {images.map((imgUrl, index) => {
                const isSelected = index === safeImageIndex;
                const resolvedUrl = getMediaUrl(imgUrl) || imgUrl;
                return (
                  <button
                    key={index}
                    type='button'
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl overflow-hidden bg-(--shop-card-bg) transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-(--text-primary) shadow-sm scale-105 opacity-100'
                        : 'border border-black/10 opacity-70 hover:opacity-100 hover:border-black/30'
                    }`}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <Image
                      src={resolvedUrl}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      quality={80}
                      className='object-contain p-1.5 sm:p-2'
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className='md:col-span-1 lg:col-span-7 xl:col-span-7 flex flex-col justify-between'>
          <div>
            <h1 className='font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) leading-tight'>
              {product.name}
            </h1>
            <p className='pt-2 sm:pt-3 text-sm sm:text-base md:text-lg leading-relaxed text-(--text-secondary)'>
              {product.description}
            </p>
          </div>

          <div className='py-4 sm:py-6'>
            <div className='w-full'>
              {sections.map((section: { title: string; content: string }) => {
                const isOpen = section.title === openSectionTitle;

                return (
                  <div key={section.title} className='border-b border-(--text-primary)/20'>
                    <button
                      type='button'
                      onClick={() => setOpenSectionTitle(isOpen ? '' : section.title)}
                      className='flex w-full items-center justify-between py-3 sm:py-3.5 text-left text-sm sm:text-base md:text-lg font-medium text-(--text-primary) hover:text-(--text-primary)/80 transition-colors'
                    >
                      <span>{section.title}</span>
                      {isOpen ? <X className='h-4 w-4 sm:h-5 sm:w-5' /> : <Plus className='h-4 w-4 sm:h-5 sm:w-5' />}
                    </button>

                    {isOpen ? (
                      <p className='pb-3 sm:pb-4 text-xs sm:text-sm md:text-base leading-relaxed text-(--text-secondary)'>
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
              <div className='flex flex-col gap-2 pb-1'>
                <p className='text-xs sm:text-sm font-medium text-(--text-secondary)'>
                  Select Option:
                </p>
                <div className='flex flex-wrap gap-2'>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type='button'
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 border-2 text-xs sm:text-sm font-medium transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-(--text-primary) bg-(--text-primary) text-white shadow-2xs'
                          : 'border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5'
                      }`}
                    >
                      {variant.name} (${variant.price.toFixed(2)})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSubEligible && (
              <div className='flex flex-col gap-2.5 py-3 sm:py-4 border-y border-(--text-primary)/15'>
                <p className='text-xs sm:text-sm font-medium text-(--text-secondary)'>
                  Purchase Type:
                </p>
                <div className='flex flex-col gap-2'>
                  <label className='flex items-center gap-2.5 cursor-pointer'>
                    <input
                      type='radio'
                      name='purchaseType'
                      value='one-time'
                      checked={purchaseType === 'one-time'}
                      onChange={() => setPurchaseType('one-time')}
                      className='w-4 h-4 accent-(--text-primary)'
                    />
                    <span className='text-sm sm:text-base text-(--text-primary)'>
                      One-time purchase (${basePrice.toFixed(2)})
                    </span>
                  </label>

                  <label className='flex items-center gap-2.5 cursor-pointer'>
                    <input
                      type='radio'
                      name='purchaseType'
                      value='subscription'
                      checked={purchaseType === 'subscription'}
                      onChange={() => setPurchaseType('subscription')}
                      className='w-4 h-4 accent-(--text-primary)'
                    />
                    <div className='flex flex-col'>
                      <span className='text-sm sm:text-base font-bold text-(--text-primary)'>
                        Subscribe & Save {discountRate * 100}% (${subPrice.toFixed(2)})
                      </span>
                    </div>
                  </label>
                </div>

                {purchaseType === 'subscription' && (
                  <div className='mt-2 pl-6 sm:pl-7'>
                    <p className='text-xs sm:text-sm mb-1 text-(--text-secondary)'>Deliver:</p>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className='w-full max-w-44 sm:max-w-48 border border-(--text-primary)/30 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-(--text-primary) outline-none focus:ring-1 focus:ring-(--text-primary) bg-white'
                    >
                      <option value='Every 1 Month'>Every 1 Month</option>
                      <option value='Every 2 Months'>Every 2 Months</option>
                      <option value='Every 3 Months'>Every 3 Months</option>
                      <option value='Every 6 Months'>Every 6 Months</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div
              className={`flex h-11 sm:h-13 md:h-15 px-4 sm:px-5 items-center justify-between rounded-full border-2 border-(--text-primary) text-(--text-primary)`}
            >
              <button
                type='button'
                aria-label='Decrease quantity'
                onClick={handleDecrease}
                className='leading-none hover:opacity-75 transition-opacity'
              >
                <Minus className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
              <span className='text-lg sm:text-xl md:text-2xl leading-none font-medium'>{displayQuantity}</span>
              <button
                type='button'
                aria-label='Increase quantity'
                disabled={quantity >= availableToAdd || availableToAdd === 0}
                onClick={handleIncrease}
                className='leading-none disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-75 transition-opacity'
              >
                <Plus className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
            </div>

            <button
              type='button'
              onClick={handleAddToCart}
              disabled={
                createSubMutation.isPending || (purchaseType === 'one-time' && availableToAdd === 0)
              }
              className='flex h-11 sm:h-13 md:h-15 text-sm sm:text-base md:text-lg px-5 sm:px-6 w-full items-center justify-between rounded-full bg-(--text-primary) text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:bg-[#142e50] transition-colors'
            >
              <span className='font-bold'>${totalPrice.toFixed(2)}</span>
              <span className='font-medium'>
                {createSubMutation.isPending
                  ? 'Processing...'
                  : purchaseType === 'subscription'
                    ? 'Subscribe Now'
                    : maxStock === 0
                      ? 'Out of Stock'
                      : availableToAdd === 0
                        ? 'Max Reached'
                        : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <ReviewsSection productId={product.id} />
    </section>
  );
}

