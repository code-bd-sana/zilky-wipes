"use client";

import { useState } from "react";
import PageTitle from "@/components/shared/page-title/page-title";
import GeneralFeedbackForm from "./general-feedback-form";

type TabType = "general" | "market";

export default function FeedbackPageContent() {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  return (
    <section className='pt-30 md:pt-40 mx-5 md:mx-12.5'>
      <PageTitle
        align='center'
        title="We'd Love Your Feedback"
        titleClassName='text-[#1D3A5F]! max-w-200! mx-auto!'
        subtitle={[
          "Your thoughts help us improve every part of the ZilkyWipes experience — from browsing the",
          "website to discovering the products you love.",
        ]}
        subtitleClassName='text-[#979191]! text-base! md:text-xl! mt-5 max-w-220 mx-auto'
      />

      <div className='flex justify-center gap-4 mt-8 md:mt-12'>
        <button
          type='button'
          onClick={() => setActiveTab("general")}
          className={`rounded-full px-6 py-2.5 text-sm md:text-base font-medium transition-colors ${
            activeTab === "general"
              ? "bg-(--text-primary) text-white"
              : "border border-(--text-primary)/30 text-(--text-primary) hover:bg-white/80"
          }`}>
          General Feedback
        </button>
        <button
          type='button'
          onClick={() => setActiveTab("market")}
          className={`rounded-full px-6 py-2.5 text-sm md:text-base font-medium transition-colors ${
            activeTab === "market"
              ? "bg-(--text-primary) text-white"
              : "border border-(--text-primary)/30 text-(--text-primary) hover:bg-white/80"
          }`}>
          Market Research Survey
        </button>
      </div>

      <div className='mt-12 md:mt-16 max-w-5xl mx-auto'>
        {activeTab === "general" ? (
          <GeneralFeedbackForm />
        ) : (
          <div className='bg-white rounded-2xl p-8 md:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.04)] text-center text-(--text-primary)'>
            <p>Market Research Survey coming soon...</p>
          </div>
        )}
      </div>

      <p className='text-center text-xs md:text-sm text-[#979191] mt-10 max-w-md mx-auto'>
        &quot;We read every message carefully and use your feedback to improve the ZilkyWipes experience.&quot;
      </p>
    </section>
  );
}