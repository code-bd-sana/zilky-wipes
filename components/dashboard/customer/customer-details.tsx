"use client";

import {
  ChevronsRight,
  Download,
  Group,
  Maximize2,
  X,
} from "lucide-react";
import type { BackendCustomer } from "@/lib/api/customers";

type CustomerDetailPanelProps = {
  customer: BackendCustomer | null;
  onClose: () => void;
};

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  Active: "bg-green-50 text-green-700",
  "CANCELED": "bg-red-100 text-red-600",
  "PAUSED": "bg-blue-100 text-blue-600",
  "PAST_DUE": "bg-orange-100 text-orange-600",
  "UNPAID": "bg-red-100 text-red-700",
};

type InfoRowKey =
  | "phone"
  | "joined"
  | "lifetimeValue"
  | "subscriptionType"
  | "items";

const INFO_ROWS: { label: string; key: InfoRowKey }[] = [
  { label: "Phone", key: "phone" },
  { label: "Customer Since", key: "joined" },
  { label: "Lifetime Value", key: "lifetimeValue" },
  { label: "Subscription Type", key: "subscriptionType" },
  { label: "Items", key: "items" },
];

export default function CustomerDetail({
  customer,
  onClose,
}: CustomerDetailPanelProps) {
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

        <div className='mx-5 mb-4 bg-[#FBFAF9] rounded-xl border border-gray-100 p-4'>
          <div className='flex items-center gap-1.5 mb-4'>
            <span className='w-2 h-2 rounded-full bg-green-500 inline-block' />
            <span
              className={`text-xs font-medium px-2.5 py-1.5 rounded-full ${STATUS_STYLES[customer.status] || "bg-gray-100 text-gray-800"}`}>
              {customer.status === "ACTIVE"
                ? "Active Customer"
                : customer.status}
            </span>
          </div>

          <div className='relative'>
            {customer.orderHistory.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No order history available</p>
            ) : null}
            {customer.orderHistory.map((entry, i) => (
              <div key={entry.id} className='flex gap-3 mb-4 last:mb-0'>
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
                <span className='text-xs font-medium px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-600 max-w-[50%] text-right'>
                  {customer[key] || "None"}
                </span>
              ) : (
                <span className='text-sm text-gray-800 font-medium max-w-[50%] text-right'>
                  {customer[key] || "N/A"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
