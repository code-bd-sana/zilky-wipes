'use client';

import PageTitle from '@/components/shared/page-title/page-title';
import { useState } from 'react';
import GeneralFeedbackForm from './general-feedback-form';
import MarketResearchSurvey from './market-research-survey';

type TabType = 'general' | 'market';

export default function FeedbackPageContent({ data }: { data?: Record<string, unknown> }) {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const hero = data?.hero as { title?: string; subtitle?: string } | undefined;
  const buttons = data?.buttons as { generalText?: string; marketText?: string } | undefined;
  const footer = data?.footer as { text?: string } | undefined;

  const title = hero?.title || "We'd Love Your Feedback";
  const subtitle =
    hero?.subtitle ||
    'Your thoughts help us improve every part of the ZilkyWipes experience — from browsing the website to discovering the products you love.';
  const generalText = buttons?.generalText || 'General Feedback';
  const marketText = buttons?.marketText || 'Market Research Survey';
  const footerText =
    footer?.text ||
    'We read every message carefully and use your feedback to improve the ZilkyWipes experience.';

  return (
    <section className='pt-30 md:pt-40 mx-5 md:mx-12.5'>
      <PageTitle
        align='center'
        title={title}
        titleClassName='text-[#1D3A5F]! max-w-200! mx-auto!'
        subtitle={[subtitle]}
        subtitleClassName='text-[#979191]! text-base! md:text-xl! mt-5 max-w-220 mx-auto'
      />

      <div className='flex justify-center gap-4 mt-8 md:mt-12'>
        <button
          type='button'
          onClick={() => setActiveTab('general')}
          className={`rounded-full px-6 py-2.5 text-sm md:text-base font-medium transition-colors ${
            activeTab === 'general'
              ? 'bg-(--text-primary) text-white'
              : 'border border-(--text-primary)/30 text-(--text-primary) hover:bg-white/80'
          }`}
        >
          {generalText}
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('market')}
          className={`rounded-full px-6 py-2.5 text-sm md:text-base font-medium transition-colors ${
            activeTab === 'market'
              ? 'bg-(--text-primary) text-white'
              : 'border border-(--text-primary)/30 text-(--text-primary) hover:bg-white/80'
          }`}
        >
          {marketText}
        </button>
      </div>

      <div className='mt-12 md:mt-16 max-w-5xl mx-auto'>
        {activeTab === 'general' ? <GeneralFeedbackForm /> : <MarketResearchSurvey />}
      </div>

      <p className='text-center text-xs md:text-sm text-[#979191] mt-10 max-w-md mx-auto'>
        &quot;{footerText}&quot;
      </p>
    </section>
  );
}
