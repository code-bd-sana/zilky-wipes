"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function OrderingAndDelivery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const paymentQuestions = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days within the continental US. We offer free shipping on orders over $35. Express shipping (1-2 days) is available for an additional fee. Subscription orders are prioritized and typically arrive within 2-3 business days.",
    },
    {
      question: "Can I change my subscription frequency?",
      answer:
        "Yes, you can easily adjust your subscription frequency, skip deliveries, or pause your subscription anytime through your online account. We offer monthly, bi-monthly, and quarterly options. You can also change your delivery address or payment method at any time.",
    },
    {
      question: "What if my package is damaged or lost?",
      answer:
        "We'll immediately send a replacement at no charge. All packages are insured, and we track every shipment. If there's any issue with your delivery, contact our customer service team and we'll resolve it within 24 hours.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship within the United States and Canada. We're working on expanding to other countries. If you're outside North America, join our waitlist and we'll notify you when shipping becomes available in your region.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Ordering & Delivery
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
