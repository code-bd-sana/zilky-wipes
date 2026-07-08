"use client";

import { useState } from "react";
import {
  ChevronsRight,
  Maximize2,
  X,
  ChevronDown,
} from "lucide-react";
import type { BackendSubscription } from "@/lib/api/subscriptions";
import { useUpdateSubscriptionStatus } from "@/hooks/useSubscriptions";

export interface EditSubscriptionModalProps {
  subscription: BackendSubscription;
  onClose: () => void;
}

const STATUS_OPTIONS = [
  "ACTIVE",
  "PAST_DUE",
  "CANCELED",
  "PAUSED",
  "UNPAID"
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className='text-[15px] text-[#2B2D2E] font-normal w-30 shrink-0 pt-2.25'>
      {children}
    </span>
  );
}

function TextInput({
  value,
  readOnly = false,
}: {
  value: string;
  readOnly?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className={`w-full h-9.5 border border-[#E5E5E5] rounded-[6px] px-3 text-[13px] text-[#2B2D2E] outline-none transition-colors ${readOnly ? 'bg-gray-50 cursor-not-allowed text-gray-500' : 'bg-white focus:border-[#A0A0A0]'}`}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className='relative flex-1'>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full h-9.5 border border-[#E5E5E5] rounded-[6px] px-3 pr-8 text-sm text-[#2B2D2E] outline-none focus:border-[#A0A0A0] transition-colors appearance-none bg-white cursor-pointer'>
        <option value='' disabled>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A0A0]' />
    </div>
  );
}

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row items-start gap-x-4 gap-y-2'>
      <Label>{label}</Label>
      <div className='flex-1 w-full'>{children}</div>
    </div>
  );
}

export default function EditSubscriptionModal({
  subscription,
  onClose,
}: EditSubscriptionModalProps) {
  const [status, setStatus] = useState<BackendSubscription['status']>(subscription.status);
  
  const updateStatusMutation = useUpdateSubscriptionStatus(onClose);

  function handleSave() {
    updateStatusMutation.mutate({ id: subscription.id, status });
  }

  const customerName = `${subscription.user?.firstName || ''} ${subscription.user?.lastName || ''}`.trim() || 'Unknown Customer';
  const customerEmail = subscription.user?.email || 'No email';

  return (
    <section
      className='fixed inset-0 z-50 flex justify-end p-3'
      onClick={onClose}>
      {/* Backdrop */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      {/* Panel */}
      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}>
        {/* ── Top icon bar ── */}
        <div className='flex items-center justify-between px-4 pt-4 pb-3'>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <ChevronsRight className='w-4 h-4 text-[#262626]' />
            </button>
            <button
              type='button'
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <Maximize2 className='w-3 h-3 text-[#262626]' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
            <X className='w-4 h-4 text-[#8A8A8A]' />
          </button>
        </div>

        {/* ── Title row ── */}
        <div className='px-5 pb-4 flex items-start justify-between'>
          <div>
            <h2 className='text-2xl font-medium text-[#2B2D2E] leading-tight'>
              {customerName}
            </h2>
            <p className='text-[13px] text-[#8A8A8A] mt-0.5'>
              {customerEmail}
            </p>
          </div>
        </div>

        {/* ── Form card ── */}
        <div className='mx-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-2 md:gap-5'>
          <div className='mb-2'>
            <span className='inline-flex items-center gap-1.5 text-sm text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1'>
              <span className={`w-2 h-2 rounded-full inline-block ${subscription.status === 'ACTIVE' ? 'bg-[#008236]' : 'bg-red-500'}`} />
              {subscription.status}
            </span>
          </div>

          <FormRow label='Customer Name'>
            <TextInput value={customerName} readOnly />
          </FormRow>

          <FormRow label='Email'>
            <TextInput value={customerEmail} readOnly />
          </FormRow>

          <FormRow label='Product'>
            <TextInput value={subscription.productVariant?.product?.name || 'Unknown Product'} readOnly />
          </FormRow>

          <FormRow label='Variant'>
            <TextInput value={subscription.productVariant?.name || 'Unknown Variant'} readOnly />
          </FormRow>

          <FormRow label='Frequency'>
            <TextInput value={subscription.frequency} readOnly />
          </FormRow>

          <FormRow label='Starting Date'>
            <TextInput value={new Date(subscription.startingDate).toLocaleDateString()} readOnly />
          </FormRow>

          <FormRow label='Status'>
            <SelectInput
              value={status}
              onChange={(val) => setStatus(val as BackendSubscription['status'])}
              options={STATUS_OPTIONS}
            />
          </FormRow>
        </div>

        {/* ── Actions ── */}
        <div className='mt-auto px-5 pb-5 flex justify-end gap-2 md:mb-14 pt-4'>
          <button
            type='button'
            onClick={onClose}
            className='h-9 px-4 rounded-[6px] border border-[#E5E7EB] text-[15px] bg-[#FAFAF9] text-[#1D3A5F] hover:bg-gray-200 transition-colors cursor-pointer'>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSave}
            disabled={updateStatusMutation.isPending || status === subscription.status}
            className='h-9 px-4 rounded-[6px] border border-[#E5E7EB] text-[15px] bg-[#FAFAF9] text-[#1D3A5F] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-60'>
            {updateStatusMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </section>
  );
}
