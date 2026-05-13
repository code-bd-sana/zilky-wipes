"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TechnicalAndPractical() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const paymentQuestions = [
    {
      question: "How many wipes are in each roll?",
      answer:
        "Each roll contains 150 individual wipes. For most people, this lasts 2-3 weeks with regular use. Our 4-pack (600 total wipes) typically lasts 2-3 months for an individual or 1-2 months for a family of four.",
    },
    {
      question: "Can I flush multiple wipes at once?",
      answer:
        "While ZilkyWipes are designed to be flushable, we recommend flushing no more than 3-4 wipes at a time to ensure optimal breakdown and prevent any potential issues with older plumbing systems. This is more than sufficient for most uses.",
    },
    {
      question: "What if I have a septic system?",
      answer:
        "ZilkyWipes are completely safe for septic systems. They're specifically tested and certified for septic compatibility. The biodegradable materials actually break down faster than many toilet papers, and the natural ingredients won't disrupt your septic system's bacterial balance.",
    },
    {
      question: "Can I use ZilkyWipes for other cleaning purposes?",
      answer:
        "While ZilkyWipes are specifically formulated for personal hygiene, their gentle yet effective formula makes them suitable for general cleaning of hands, face, or surfaces. However, for optimal value and performance, we recommend using them as intended for personal care.",
    },
    {
      question: "How should I store unused rolls?",
      answer:
        "Store unused rolls in a cool, dry place away from direct sunlight. They have a shelf life of 2 years when stored properly. Once opened and placed in the holder, use within 6 months for optimal freshness, though they remain safe and effective beyond this timeframe.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Technical & Practical
      </p>

      <div className='mt-6 space-y-8'>
        {paymentQuestions.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleToggle(index)}
              className='w-full flex items-center justify-between gap-4 text-left'
            >
              <p className='text-[#474747] text-base '>{item.question}</p>

              {openIndex === index ? (
                <X size={18} className='text-[#474747] shrink-0' />
              ) : (
                <Plus size={18} className='text-[#474747] shrink-0' />
              )}
            </button>

            {openIndex === index && (
              <p className='text-[#979191] text-sm mt-2'>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
