"use client";

import {
  ChevronsRight,
  DollarSign,
  MapPin,
  Maximize2,
  PackageCheck,
  RotateCcw,
  Truck,
  UserRound,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";

export type OrderStatus =
  | "Processing"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Canceled"
  | "Previous client";

export type OrderTimelineEntry = {
  dateLabel: string;
  timeLabel?: string;
  title: string;
  location: string;
  isPending?: boolean;
};

export type OrderDetailData = {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  items: number;
  amount: number;
  orderStatus: OrderStatus;
  trackingLabel: string;
  timeline: OrderTimelineEntry[];
  subscriptionType: string;
  address: string;
  itemLabel: string;
  trackOrderLabel: string;
  trackSubscriptionLabel: string;
  canTrackSubscription: boolean;
  internalNotes: number;
};

type OrderDetailPanelProps = {
  order: OrderDetailData | null;
  onClose: () => void;
};

type InfoRowKey =
  | "subscriptionType"
  | "customer"
  | "address"
  | "itemLabel"
  | "amount";

const INFO_ROWS: { label: string; key: InfoRowKey; icon: LucideIcon }[] = [
  { label: "Subscription Type", key: "subscriptionType", icon: RotateCcw },
  { label: "Client Name", key: "customer", icon: UserRound },
  { label: "Address", key: "address", icon: MapPin },
  { label: "Items", key: "itemLabel", icon: PackageCheck },
  { label: "Total", key: "amount", icon: Wallet },
];

export default function OrderDetail({ order, onClose }: OrderDetailPanelProps) {
  if (!order) return null;

  const getRowValue = (key: InfoRowKey): string => {
    if (key === "amount") {
      return `$${order.amount.toFixed(2)}`;
    }

    switch (key) {
      case "subscriptionType":
        return order.subscriptionType;
      case "customer":
        return order.customer;
      case "address":
        return order.address;
      case "itemLabel":
        return order.itemLabel;
      default:
        return "";
    }
  };

  return (
    <section
      className='fixed inset-0 z-50 flex justify-end p-3'
      onClick={onClose}>
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      <div
        className='relative z-10 w-full max-w-md bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}>
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

        <div className='flex items-start justify-between px-5 py-4 border-b border-[#F0F0F0]'>
          <h2 className='text-[36px] leading-none font-light text-[#2B2D2E]'>
            {order.orderId}
          </h2>
          <button
            type='button'
            className='inline-flex items-center gap-1.5 rounded-md border border-[#E5E7EB] bg-[#FAFAF9] px-3 py-1.5 text-xs text-[#262626] transition-colors hover:bg-[#f2f2f1]'>
            {order.trackOrderLabel}
            <Truck className='h-3.5 w-3.5' color='#262626' />
          </button>
        </div>

        <div className='mx-5 mt-4 mb-4 rounded-xl border border-[#E8E8E8] bg-[#FBFAF9] p-4'>
          <span className='inline-flex items-center gap-2 rounded-md border border-[#E5E5E5] bg-[#F8F8F8] px-2.5 py-1 text-sm text-[#4B4B4B]'>
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                order.orderStatus === "Canceled"
                  ? "bg-[#E11D48]"
                  : "bg-[#16A34A]"
              }`}
            />
            {order.trackingLabel}
          </span>

          <div className='mt-5'>
            {order.timeline.map((event, index) => {
              const isLast = index === order.timeline.length - 1;

              return (
                <div
                  key={`${event.title}-${index}`}
                  className='flex gap-3 pb-5 last:pb-0'>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${
                        event.isPending ? "bg-[#D4D4D4]" : "bg-[#4B4B4B]"
                      }`}
                    />
                    {!isLast ? (
                      <div
                        className={`mt-1 flex-1 border-l ${
                          event.isPending
                            ? "border-dashed border-[#E5E5E5]"
                            : "border-[#4B4B4B]"
                        }`}
                      />
                    ) : null}
                  </div>

                  <div>
                    <p
                      className={`text-xs ${
                        event.isPending ? "text-[#BDBDBD]" : "text-[#A0A0A0]"
                      }`}>
                      {event.timeLabel
                        ? `${event.dateLabel} · ${event.timeLabel}`
                        : event.dateLabel}
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        event.isPending
                          ? "text-[#B5B5B5]"
                          : "font-medium text-[#4A4A4A]"
                      }`}>
                      {event.title}
                    </p>
                    <p
                      className={`text-sm ${
                        event.isPending ? "text-[#BFBFBF]" : "text-[#8A8A8A]"
                      }`}>
                      {event.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='mx-5 mb-3 divide-y divide-[#F3F3F3]'>
          {INFO_ROWS.map(({ label, key, icon: Icon }) => (
            <div key={key} className='flex items-center justify-between py-3'>
              <span className='inline-flex items-center gap-2 text-sm text-[#6E6E6E]'>
                <Icon className='h-3.5 w-3.5' color='#A6A6A6' />
                {label}
              </span>
              {key === "subscriptionType" ? (
                <span className='inline-flex rounded-md bg-[#FCE7F3] px-2.5 py-0.5 text-sm font-medium text-[#DB2777]'>
                  {getRowValue(key)}
                </span>
              ) : (
                <span className='text-sm font-medium text-[#3E3E3E]'>
                  {getRowValue(key)}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className='mt-auto px-5 pb-5 pt-3 flex justify-end'>
          <button
            type='button'
            disabled={!order.canTrackSubscription}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
              order.canTrackSubscription
                ? "border-[#E5E7EB] bg-[#FAFAF9] text-[#636363] hover:bg-[#f2f2f1]"
                : "cursor-not-allowed border-[#EEEEEE] bg-[#FAFAF9] text-[#C5C5C5]"
            }`}>
            {order.trackSubscriptionLabel}
            <DollarSign className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>
    </section>
  );
}
