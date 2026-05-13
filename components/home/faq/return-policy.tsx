"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ReturnPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const returnQuestions = [
    {
      question: "What is your refund policy?",
      answer:
        "We offer refunds within 30 days of purchase for eligible products. To request a refund, please contact our support team with your order details.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "You can request a refund by emailing our support team at [support email] or by filling out the refund form on our website. Include your order number and reason for the request.",
    },
    {
      question: "Which purchases are eligible for a refund?",
      answer:
        "Only products purchased directly from our website are eligible. Digital products may have different conditions; please check the product page for details.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Refunds are typically processed within 5-7 business days after your request is approved.'",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Return Policy
      </p>

      <div className='mt-6 space-y-8'>
        {returnQuestions.map((item, index) => (
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
