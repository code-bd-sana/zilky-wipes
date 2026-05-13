"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ShippingAndDelivery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const shippingQuestions = [
    {
      question: "How do I install the canister holder?",
      answer:
        "Installation is incredibly simple and takes less than 30 seconds. The canister holder slides directly onto your existing toilet paper holder rod - no tools, screws, or permanent installation required. Simply slide it on, insert your ZilkyWipes roll, and pull the first wipe through the top opening. It works with all standard toilet paper holders.",
    },
    {
      question: "Will the holder fit my toilet paper dispenser?",
      answer:
        "Yes, our canister holder is designed to fit all standard toilet paper holders, including spring-loaded, fixed rod, and wall-mounted dispensers. The universal design accommodates rod diameters from 0.5 to 1.5 inches. If you have an unusual setup, contact us and we'll help find a solution.",
    },
    {
      question: "How many wipes should I use at once?",
      answer:
        "Most people find that 2-3 ZilkyWipes provide optimal cleaning. Because they're more effective than dry toilet paper, you typically need fewer wipes overall. Start with 2-3 and adjust based on your personal preference. The wipes are strong and won't tear during use.",
    },
    {
      question: "Can I use ZilkyWipes with regular toilet paper?",
      answer:
        "Many customers use ZilkyWipes as a finishing step after regular toilet paper for the ultimate clean feeling. This combination approach gives you the best of both worlds - the familiarity of toilet paper with the superior cleanliness of ZilkyWipes.",
    },
    {
      question: "Do the wipes dry out in the holder?",
      answer:
        "No, our canister holder is designed to keep wipes fresh and moist. The sealed design prevents air exposure, and each roll stays fresh for up to 6 months after opening. The wipes are individually moistened and sealed during manufacturing to maintain optimal moisture content.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Usage & Installation
      </p>

      <div className='mt-6 space-y-8'>
        {shippingQuestions.map((item, index) => (
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
