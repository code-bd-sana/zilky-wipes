"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";

const TITLE = "Connect Apps With Your Dashboard";
const SUBTITLE =
  "Complete these simple steps to get your studio up and running";

const STEPS = [
  {
    id: 1,
    title: "Connect to Facebook & Instagram",
    description: "Take the first step to get hired and viewed by companies",
    connected: false,
  },
  {
    id: 2,
    title: "Connect to TikTok",
    description: "Take the first step to get hired and viewed by companies",
    connected: false,
  },
  {
    id: 3,
    title: "Connect to Google Ad",
    description: "Take the first step to get hired and viewed by companies",
    connected: false,
  },
  {
    id: 4,
    title: "Connect to Amazon",
    description: "Take the first step to get hired and viewed by companies",
    connected: false,
  },
];

export default function IntegrationContent() {
  const [steps, setSteps] = useState(STEPS);

  const handleConnect = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, connected: true } : step,
      ),
    );
  };

  return (
    <section className='min-h-screen bg-white px-4 '>
      <div className='sm:mx-5 md:mx-10 lg:mx-20 xl:mx-50 2xl:mx-80 mx-auto mt-30'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-2xl font-medium text-gray-900 mb-1'>{TITLE}</h1>
          <p className='text-sm text-[#A1A1AA] text-extralight'>{SUBTITLE}</p>
        </div>

        {/* Steps */}
        <div className='flex flex-col gap-4'>
          {steps.map((step) => (
            <div
              key={step.id}
              className='flex items-center justify-between py-4'>
              {/* Left: Number + Text */}
              <div className='flex items-center gap-4'>
                <div className='w-9 h-9 rounded-full bg-[#F5F5F4] flex items-center justify-center text-base text-[#262626] font-medium shrink-0'>
                  {step.id}
                </div>
                <div>
                  <p className='text-base text-[#52525B]'>{step.title}</p>
                  <p className='text-xs text-[#A1A1AA] mt-0.5'>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Right: Button or Checkmark */}
              {step.connected ? (
                <div className='w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0'>
                  <Check size={16} color='#2F7F52' />
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(step.id)}
                  className='flex items-center gap-1.5 px-4 py-2 rounded-md border bg-[#FAFAF9] border-[#E5E7EB] text-sm text-[#262626] hover:bg-gray-100 transition-colors shrink-0 cursor-pointer'>
                  <Plus size={16} color='#262626' />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
