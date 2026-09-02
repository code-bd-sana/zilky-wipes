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
    <section className='max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16'>
      <PageTitle
        align='center'
        title={title}
        titleClassName='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) text-center max-w-2xl mx-auto'
        subtitle={[subtitle]}
        subtitleClassName='text-xs sm:text-sm md:text-base text-(--text-secondary) mt-2 sm:mt-3 text-center max-w-xl mx-auto'
      />

      <div className='flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8'>
        <button
          type='button'
          onClick={() => setActiveTab('general')}
          className={`rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-medium transition-all shadow-2xs ${
            activeTab === 'general'
              ? 'bg-(--text-primary) text-white'
              : 'border border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5 bg-white'
          }`}
        >
          {generalText}
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('market')}
          className={`rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-medium transition-all shadow-2xs ${
            activeTab === 'market'
              ? 'bg-(--text-primary) text-white'
              : 'border border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5 bg-white'
          }`}
        >
          {marketText}
        </button>
      </div>

      <div className='mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto'>
        {activeTab === 'general' ? <GeneralFeedbackForm /> : <MarketResearchSurvey />}
      </div>

      <p className='text-center text-xs sm:text-sm text-(--text-secondary) mt-8 sm:mt-10 max-w-md mx-auto italic'>
        &quot;{footerText}&quot;
      </p>
    </section>
  );
}

