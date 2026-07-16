'use client';

import React from 'react';
import { X, CalendarDays, Package, User, CheckCircle2, ArrowRight } from 'lucide-react';
import type { BackendSubscription } from '@/lib/api/subscriptions';
import Image from 'next/image';

interface ViewSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: BackendSubscription;
}

export default function ViewSubscriptionModal({
  isOpen,
  onClose,
  subscription,
}: ViewSubscriptionModalProps) {
  if (!isOpen) return null;

  const {
    productVariant,
    user,
    status,
    frequency,
    startingDate,
    nextBillingDate,
    stripeSubscriptionId,
  } = subscription;
  const product = productVariant.product;

  const calculateDiscountedPrice = () => {
    if (!productVariant.subscriptionEligible || !productVariant.subscriptionDiscount) {
      return productVariant.price;
    }
    const discountAmount = productVariant.price * (productVariant.subscriptionDiscount / 100);
    return productVariant.price - discountAmount;
  };

  const finalPrice = calculateDiscountedPrice();
  const totalPrice = finalPrice * subscription.quantity;

  return (
    <div className='fixed inset-0 z-60 flex justify-end p-3' onClick={onClose}>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />

      <div
        className='relative z-10 w-full max-w-md bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E5E5E5] sticky top-0 bg-white z-20'>
          <h2 className='text-xl font-semibold text-gray-900'>Subscription Details</h2>
          <button
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'
          >
            <X size={20} />
          </button>
        </div>

        <div className='p-5 flex flex-col gap-6'>
          {/* Status Banner */}
          <div className='flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg'>
            <div>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>
                Status
              </p>
              <div className='flex items-center gap-2'>
                <CheckCircle2
                  size={18}
                  className={
                    status === 'ACTIVE'
                      ? 'text-green-500'
                      : status === 'PAUSED'
                        ? 'text-yellow-500'
                        : status === 'CANCELED'
                          ? 'text-red-500'
                          : 'text-gray-500'
                  }
                />
                <span className='font-semibold text-gray-900'>{status}</span>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>
                Frequency
              </p>
              <span className='font-semibold text-gray-900 capitalize'>
                {frequency.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <Package size={16} className='text-gray-400' />
              Product Information
            </h3>
            <div className='flex gap-4 p-4 border border-gray-100 rounded-lg bg-white'>
              <div className='relative w-20 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden shrink-0'>
                {product?.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill className='object-cover' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <Package className='w-6 h-6 text-gray-300' />
                  </div>
                )}
              </div>
              <div className='flex flex-col flex-1 justify-center'>
                <h4 className='font-semibold text-gray-900 line-clamp-1'>
                  {product?.name || 'Unknown Product'}
                </h4>
                <p className='text-sm text-gray-500 mb-2'>{productVariant?.name}</p>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold text-[--text-primary]'>
                    ${finalPrice.toFixed(2)}
                  </span>
                  {productVariant.subscriptionEligible &&
                    productVariant.subscriptionDiscount > 0 && (
                      <span className='text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium'>
                        {productVariant.subscriptionDiscount}% OFF
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <User size={16} className='text-gray-400' />
              Customer Information
            </h3>
            <div className='p-4 border border-gray-100 rounded-lg space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Name</span>
                <span className='text-sm font-medium text-gray-900'>
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Email</span>
                <span className='text-sm font-medium text-gray-900'>{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <Package size={16} className='text-gray-400' />
              Billing Information
            </h3>
            <div className='p-4 border border-gray-100 rounded-lg space-y-3 bg-white'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Quantity</span>
                <span className='text-sm font-medium text-gray-900'>{subscription.quantity}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Price / Cycle</span>
                <span className='text-sm font-medium text-gray-900'>${finalPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
                <span className='text-sm font-medium text-gray-900'>Total / Cycle</span>
                <span className='text-base font-semibold text-[#1D3A5F]'>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Info */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <CalendarDays size={16} className='text-gray-400' />
              Timeline
            </h3>
            <div className='p-4 border border-gray-100 rounded-lg space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Started on</span>
                <span className='text-sm font-medium text-gray-900'>
                  {new Date(startingDate).toLocaleDateString()}
                </span>
              </div>

              <div className='relative pl-3 border-l-2 border-dashed border-gray-200 ml-0.75 py-1'>
                <div className='absolute -left-1.25 top-1/2 -translate-y-1/2 bg-white text-gray-400'>
                  <ArrowRight size={14} className='rotate-90' />
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Next Billing</span>
                <span className='text-sm font-medium text-gray-900'>
                  {nextBillingDate ? new Date(nextBillingDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-2 text-center'>
            <span className='text-xs text-gray-400 font-mono'>
              Stripe ID: {stripeSubscriptionId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
