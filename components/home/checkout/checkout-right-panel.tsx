'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';
import { couponApi } from '@/lib/api/coupons';
import { toast } from 'sonner';
import { X, Ticket } from 'lucide-react';

export default function CheckoutRightPanel() {
  const { items, appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const hasSubscription = items.some((item) => item.isSubscription);

  // Calculate dynamic discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discount = (subtotal * appliedCoupon.discountValue) / 100;
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount); // Assume free shipping for now

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplying(true);
    try {
      const response = await couponApi.getCouponByCode(couponCode.trim());
      const coupon = response.data;
      
      if (!coupon.isActive) {
        toast.error('This coupon is currently inactive');
        return;
      }

      if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
        toast.error(`Minimum order value of $${coupon.minOrderValue} required for this coupon`);
        return;
      }

      if (coupon.validFrom && new Date(coupon.validFrom) > new Date()) {
        toast.error('This coupon is not valid yet');
        return;
      }

      if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
        toast.error('This coupon has expired');
        return;
      }

      applyCoupon(coupon);
      setCouponCode('');
      toast.success('Coupon applied successfully!');
    } catch (error: any) {
      toast.error('Invalid coupon code');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <aside className='flex flex-col bg-(--checkout-panel-bg) px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:h-full lg:pl-8 lg:pr-12.5'>
      <h2 className='pb-6 font-heading text-xl text-(--text-primary) md:text-2xl lg:pb-8 lg:text-3xl'>
        Items
      </h2>

      <div className='border-t border-(--checkout-divider)'>
        {mounted &&
          items.map((item) => (
            <div
              key={`${item.productVariantId}-${item.isSubscription}`}
              className='flex items-start justify-between border-b border-(--checkout-divider) py-4 sm:py-5 md:py-6'
            >
              <div className='flex items-start gap-3 sm:gap-4 md:gap-6'>
                <div className='relative h-12 w-12 md:h-16 md:w-16 rounded-md bg-white p-2'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes='64px'
                    className='object-contain'
                  />
                </div>
                <div>
                  <p className='text-sm leading-snug text-(--checkout-muted-text) sm:text-base md:text-xl lg:text-2xl'>
                    {item.name}
                  </p>
                  {item.variantName && (
                    <p className='text-xs text-(--checkbox-muted-subtext) sm:text-sm md:text-base'>
                      {item.variantName} {item.isSubscription ? '(Subscription)' : ''}
                    </p>
                  )}
                  <p className='mt-2 text-sm text-(--checkbox-muted-subtext) sm:text-base md:text-xl lg:text-2xl'>
                    {item.quantity}x
                  </p>
                </div>
              </div>

              <p className='text-sm text-(--checkout-muted-text) sm:text-base md:text-xl lg:text-2xl'>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
      </div>

      <form onSubmit={handleApplyCoupon} className='mt-4 flex flex-col gap-2 py-5 sm:mt-6 sm:flex-row sm:items-center sm:py-6'>
        <input
          type='text'
          placeholder='Discount Code'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={isApplying || !!appliedCoupon}
          className='w-full flex-1 rounded-[6px] border border-transparent bg-white p-3 text-base text-(--checkbox-muted-text) focus:outline-none focus:ring-1 focus:ring-(--text-primary) disabled:opacity-50'
        />
        <button
          type='submit'
          disabled={isApplying || !!appliedCoupon || !couponCode.trim()}
          className='w-full rounded-[6px] bg-(--text-primary) px-6 py-3 text-base font-medium text-white sm:w-auto hover:opacity-90 transition disabled:opacity-50'
        >
          {isApplying ? 'Applying...' : 'Apply'}
        </button>
      </form>

      {mounted && appliedCoupon && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-[6px] p-3 mb-6">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
          </div>
          <button 
            onClick={removeCoupon}
            className="p-1 hover:bg-green-100 rounded-full text-green-700 transition"
            aria-label="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className='mt-auto'>
        <dl className='space-y-4 pb-6 text-base md:text-xl lg:text-2xl'>
          <div className='flex items-center justify-between'>
            <dt className='text-(--checkbox-muted-subtext)'>
              Subtotal · {mounted ? totalItems : 0} Item(s)
            </dt>
            <dd className='text-(--checkout-muted-text)'>
              ${mounted ? subtotal.toFixed(2) : '0.00'}
            </dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className='text-(--checkbox-muted-subtext)'>Shipping</dt>
            <dd className='text-(--checkout-muted-text)'>Free</dd>
          </div>
          {mounted && hasSubscription && (
            <div className='flex items-center justify-between'>
              <dt className='text-(--checkbox-muted-subtext)'>Subscription</dt>
              <dd className='text-(--checkout-muted-text)'>Active</dd>
            </div>
          )}
          {mounted && discount > 0 && (
            <div className='flex items-center justify-between'>
              <dt className='text-(--text-primary) font-medium'>
                Discount {appliedCoupon ? `(${appliedCoupon.code})` : ''}
              </dt>
              <dd className='text-(--text-primary) font-medium'>
                - ${discount.toFixed(2)}
              </dd>
            </div>
          )}
        </dl>

        <div className='border-t border-(--checkout-divider) pt-6'>
          <div className='flex items-center justify-between'>
            <p className='text-lg text-(--checkbox-muted-subtext) md:text-xl lg:text-2xl'>Total</p>
            <p className='font-heading text-xl text-(--checkout-muted-text) md:text-2xl lg:text-3xl'>
              ${mounted ? total.toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
