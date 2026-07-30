"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] bg-[#f8f8f8] flex flex-col items-center justify-center p-4" style={{ paddingTop: "6rem" }}>
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-[#ff4f4f]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-(--text-primary) mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-(--text-secondary) mb-8">
          Your payment was cancelled or failed. No charges were made and your cart is still intact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="rounded-full bg-(--text-primary) px-8 py-3 text-white transition hover:opacity-90 font-medium text-lg"
          >
            Try Again
          </Link>
          <Link
            href="/shop"
            className="rounded-full bg-[#f0f0f0] px-8 py-3 text-(--text-primary) transition hover:bg-[#e4e4e4] font-medium text-lg"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
