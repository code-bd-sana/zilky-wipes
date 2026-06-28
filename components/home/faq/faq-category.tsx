"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FaqCategory({ data }: { data: { name?: string, questions?: { id?: string, question: string, answer: string }[] } }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data || !data.questions || data.questions.length === 0) {
    return null;
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20">
      <p className="text-[#979191] border-b border-[#F2F2F2] pb-2 font-medium">
        {data.name}
      </p>

      <div className="mt-6 space-y-8">
        {data.questions.map((item: { id?: string, question: string, answer: string }, index: number) => (
          <div key={item.id || index}>
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between gap-4 text-left"
            >
              <p className="text-[#474747] text-base font-medium">{item.question}</p>

              {openIndex === index ? (
                <X size={18} className="text-[#474747] shrink-0" />
              ) : (
                <Plus size={18} className="text-[#474747] shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <p className="text-[#979191] text-sm mt-2 leading-relaxed">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
