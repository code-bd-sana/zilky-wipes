'use client';

import { ChevronsRight, Maximize2, X, Eye, FileText, User } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

type ViewMarketResearchModalProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onClose: () => void;
};

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

export default function ViewMarketResearchModal({ data, onClose }: ViewMarketResearchModalProps) {
  if (!data) return null;

  return (
    <section className='fixed inset-0 z-50 flex justify-end p-3' onClick={onClose}>
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-4 pt-4 pb-3'>
          <div className='flex items-center gap-1'>
            <button type='button' onClick={onClose} className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <ChevronsRight className='w-4 h-4 text-[#262626]' />
            </button>
            <button type='button' className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <Maximize2 className='w-3 h-3 text-[#262626]' />
            </button>
          </div>
          <button type='button' onClick={onClose} className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
            <X className='w-4 h-4 text-[#8A8A8A]' />
          </button>
        </div>

        <div className='px-5 pb-4 flex items-start justify-between'>
          <div>
            <h2 className='text-2xl font-medium text-[#2B2D2E] leading-tight'>Market Research</h2>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-[13px] text-[#8A8A8A]'>
                ID: {data.id?.slice(0, 8).toUpperCase() || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 md:gap-6'>
          <div>
            <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
              <User className='w-4 h-4 text-blue-600' />
              User Information
            </span>
          </div>

          <div className='flex flex-col gap-5'>
            <DetailRow label='Name'>
              <ValueText>{data.fullName || 'Anonymous'}</ValueText>
            </DetailRow>

            <DetailRow label='Email'>
              <ValueText>{data.email || 'N/A'}</ValueText>
            </DetailRow>
            
            <div className="grid grid-cols-2 gap-4">
              <DetailRow label='Age Range'>
                <ValueText>{data.ageRange || 'N/A'}</ValueText>
              </DetailRow>
              <DetailRow label='Gender'>
                <ValueText><span className="capitalize">{data.gender || 'N/A'}</span></ValueText>
              </DetailRow>
            </div>
          </div>
        </div>

        <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 md:gap-6'>
          <div>
            <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
              <FileText className='w-4 h-4 text-orange-600' />
              Survey Details
            </span>
          </div>

          <div className='flex flex-col gap-5'>
            <DetailRow label='Navigation Ease'>
              <ValueText>{data.navigationEase} / 10</ValueText>
            </DetailRow>

            <DetailRow label='Found Info'>
              <ValueText>{data.informationFound}</ValueText>
            </DetailRow>
            
            <DetailRow label='Visual Appeal'>
              <ValueText>{data.visualAppeal} Stars</ValueText>
            </DetailRow>
            
            <DetailRow label='Recommend'>
              <ValueText>{data.recommendLikelihood} / 10</ValueText>
            </DetailRow>
            
            <DetailRow label='Overall Rating'>
              <ValueText>{data.overallRating} Stars</ValueText>
            </DetailRow>

            <DetailRow label='Useful Sections'>
              <div className='w-full min-h-9.5 bg-white border border-[#E5E5E5] rounded-[6px] px-2 py-1.5 flex flex-wrap gap-1.5'>
                {data.usefulSections?.length ? (
                  data.usefulSections.map((s: string, i: number) => (
                    <span key={i} className='bg-blue-50 border border-blue-100 px-2 py-1 rounded text-[12px] font-medium text-blue-700'>
                      {s}
                    </span>
                  ))
                ) : (
                  <span className='text-[13px] text-gray-400 p-1'>None</span>
                )}
              </div>
            </DetailRow>
            
            <DetailRow label='Improvements'>
              <div className='w-full min-h-20 bg-white border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E] whitespace-pre-wrap'>
                {data.improvementSuggest || 'N/A'}
              </div>
            </DetailRow>
            
            <DetailRow label='Issues Encountered'>
              <div className='w-full min-h-20 bg-white border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E] whitespace-pre-wrap'>
                {data.issuesEncountered || 'N/A'}
              </div>
            </DetailRow>
            
            <DetailRow label='Comments'>
              <div className='w-full min-h-20 bg-white border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E] whitespace-pre-wrap'>
                {data.additionalComments || 'N/A'}
              </div>
            </DetailRow>
          </div>
        </div>

        {data.attachmentUrls && data.attachmentUrls.length > 0 && (
          <div className='mx-5 mb-5 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4'>
            <div>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1.5 shadow-sm'>
                <Eye className='w-4 h-4 text-emerald-600' />
                Attachments ({data.attachmentUrls.length})
              </span>
            </div>
            <div className='flex gap-4 flex-wrap overflow-x-auto py-2'>
              {data.attachmentUrls.map((url: string, idx: number) => (
                <a
                  key={idx}
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  className='relative w-24 h-24 shrink-0 rounded-md border border-[#E5E5E5] overflow-hidden bg-white hover:opacity-80 transition flex items-center justify-center'
                >
                  {url.toLowerCase().endsWith('.pdf') ? (
                    <span className='text-[10px] font-bold text-gray-400'>PDF Document</span>
                  ) : (
                    <Image src={url} alt={`Attachment ${idx + 1}`} fill unoptimized className='object-cover' />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

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
