"use client";

import { useState } from "react";
import { CheckCircle, Check, XCircle, Leaf } from "lucide-react";
import PageTitle from "@/components/shared/page-title/page-title";

type ColKey = "zilky" | "toiletPaper" | "wetWipes";

const COLS: { key: ColKey; label: string }[] = [
  { key: "zilky", label: "ZilkyWipes" },
  { key: "toiletPaper", label: "Regular Toilet Paper" },
  { key: "wetWipes", label: "Traditional Wet Wipes" },
];

// API-ready shape — swap this with a fetch() call when backend is ready
const benefitData = [
  {
    label: "Cleanliness Level",
    zilky: "Superior",
    toiletPaper: "Basic",
    wetWipes: "Good",
  },
  {
    label: "Flushable & Safe",
    zilky: "check-circle",
    toiletPaper: "check",
    wetWipes: "x-circle",
  },
  {
    label: "Skin-Friendliness",
    zilky: "Dermatologist Tested",
    toiletPaper: "Abrasive",
    wetWipes: "Can Irritate",
  },
  {
    label: "Environmental Impact",
    zilky: "leaf",
    toiletPaper: "High Paper Use",
    wetWipes: "Microplastics",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  "check-circle": (
    <CheckCircle className='w-5 h-5 text-teal-700' strokeWidth={1.5} />
  ),
  check: <Check className='w-5 h-5 text-gray-400' strokeWidth={2} />,
  "x-circle": <XCircle className='w-5 h-5 text-[#BA1A1A]' strokeWidth={1.5} />,
  leaf: <Leaf className='w-5 h-5 text-teal-700' strokeWidth={1.5} />,
};

const RED_TEXTS = ["Microplastics"];

function renderCell(value: string, isHovered: boolean) {
  if (ICONS[value]) return ICONS[value];

  return (
    <span
      className={[
        "text-xs md:text-sm transition-all duration-300 px-2 md:px-3 py-1 rounded-full text-center leading-tight",
        RED_TEXTS.includes(value) ? "text-[#BA1A1A]" : "text-[#43474E]",
        isHovered ? "bg-[#0006131A] border border-gray-200" : "",
      ].join(" ")}>
      {value}
    </span>
  );
}

export default function ZilkyAdvantage() {
  const [hoveredCol, setHoveredCol] = useState<ColKey | null>(null);

  const getFlex = (key: ColKey) => {
    if (!hoveredCol) return "flex-1";
    if (hoveredCol === key) return "flex-[1.15]";
    return "flex-[0.93]";
  };

  return (
    <section className='max-w-480 mx-auto px-4 md:px-14 lg:px-40 py-10 md:py-16 font-serif'>
      <div className='my-10 md:mb-25'>
        <PageTitle
          title='The ZilkyWipes Advantage'
          titleClassName='max-w-200! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
        />
      </div>

      {/* Desktop & Tablet — flex columns */}
      <div className='hidden sm:block'>
        {/* Header */}
        <div className='flex border-b border-gray-200 mb-2'>
          <div className='w-28 md:w-48 shrink-0' />
          {COLS.map(({ key, label }) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredCol(key)}
              onMouseLeave={() => setHoveredCol(null)}
              className={[
                getFlex(key),
                "min-w-0 text-center rounded-t-xl cursor-default select-none overflow-hidden font-sans transition-all duration-300 py-3 md:py-4 px-2 md:px-5",
                hoveredCol === key
                  ? "bg-[#FBFAF9] text-[#262626] font-medium"
                  : "text-gray-400 font-normal",
              ].join(" ")}>
              <span className='text-xs md:text-base leading-tight'>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Rows */}
        {benefitData.map((row, index) => {
          const isLast = index === benefitData.length - 1;
          return (
            <div key={index} className='flex'>
              <div
                className={[
                  "w-28 md:w-48 shrink-0 flex items-center py-4 md:py-5 pr-2 md:pr-4 font-sans text-xs md:text-sm text-gray-600",
                  !isLast && "border-b border-gray-100",
                ].join(" ")}>
                {row.label}
              </div>

              {COLS.map(({ key }) => {
                const isHovered = hoveredCol === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHoveredCol(key)}
                    onMouseLeave={() => setHoveredCol(null)}
                    className={[
                      getFlex(key),
                      "min-w-0 flex items-center justify-center font-sans overflow-hidden cursor-default transition-all duration-300 py-4 md:py-5 px-2 md:px-5",
                      !isLast && "border-b border-gray-100",
                      isHovered ? "bg-[#FBFAF9]" : "",
                    ].join(" ")}>
                    {renderCell(row[key], isHovered)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Mobile — stacked cards per column */}
      <div className='sm:hidden flex flex-col gap-4'>
        {COLS.map(({ key, label }) => (
          <div
            key={key}
            className='rounded-2xl border border-gray-100 bg-[#FBFAF9] overflow-hidden'>
            {/* Card header */}
            <div className='px-4 py-3 border-b border-gray-100'>
              <span className='text-sm font-semibold text-[#1a2744]'>
                {label}
              </span>
            </div>

            {/* Card rows */}
            {benefitData.map((row, index) => {
              const isLast = index === benefitData.length - 1;
              return (
                <div
                  key={index}
                  className={[
                    "flex items-center justify-between px-4 py-3",
                    !isLast && "border-b border-gray-100",
                  ].join(" ")}>
                  <span className='text-xs text-gray-500 font-sans'>
                    {row.label}
                  </span>
                  <div className='flex items-center justify-end'>
                    {renderCell(row[key], false)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
