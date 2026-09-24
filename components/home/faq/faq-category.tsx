"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FaqCategory({
  data,
  isSearching = false,
}: {
  data: {
    name?: string;
    questions?: { id?: string; question: string; answer: string }[];
  };
  isSearching?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data || !data.questions || data.questions.length === 0) {
    return null;
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-8 sm:pt-10 md:pt-12">
      <p className="text-xs sm:text-sm font-bold text-(--text-primary) uppercase tracking-wider border-b border-gray-200 pb-2">
        {data.name}
      </p>

      <div className="mt-4 divide-y divide-gray-100">
        {data.questions.map(
          (
            item: { id?: string; question: string; answer: string },
            index: number,
          ) => {
            const isOpen = isSearching || openIndex === index;

            return (
              <div key={item.id || index} className="py-3.5 sm:py-4">
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                >
                  <p className="text-(--text-primary) text-sm sm:text-base font-medium group-hover:text-blue-900 transition-colors">
                    {item.question}
                  </p>

                  {isOpen ? (
                    <X size={18} className="text-(--text-primary) shrink-0" />
                  ) : (
                    <Plus size={18} className="text-(--text-primary) shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="text-(--text-secondary) text-xs sm:text-sm leading-relaxed mt-2.5">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}

