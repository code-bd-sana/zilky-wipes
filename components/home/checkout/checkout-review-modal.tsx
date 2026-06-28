"use client";

import { Paperclip } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api/pages";

type CheckoutReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onOpenReferFriend: () => void;
};

export default function CheckoutReviewModal({
  open,
  onClose,
  onOpenReferFriend,
}: CheckoutReviewModalProps) {
  const { data: pageData } = useQuery({
    queryKey: ["page", "push-feedback"],
    queryFn: () => getPage("push-feedback"),
    enabled: open, // Only fetch when modal opens
  });

  const getContent = (key: string) => pageData?.sections?.find((s: { sectionKey: string; content: Record<string, unknown> }) => s.sectionKey === key)?.content || {};

  const promptData = getContent("prompt");
  const inputData = getContent("input");
  const uploadData = getContent("upload");
  const ctaData = getContent("cta");

  const title = promptData.title || "How does it feel so far?";
  const subtitle = promptData.subtitle || "Your experience matters to us. Good or bad - we're listening. It helps us do better.";
  const inputText = inputData.text || "Write your experience";
  const uploadText = uploadData.text || "Upload File, Doc, Image";
  const submitBtnText = ctaData.submitText || "Submit Feedback";
  const referBtnText = ctaData.referText || "Refer a Friend";

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
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/10 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout review"
      onClick={onClose}
    >
      <div
        className="flex h-100 md:h-175 max-h-[calc(100dvh-2rem)] w-full max-w-150 flex-col bg-(--text-primary) p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-6xl font-heading leading-none text-white">
            {title}
          </h2>

          <p className="text-white text-sm md:text-2xl">
            {subtitle}
          </p>
        </div>

        <div className="my-auto flex flex-1 items-center py-4">
          <div className="w-full">
            <label htmlFor="checkout-review" className="sr-only">
              {inputText}
            </label>
            <textarea
              id="checkout-review"
              placeholder={inputText}
              className="min-h-30 w-full rounded-[6px] border border-white bg-transparent p-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/70"
            />
            <button
              type="button"
              className="mt-2 inline-flex w-fit items-center gap-2 text-white"
            >
              {uploadText}
              <Paperclip className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-white px-6 py-4 text-(--text-primary)"
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}
          >
            {submitBtnText}
          </button>

          <button
            type="button"
            onClick={onOpenReferFriend}
            className="mt-3 w-full text-center text-white underline underline-offset-4"
            style={{ fontSize: "clamp(1rem, 3.5vw, 24px)" }}
          >
            {referBtnText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
