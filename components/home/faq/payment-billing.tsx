"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function PaymentAndBilling() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const paymentQuestions = [
    {
      question: "Are ZilkyWipes really biodegradable and eco-friendly?",
      answer:
        "Yes, ZilkyWipes are 100% biodegradable and made from sustainable materials. They break down completely in water within 24 hours and in soil within 28 days. Our manufacturing process uses renewable energy, and packaging is made from recycled materials. We're committed to environmental responsibility without compromising performance.",
    },
    {
      question: "Won't flushing wipes harm the environment?",
      answer:
        "Unlike traditional wet wipes that can harm marine life and clog treatment facilities, ZilkyWipes are specifically engineered to break down completely before reaching water treatment plants. They're made from plant-based fibers that biodegrade naturally, and our formula contains only biodegradable ingredients that won't harm aquatic ecosystems.",
    },
    {
      question: "What chemicals are in ZilkyWipes?",
      answer:
        "ZilkyWipes contain only safe, gentle ingredients: purified water, aloe vera extract, vitamin E, natural plant-based cleansing agents, and a mild preservative system to prevent bacterial growth. We use NO alcohol, parabens, sulfates, artificial fragrances, or harsh chemicals. Full ingredient list is available on our packaging and website.",
    },
    {
      question: "Are they tested on animals?",
      answer:
        "No, ZilkyWipes are never tested on animals. We're committed to cruelty-free practices and use only established safe ingredients and alternative testing methods. Our products are certified cruelty-free by leading animal welfare organizations.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Environmental & Health Concerns
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
