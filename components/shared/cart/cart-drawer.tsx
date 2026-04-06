"use client";

import { ChevronDown, Minus, Plus, TicketPercent } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-100 backdrop-blur-[6px]"
      style={{ backgroundColor: "var(--cart-overlay-bg)" }}
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="ml-auto flex h-screen w-3/4 sm:w-[80vw] md:w-[60vw] lg:w-[40vw] flex-col p-5 md:p-8 text-white"
        style={{ backgroundColor: "var(--cart-panel-bg)" }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Cart drawer"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
            Cart List <span className="text-(--cart-muted-text)">/ 01</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl sm:text-3xl md:text-5xl text-white transition-opacity"
          >
            Clear
          </button>
        </div>

        <div className="mt-8 md:mt-16 border-t border-white/35 py-4 md:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="">
              <p className="text-lg sm:text-xl md:text-2xl">NatureSoft Wipes</p>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl">$15.00</p>
          </div>
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white px-2.5 py-1 text-xs sm:text-sm">
              One Time
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white px-2.5 py-1 text-xs sm:text-sm">
              <Minus className="h-3.5 w-3.5" />
              <span>1 Item</span>
              <Plus className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-between border-y border-white/35 py-4 md:py-6 text-left text-lg sm:text-xl md:text-3xl"
        >
          <span>Apply a Coupon</span>
          <TicketPercent className="h-5 w-5" />
        </button>

        <div className="mt-auto">
          <Link
            href='/checkout'
            onClick={onClose}
            className='inline-flex h-12 sm:h-14 w-full items-center justify-center rounded-full bg-white text-base sm:text-lg md:text-xl font-medium text-(--text-primary)'>
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
