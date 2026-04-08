"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type CheckoutReferFriendModalProps = {
  open: boolean;
  onClose: () => void;
};

const referralLink = "https://www.figma.com/design/Imion...";

export default function CheckoutReferFriendModal({
  open,
  onClose,
}: CheckoutReferFriendModalProps) {
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      // Ignore clipboard errors in unsupported contexts.
    }
  };

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className='fixed inset-0 z-120 flex items-center justify-center bg-black/10 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6'
      role='dialog'
      aria-modal='true'
      aria-label='Refer a friend'
      onClick={onClose}>
      <div
        className='flex h-100 md:h-150 max-h-[calc(100dvh-2rem)] w-full max-w-150 flex-col bg-(--text-primary) p-4 sm:p-6'
        onClick={(event) => event.stopPropagation()}>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <h2
            className='font-heading leading-none text-white'
            style={{ fontSize: "clamp(2.25rem, 7.5vw, 60px)" }}>
            Refer a friend
          </h2>

          <p className='text-white' style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            Invite your friends and let them know about the benifits of using
            zilkey wipes.
          </p>
        </div>

        <div className='mt-auto rounded-full bg-white px-4 py-3 sm:px-6 sm:py-4'>
          <div className='flex items-center justify-between gap-3'>
            <p className='truncate text-(--text-primary)/70 text-xs sm:text-sm md:text-base'>
              {referralLink}
            </p>
            <button
              type='button'
              onClick={handleCopyLink}
              className='shrink-0 text-(--text-primary) text-sm md:text-2xl'>
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
