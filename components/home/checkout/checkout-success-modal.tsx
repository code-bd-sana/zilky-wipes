"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type CheckoutSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CheckoutSuccessModal({
  open,
  onClose,
}: CheckoutSuccessModalProps) {
  useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className='fixed inset-0 z-120 flex items-center justify-center bg-black/10 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6'
      role='dialog'
      aria-modal='true'
      aria-label='Checkout success'
      onClick={onClose}>
      <div
        className='flex h-100 md:h-150 max-h-[calc(100dvh-2rem)] w-full max-w-160 flex-col overflow-y-auto bg-(--text-primary) p-4 sm:p-6'
        onClick={(event) => event.stopPropagation()}>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <h2
            className='font-heading leading-none text-white'
            style={{ fontSize: "clamp(2.25rem, 7.5vw, 60px)" }}>
            You&apos;re all set.
          </h2>

          <p className='text-white' style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            Would you consider subscribing to our products? Subscription reduce
            costs 15% from one time buying.
          </p>

          <a
            href='#'
            className='underline underline-offset-4 text-white'
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            See subscription benifits here {"->"}
          </a>

          <a
            href='#'
            className='underline underline-offset-4 text-white'
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            Tell us about this product here {"->"}
          </a>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='mt-auto rounded-full bg-white px-6 py-4 text-(--text-primary)'
          style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
          Track your order
        </button>
      </div>
    </div>,
    document.body
  );
}
