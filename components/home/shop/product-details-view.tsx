'use client';

import type { BackendProduct, BackendVariant } from '@/components/dashboard/products/product-list';
import ReviewsSection from '@/components/reviews/reviews-section';
import { useCreateSubscription } from '@/hooks/useSubscriptions';
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
      image: product.images?.[0] || '',
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
      className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5 flex flex-col pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12'
    >
      <div className='grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 items-start'>
        <div className='relative w-full aspect-square min-h-65 sm:min-h-85 md:min-h-105 bg-(--shop-card-bg) rounded-2xl sm:rounded-3xl overflow-hidden'>
          <Image
            src={product.images?.[0] || ''}
            alt={product.name}
            fill
            quality={100}
            loading='eager'
            sizes='(min-width: 1024px) 50vw, 100vw'
            className='object-contain p-4 sm:p-6 md:p-10 drop-shadow-md'
          />
        </div>

        <div className='flex flex-col justify-between'>
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

