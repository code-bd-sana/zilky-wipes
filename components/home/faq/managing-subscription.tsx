"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ManagingSubscription() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const subsQuestions = [
    {
      question: "Are ZilkyWipes really flushable and safe for plumbing?",
      answer:
        "Yes, ZilkyWipes are genuinely flushable and have been rigorously tested to ensure they break down 4x faster than leading competitors. They're certified safe for all plumbing systems, septic tanks, and municipal water treatment facilities. Unlike many 'flushable' wipes that can cause blockages, our wipes disintegrate completely within 24 hours of flushing.",
    },
    {
      question: "What makes ZilkyWipes different from regular wet wipes?",
      answer:
        "ZilkyWipes are specifically designed to be truly flushable, unlike most wet wipes that can clog pipes. They're made with a unique biodegradable material that breaks down quickly in water, contain no harsh chemicals or alcohol, and are enriched with aloe vera and vitamin E for skin health. Plus, they come on a convenient roll that fits your existing toilet paper holder.",
    },
    {
      question: "Are they safe for sensitive skin and daily use?",
      answer:
        "Absolutely. ZilkyWipes are dermatologically tested, hypoallergenic, and pH-balanced. They're free from alcohol, harsh chemicals, artificial fragrances, and parabens. The formula includes soothing aloe vera and vitamin E, making them gentle enough for the most sensitive skin and safe for daily use by the entire family.",
    },
    {
      question: "Can ZilkyWipes cause yeast infections or UTIs?",
      answer:
        "No, ZilkyWipes actually help reduce the risk of UTIs and infections. Our pH-balanced, alcohol-free formula doesn't disrupt your body's natural bacterial balance. In fact, the superior cleaning action removes more harmful bacteria than dry toilet paper, potentially reducing infection risk. However, as with any personal care product, if you have specific medical concerns, consult your healthcare provider.",
    },
    {
      question: "Are ZilkyWipes safe for children and babies?",
      answer:
        "Yes, ZilkyWipes are safe for children over 3 years old. The gentle, hypoallergenic formula is perfect for kids' sensitive skin. However, for babies and toddlers under 3, we recommend consulting with your pediatrician first, as their skin and digestive systems are still developing.",
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Product & Safety
      </p>

      <div className='mt-6 space-y-8'>
        {subsQuestions.map((item, index) => (
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