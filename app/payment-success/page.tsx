'use client';

import CheckoutReviewModal from '@/components/home/checkout/checkout-review-modal';
import CheckoutSuccessModal from '@/components/home/checkout/checkout-success-modal';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCart = useCartStore((state) => state.clearCart);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    // Clear the cart on successful payment
    clearCart();

    // Invalidate orders and subscriptions to fetch the newly created ones
    queryClient.invalidateQueries({ queryKey: ['my-orders'] });
    queryClient.invalidateQueries({ queryKey: ['my-subscriptions'] });
    queryClient.invalidateQueries({ queryKey: ['review-eligibility'] });
  }, [clearCart, queryClient]);

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    router.push('/');
  };

  const handleOpenReviewModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    router.push('/');
  };

  return (
    <div
      className='min-h-[70vh] bg-[#f8f8f8] flex items-center justify-center p-4'
      style={{ paddingTop: '6rem' }}
    >
      <div className='text-center'>
        <h1 className='text-3xl md:text-5xl font-heading text-(--text-primary) mb-4'>
          Processing...
        </h1>
      </div>

      <CheckoutSuccessModal
        open={isSuccessModalOpen}
        onClose={handleCloseSuccess}
        onOpenReview={handleOpenReviewModal}
      />

      <CheckoutReviewModal open={isReviewModalOpen} onClose={handleCloseReview} />
    </div>
  );
}
