"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutSuccessModal from "@/components/home/checkout/checkout-success-modal";
import CheckoutReviewModal from "@/components/home/checkout/checkout-review-modal";
import CheckoutReferFriendModal from "@/components/home/checkout/checkout-refer-friend-modal";
import { useCartStore } from "@/store/useCartStore";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);

  useEffect(() => {
    // Clear the cart on successful payment
    clearCart();
  }, [clearCart]);

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    router.push("/");
  };

  const handleOpenReviewModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleOpenReferModal = () => {
    setIsReviewModalOpen(false);
    setIsReferModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
    router.push("/");
  };
  
  const handleCloseRefer = () => {
    setIsReferModalOpen(false);
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] bg-[#f8f8f8] flex items-center justify-center p-4" style={{ paddingTop: "6rem" }}>
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-heading text-(--text-primary) mb-4">Processing...</h1>
      </div>

      <CheckoutSuccessModal
        open={isSuccessModalOpen}
        onClose={handleCloseSuccess}
        onOpenReview={handleOpenReviewModal}
      />

      <CheckoutReviewModal
        open={isReviewModalOpen}
        onClose={handleCloseReview}
        onOpenReferFriend={handleOpenReferModal}
      />

      <CheckoutReferFriendModal
        open={isReferModalOpen}
        onClose={handleCloseRefer}
      />
    </div>
  );
}
