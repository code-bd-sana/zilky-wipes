'use client';

import { ChevronsRight, Maximize2, X, Package, Eye } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import type { BackendProduct, BackendVariant, BackendCategory, BackendTag } from './product-list';

type ViewProductModalProps = {
  product: BackendProduct;
  onClose: () => void;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className='text-[14px] text-[#2B2D2E] font-medium w-36 shrink-0 pt-2'>{children}</span>
  );
}

function ValueText({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full min-h-9.5 bg-white border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E]'>
      {children}
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col md:flex-row items-start gap-x-4 gap-y-1'>
      <Label>{label}</Label>
      <div className='flex-1 w-full'>{children}</div>
    </div>
  );
}

export default function ViewProductModal({ product, onClose }: ViewProductModalProps) {
  // Determine stock status display
  const getTotalStock = () => {
    if (!product.variants) return 0;
    return product.variants.reduce((sum: number, v: BackendVariant) => sum + v.stock, 0);
  };

  const totalStock = getTotalStock();
  const status = totalStock === 0 ? 'out' : totalStock <= 5 ? 'low' : 'in';

  const getStockStatusColor = () => {
    if (status === 'out') return 'text-red-600';
    if (status === 'low') return 'text-amber-600';
    return 'text-green-600';
  };

  const getStockStatusText = () => {
    if (status === 'out') return 'Out of Stock';
    if (status === 'low') return 'Low Stock';
    return 'In Stock';
  };

  return (
    <section className='fixed inset-0 z-50 flex justify-end p-3' onClick={onClose}>
      {/* Backdrop */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      {/* Panel */}
      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top icon bar ── */}
        <div className='flex items-center justify-between px-4 pt-4 pb-3'>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'
            >
              <ChevronsRight className='w-4 h-4 text-[#262626]' />
            </button>
            <button type='button' className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <Maximize2 className='w-3 h-3 text-[#262626]' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'
          >
            <X className='w-4 h-4 text-[#8A8A8A]' />
          </button>
        </div>

        {/* ── Title row ── */}
        <div className='px-5 pb-4 flex items-start justify-between'>
          <div>
            <h2 className='text-2xl font-medium text-[#2B2D2E] leading-tight'>{product.name}</h2>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-[13px] text-[#8A8A8A]'>
                SKU: {product.id?.slice(0, 8).toUpperCase() || 'N/A'}
              </p>
              <span className={`text-[13px] font-medium ${getStockStatusColor()}`}>
                {getStockStatusText()}
              </span>
            </div>
          </div>
        </div>

        {/* ── Details card ── */}
        <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 md:gap-6'>
          {/* Active badge */}
          <div>
            <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
              <Eye className='w-4 h-4 text-blue-600' />
              Product Overview
            </span>
          </div>

          <div className='flex flex-col gap-5'>
            <DetailRow label='Product Name'>
              <ValueText>{product.name}</ValueText>
            </DetailRow>

            <DetailRow label='Featured'>
              <ValueText>{product.isFeatured ? 'Yes' : 'No'}</ValueText>
            </DetailRow>

            <DetailRow label='Description'>
              <div className='w-full min-h-20 bg-white border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E] whitespace-pre-wrap'>
                {product.description || 'No description provided.'}
              </div>
            </DetailRow>

            <DetailRow label='Categories'>
              <div className='w-full min-h-9.5 bg-white border border-[#E5E5E5] rounded-[6px] px-2 py-1.5 flex flex-wrap gap-1.5'>
                {product.categories?.length ? (
                  product.categories.map((cat: BackendCategory) => (
                    <span
                      key={cat.id}
                      className='bg-gray-100 border border-gray-200 px-2 py-1 rounded text-[12px] font-medium text-gray-700'
                    >
                      {cat.name}
                    </span>
                  ))
                ) : (
                  <span className='text-[13px] text-gray-400 p-1'>None</span>
                )}
              </div>
            </DetailRow>

            <DetailRow label='Tags'>
              <div className='w-full min-h-9.5 bg-white border border-[#E5E5E5] rounded-[6px] px-2 py-1.5 flex flex-wrap gap-1.5'>
                {product.tags?.length ? (
                  product.tags.map((tag: BackendTag) => (
                    <span
                      key={tag.id}
                      className='bg-blue-50 border border-blue-100 px-2 py-1 rounded text-[12px] font-medium text-blue-700'
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className='text-[13px] text-gray-400 p-1'>None</span>
                )}
              </div>
            </DetailRow>
          </div>
        </div>

        {/* ── Product Images ── */}
        {product.images && product.images.length > 0 && (
          <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4'>
            <div>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
                <Eye className='w-4 h-4 text-emerald-600' />
                Product Images ({product.images.length})
              </span>
            </div>
            <div className='flex gap-4 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              {product.images.map((imgUrl: string, idx: number) => (
                <div
                  key={idx}
                  className='relative w-24 h-24 shrink-0 rounded-md border border-[#E5E5E5] overflow-hidden bg-white'
                >
                  <Image
                    src={imgUrl}
                    alt={`Product ${idx + 1}`}
                    fill
                    unoptimized
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Variants Card ── */}
        <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4'>
          <div>
            <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
              <Package className='w-4 h-4 text-orange-600' />
              Variants ({product.variants?.length || 0})
            </span>
          </div>

          <div className='flex flex-col gap-3'>
            {product.variants?.map((v: BackendVariant, idx: number) => (
              <div
                key={v.id || idx}
                className='bg-white border border-[#E5E5E5] rounded-md p-3 grid grid-cols-2 sm:grid-cols-4 gap-4'
              >
                <div>
                  <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                    Variant
                  </p>
                  <p className='text-[13px] font-medium text-gray-900'>{v.name}</p>
                </div>
                <div>
                  <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                    Price
                  </p>
                  <p className='text-[13px] font-medium text-gray-900'>
                    ${Number(v.price).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                    Stock
                  </p>
                  <p className='text-[13px] font-medium text-gray-900'>{v.stock}</p>
                </div>
                <div>
                  <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                    Subscription
                  </p>
                  <p className='text-[13px] font-medium text-gray-900'>
                    {v.subscriptionEligible ? `Yes (${v.subscriptionDiscount}%)` : 'No'}
                  </p>
                </div>
                <div className='col-span-2 sm:col-span-4 border-t border-gray-100 pt-2 mt-1'>
                  <p className='text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-1'>
                    Stripe Price ID
                  </p>
                  <p className='text-[13px] font-medium text-gray-900 font-mono'>
                    {v.stripePriceId || <span className="text-gray-400 italic">Not configured</span>}
                  </p>
                </div>
              </div>
            ))}
            {(!product.variants || product.variants.length === 0) && (
              <div className='text-[13px] text-gray-500 italic p-2 text-center border border-dashed border-gray-300 rounded-md'>
                No variants found.
              </div>
            )}
          </div>
        </div>

        {/* ── Accordion Details Card ── */}
        {product.accordionDetails && product.accordionDetails.length > 0 && (
          <div className='mx-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4'>
            <div>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
                <ChevronsRight className='w-4 h-4 text-purple-600' />
                Additional Details
              </span>
            </div>

            <div className='flex flex-col gap-3'>
              {product.accordionDetails.map(
                (detail: { title: string; content: string }, idx: number) => (
                  <div key={idx} className='bg-white border border-[#E5E5E5] rounded-md p-3'>
                    <p className='text-[14px] font-medium text-gray-900 mb-1'>{detail.title}</p>
                    <p className='text-[13px] text-gray-600 whitespace-pre-wrap'>
                      {detail.content}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className='mt-auto px-5 pt-8 pb-5 flex justify-end gap-2 md:mb-14'>
          <button
            type='button'
            onClick={onClose}
            className='h-9 px-6 rounded-[6px] border border-[#E5E7EB] text-[15px] bg-[#FAFAF9] text-[#1D3A5F] hover:bg-gray-200 transition-colors cursor-pointer font-medium shadow-sm'
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
}
