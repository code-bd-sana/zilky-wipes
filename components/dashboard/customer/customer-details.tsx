"use client";

import {
  ArrowRight,
  ChevronsRight,
  Download,
  Group,
  Maximize2,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import type {
  DashboardCustomerRecord,
  DashboardCustomerStatus,
} from "@/constants/dashboard-feedback";

type CustomerDetailPanelProps = {
  customer: DashboardCustomerRecord | null;
  onClose: () => void;
};

const STATUS_STYLES: Record<DashboardCustomerStatus, string> = {
  Active: "bg-green-50 text-green-700",
  "Canceled subscription": "bg-red-100 text-red-600",
  "Paused indefinetely": "bg-blue-100 text-blue-600",
  "Skipped next Delivery": "bg-purple-100 text-purple-600",
};

type InfoRowKey =
  | "phone"
  | "customerSince"
  | "lifetimeValue"
  | "subscriptionType"
  | "items";

const INFO_ROWS: { label: string; key: InfoRowKey }[] = [
  { label: "Phone", key: "phone" },
  { label: "Customer Since", key: "customerSince" },
  { label: "Lifetime Value", key: "lifetimeValue" },
  { label: "Subscription Type", key: "subscriptionType" },
  { label: "Items", key: "items" },
];

export default function CustomerDetail({
  customer,
  onClose,
}: CustomerDetailPanelProps) {
  const [showReviews, setShowReviews] = useState(false);

  if (!customer) return null;

  return (
    <section
      className='fixed inset-0 z-50 flex justify-end p-3'
      onClick={onClose}>
      {/* Blur overlay */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      {/* Panel */}
      <div
        className='relative z-10 w-full max-w-md bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}>
        {/* Top controls */}
        <div className='flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#E5E5E5]'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'>
              <ChevronsRight className='w-4 h-4' color='#262626' />
            </button>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'>
              <Maximize2 className='w-3 h-3' color='#262626' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'>
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Header */}
        <div className='flex items-start justify-between px-5 py-4'>
          <div>
            <h2 className='text-xl font-medium text-[#2B2D2E]'>
              {customer.name}
            </h2>
            <p className='text-sm text-gray-400 mt-0.5'>{customer.email}</p>
            {/* <p className='text-xs text-gray-500 mt-1'>
              Customer ID: {customer.id}
            </p> */}
          </div>
          <button
            type='button'
            className='inline-flex items-center gap-1.5 text-xs text-[#262626] border border-[#E5E7EB] bg-[#FAFAF9] rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors'>
            Export Order History
            <Download className='w-3 h-3' />
          </button>
        </div>

        {showReviews ? (
          <div className='mx-5 mb-4 rounded-xl border border-[#ececec] bg-[#fbfbfb] p-4'>
            <button
              type='button'
              className='inline-flex items-center gap-1 rounded-md border border-[#e4e4e4] bg-white px-2.5 py-1 text-xs text-[#3f3f3f] transition-colors hover:bg-[#f7f7f7]'>
              <Star className='h-3.5 w-3.5' color='#262626' />
              <span>Reviews</span>
            </button>

            <div className='mt-4'>
              {customer.reviews.map((entry, index) => (
                <div
                  key={`${entry.date}-${index}`}
                  className='flex gap-3 pb-5 last:pb-0'>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${
                        entry.isPending ? "bg-[#d8d8d8]" : "bg-[#4b4b4b]"
                      }`}
                    />
                    {index < customer.reviews.length - 1 ? (
                      <div
                        className={`mt-1 flex-1 border-l ${
                          entry.isPending
                            ? "border-dashed border-[#e6e6e6]"
                            : "border-[#4b4b4b]"
                        }`}
                      />
                    ) : null}
                  </div>

                  <div className='pb-1'>
                    <p
                      className={`text-xs leading-none ${
                        entry.isPending ? "text-[#c1c1c1]" : "text-[#a8a8a8]"
                      }`}>
                      {entry.date} · {entry.time}
                    </p>
                    <p
                      className={`mt-2 text-sm leading-5 ${
                        entry.isPending
                          ? "text-[#b8b8b8]"
                          : "font-medium text-[#4a4a4a]"
                      }`}>
                      {entry.text}
                    </p>
                    <div className='mt-1 flex items-center gap-1 text-[#bdbdbd]'>
                      {Array.from({ length: entry.rating }).map(
                        (_, starIndex) => (
                          <Star
                            key={starIndex}
                            className='h-3.5 w-3.5'
                            strokeWidth={1.5}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='mx-5 mb-4 bg-[#FBFAF9] rounded-xl border border-gray-100 p-4'>
            <div className='flex items-center gap-1.5 mb-4'>
              <span className='w-2 h-2 rounded-full bg-green-500 inline-block' />
              <span
                className={`text-xs font-medium px-2.5 py-1.5 rounded-full ${STATUS_STYLES[customer.status]}`}>
                {customer.status === "Active"
                  ? "Active Customer"
                  : customer.status}
              </span>
            </div>

            <div className='relative'>
              {customer.orderHistory.map((entry, i) => (
                <div key={i} className='flex gap-3 mb-4 last:mb-0'>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${
                        entry.isPending ? "bg-gray-300" : "bg-gray-800"
                      }`}
                    />
                    {i < customer.orderHistory.length - 1 && (
                      <div className='w-px flex-1 bg-gray-800 ' />
                    )}
                  </div>
                  <div className='pb-1'>
                    <p
                      className={`text-xs mb-0.5 ${
                        entry.isPending ? "text-gray-400" : "text-gray-500"
                      }`}>
                      {entry.date} · {entry.time}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        entry.isPending ? "text-gray-400" : "text-gray-800"
                      }`}>
                      {entry.label}
                    </p>
                    <p
                      className={`text-sm ${
                        entry.isPending ? "text-gray-400" : "text-gray-600"
                      }`}>
                      {entry.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info rows */}
        <div className='mx-5 mb-4 divide-y divide-gray-100'>
          {INFO_ROWS.map(({ label, key }) => (
            <div key={key} className='flex items-center justify-between py-3'>
              <span className='text-sm text-[#737373] flex items-center gap-2'>
                <span className='w-4 h-4 text-[#737373]'>
                  <Group className='w-4 h-4' color='#A3A3A3' />
                </span>
                {label}
              </span>
              {key === "subscriptionType" ? (
                <span className='text-xs font-medium px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-600'>
                  {customer[key] as string}
                </span>
              ) : (
                <span className='text-sm text-gray-800 font-medium'>
                  {customer[key] as string}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='mt-auto px-5 pb-5 pt-3 border-t border-gray-100 justify-end flex'>
          <button
            type='button'
            onClick={() => setShowReviews(true)}
            className='inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 border border-[#E5E7EB] bg-[#FAFAF9] rounded-md px-3 py-1.5 transition-colors'>
            See Reviews
            <ArrowRight className='w-3 h-3' color='#262626' />
          </button>
        </div>
      </div>
    </section>
  );
}
