"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api/pages";

type CheckoutSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenReview: () => void;
};

export default function CheckoutSuccessModal({
  open,
  onClose,
  onOpenReview,
}: CheckoutSuccessModalProps) {
  const { data: pageData } = useQuery({
    queryKey: ["page", "push-subscription"],
    queryFn: () => getPage("push-subscription"),
    enabled: open, // Only fetch when modal opens
  });

  const getContent = (key: string) => pageData?.sections?.find((s: any) => s.sectionKey === key)?.content || {};

  const hero = getContent("hero");
  const link1 = getContent("link1");
  const link2 = getContent("link2");
  const cta = getContent("cta");

  const title = hero.title || "You're all set.";
  const subtitle = hero.subtitle || "Would you consider subscribing to our products? Subscription reduce costs 15% from one time buying.";
  const link1Text = link1.text || "See subscription benefits here ->";
  const link2Text = link2.text || "Tell us about this product here ->";
  const ctaText = cta.text || "Track your order";

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
            {title}
          </h2>

          <p className='text-white' style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            {subtitle}
          </p>

          <Link
            href='/subscription'
            className='underline underline-offset-4 text-white'
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            {link1Text}
          </Link>

          <button
            type='button'
            onClick={onOpenReview}
            className='underline underline-offset-4 text-left text-white'
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
            {link2Text}
          </button>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='mt-auto rounded-full bg-white px-6 py-4 text-(--text-primary)'
          style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}>
          {ctaText}
        </button>
      </div>
    </div>,
    document.body
  );
}
