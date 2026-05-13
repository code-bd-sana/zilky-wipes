"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function Product() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const productQuestions = [
    {
      question: "Aren't ZilkyWipes more expensive than toilet paper?",
      answer:
        "While the upfront cost is higher, ZilkyWipes often provide better value because you use fewer wipes per use, reduce the need for additional products (like wet wipes or creams), and the health benefits can save money on medical issues. Many customers find their monthly costs are similar or even lower when factoring in the superior cleaning and reduced product usage.",
    },
    {
      question: "Why should I pay for something when toilet paper works fine?",
      answer:
        "Toilet paper only removes about 60% of bacteria, while ZilkyWipes remove 99.9%. This superior cleaning can prevent UTIs, reduce irritation, and improve overall hygiene and confidence. Think of it as an investment in your health and comfort - the small daily cost often pays for itself in reduced health issues and increased quality of life.",
    },
    {
      question: "Is the subscription worth it?",
      answer:
        "The subscription offers significant benefits: 15% savings, free shipping, never running out, and the convenience of automatic delivery. You can adjust frequency, skip deliveries, or cancel anytime. Most customers save $50-100 annually with the subscription while ensuring they never run out of this essential product.",
    },
    {
      question: "What if I don't like them? Can I get a refund?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied, return the unused portion for a full refund, no questions asked. We're confident you'll love ZilkyWipes, but we want you to try them risk-free.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Cost & Value
      </p>

      <div className='mt-6 space-y-8'>
        {productQuestions.map((item, index) => (
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
