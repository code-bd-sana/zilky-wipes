"use client";

import React, { useState } from "react";
import { StickyNote, Droplet, Check, TriangleAlert, X } from "lucide-react";
import PageTitle from "@/components/shared/page-title/page-title";

type ColKey = "zilky" | "toiletPaper" | "wetWipes";

const BRAND = "#1D3A5F";

const COLS: {
  key: ColKey;
  label: string;
  icon: string | React.ElementType | React.ReactNode;
  tag: string;
}[] = [
  {
    key: "zilky",
    label: "ZilkyWipes",
    icon: "Z",
    tag: "Premium",
  },
  {
    key: "toiletPaper",
    label: "Regular Toilet Paper",
    icon: StickyNote,
    tag: "Regular",
  },
  {
    key: "wetWipes",
    label: "Traditional Wet Wipes",
    icon: Droplet,
    tag: "Traditional",
  },
];

type CellValue =
  | "stars-5"
  | "stars-2"
  | "stars-4"
  | "check-circle"
  | "x-most-arent"
  | "x-separate-dispenser"
  | "x-often-harmful"
  | "warn-can-irritate"
  | "warn-often-harsh"
  | "warn-deforestation";

const benefitData: {
  label: string;
  zilky: CellValue;
  toiletPaper: CellValue;
  wetWipes: CellValue;
}[] = [
  {
    label: "Cleanliness Level",
    zilky: "stars-5",
    toiletPaper: "stars-2",
    wetWipes: "stars-4",
  },
  {
    label: "Flushable & Safe",
    zilky: "check-circle",
    toiletPaper: "check-circle",
    wetWipes: "x-most-arent",
  },
  {
    label: "Convenience",
    zilky: "check-circle",
    toiletPaper: "check-circle",
    wetWipes: "x-separate-dispenser",
  },
  {
    label: "Skin-Friendly",
    zilky: "check-circle",
    toiletPaper: "warn-can-irritate",
    wetWipes: "warn-often-harsh",
  },
  {
    label: "Environmental Impact",
    zilky: "check-circle",
    toiletPaper: "warn-deforestation",
    wetWipes: "x-often-harmful",
  },
];

// ── Star renderer ──────────────────────────────────────────────────────────────
function Stars({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className='flex items-center justify-center gap-0.5'>
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          viewBox='0 0 20 20'
          className='w-4 h-4 md:w-5 md:h-5'
          fill={i < filled ? BRAND : "none"}
          stroke={BRAND}
          strokeWidth={1.5}>
          <path d='M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.77l-4.78 2.53.91-5.32L2.27 7.12l5.34-.78L10 1.5z' />
        </svg>
      ))}
    </div>
  );
}

// ── Cell renderer ──────────────────────────────────────────────────────────────
function renderCell(value: CellValue) {
  switch (value) {
    case "stars-5":
      return <Stars filled={5} />;
    case "stars-4":
      return <Stars filled={3} />;
    case "stars-2":
      return <Stars filled={2} />;
    case "check-circle":
      return <Check />;

    case "x-most-arent":
      return (
        <span className='inline-flex items-center gap-1 text-[#BA1A1A] text-xs md:text-sm font-sans'>
          <span className='border border-[#BA1A1A] rounded-full w-4 h-4 p-0.5 flex items-center justify-center'>
            <X />{" "}
          </span>
          Most aren&apos;t
        </span>
      );
    case "x-separate-dispenser":
      return (
        <span className='inline-flex items-center gap-1 text-[#BA1A1A] text-xs md:text-sm font-sans'>
          <span className='border border-[#BA1A1A] rounded-full w-4 h-4 p-0.5 flex items-center justify-center'>
            <X />{" "}
          </span>
          Separate dispenser
        </span>
      );
    case "x-often-harmful":
      return (
        <span className='inline-flex items-center gap-1 text-[#BA1A1A] text-xs md:text-sm font-sans'>
          <span className='border border-[#BA1A1A] rounded-full w-4 h-4 p-0.5 flex items-center justify-center'>
            <X />{" "}
          </span>
          Often harmful
        </span>
      );

    case "warn-can-irritate":
      return (
        <span className='inline-flex items-center gap-1 text-[#C47A00] text-xs md:text-sm font-sans'>
          <TriangleAlert className='h-5 w-5' /> Can irritate
        </span>
      );
    case "warn-often-harsh":
      return (
        <span className='inline-flex items-center gap-1 text-[#C47A00] text-xs md:text-sm font-sans'>
          <TriangleAlert className='h-5 w-5' /> Often harsh
        </span>
      );
    case "warn-deforestation":
      return (
        <span className='inline-flex items-center gap-1 text-[#C47A00] text-xs md:text-sm font-sans'>
          <TriangleAlert className='h-5 w-5' /> Deforestation
        </span>
      );

    default:
      return null;
  }
}

export default function ZilkyAdvantage() {
  const [hoveredCol, setHoveredCol] = useState<ColKey | null>(null);

  const getFlex = (key: ColKey) => {
    if (!hoveredCol) return "flex-1";
    if (hoveredCol === key) return "flex-[1.15]";
    return "flex-[0.93]";
  };

  return (
    <section className='max-w-480 mx-auto px-4 md:px-14 lg:px-45 py-10 md:py-16 font-serif'>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className='my-10 md:mb-25 text-center'>
        <p
          className='font-sans text-xs tracking-widest uppercase mb-2 opacity-60'
          style={{ color: BRAND }}>
          Why choose ZilkyWipes
        </p>
        <PageTitle
          title='The ZilkyWipes Advantage'
          titleClassName='max-w-200! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
        />
        <p className='font-sans text-sm md:text-base text-gray-500 max-w-md mx-auto mt-3 leading-relaxed'>
          See how ZilkyWipes stacks up against ordinary alternatives — across
          cleanliness, comfort, and care.
        </p>
      </div>

      {/* ── Desktop / Tablet ─────────────────────────────────────────────── */}
      <div className='hidden sm:block'>
        {/* Column headers */}
        <div className='flex border-b border-gray-200 mb-2'>
          <div className='w-28 md:w-48 shrink-0 flex items-end pb-4'>
            <span className='font-sans text-xs uppercase tracking-wider text-gray-400'>
              Feature
            </span>
          </div>

          {COLS.map(({ key, label, icon, tag }) => {
            const isZilky = key === "zilky";
            const isHovered = hoveredCol === key;
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredCol(key)}
                onMouseLeave={() => setHoveredCol(null)}
                className={[
                  getFlex(key),
                  "min-w-0 text-center rounded-t-xl cursor-default select-none overflow-hidden font-sans transition-all duration-300 py-4 md:py-5 px-2 md:px-5",
                  isZilky ? "bg-[#1D3A5F08]" : isHovered ? "bg-[#FBFAF9]" : "",
                ].join(" ")}>
                <div className='flex flex-col items-center gap-1.5'>
                  {/* Icon */}
                  {typeof icon === "string" ? (
                    <div
                      className='w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold'
                      style={
                        isZilky
                          ? { background: BRAND, color: "#fff" }
                          : { background: "#1D3A5F15", color: BRAND }
                      }>
                      {icon}
                    </div>
                  ) : React.isValidElement(icon) ? (
                    icon
                  ) : (
                    (() => {
                      const IconComp = icon as React.ElementType;
                      return (
                        <div
                          className='w-9 h-9 rounded-full flex items-center justify-center'
                          style={{ background: "#1D3A5F15" }}>
                          <IconComp
                            className='w-4 h-4'
                            style={{ color: BRAND }}
                          />
                        </div>
                      );
                    })()
                  )}

                  {/* Label */}
                  <span
                    className='text-xl leading-tight font-semibold'
                    style={{
                      color: isZilky ? BRAND : isHovered ? "#262626" : "#888",
                    }}>
                    {label}
                  </span>

                  {/* Tag */}
                  <span
                    className='text-xs px-2.5 py-0.5 rounded-full'
                    style={
                      isZilky
                        ? { background: "#1D3A5F15", color: BRAND }
                        : { background: "#f3f3f1", color: "#888" }
                    }>
                    {tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        {benefitData.map((row, index) => {
          const isLast = index === benefitData.length - 1;
          return (
            <div key={index} className='flex'>
              <div
                className={[
                  "w-28 md:w-48 shrink-0 flex items-center py-4 md:py-5 pr-2 md:pr-4 font-sans text-xs md:text-sm text-gray-500",
                  !isLast && "border-b border-gray-100",
                ].join(" ")}>
                {row.label}
              </div>

              {COLS.map(({ key }) => {
                const isZilky = key === "zilky";
                const isHovered = hoveredCol === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHoveredCol(key)}
                    onMouseLeave={() => setHoveredCol(null)}
                    className={[
                      getFlex(key),
                      "min-w-0 flex items-center justify-center font-sans overflow-hidden cursor-default transition-all duration-300 py-1",
                      !isLast && "border-b border-gray-100",
                      isZilky
                        ? "bg-[#1D3A5F08]"
                        : isHovered
                          ? "bg-[#FBFAF9]"
                          : "",
                    ].join(" ")}>
                    {renderCell(row[key])}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Mobile — stacked cards ────────────────────────────────────────── */}
      <div className='sm:hidden flex flex-col gap-4'>
        {COLS.map(({ key, label, icon, tag }) => {
          const isZilky = key === "zilky";
          return (
            <div
              key={key}
              className='rounded-2xl border border-gray-100 bg-[#FBFAF9] overflow-hidden'>
              {/* Card header */}
              <div
                className='px-4 py-3 border-b border-gray-100'
                style={isZilky ? { background: "#1D3A5F08" } : {}}>
                <div className='flex items-center gap-3'>
                  {typeof icon === "string" ? (
                    <div
                      className='w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0'
                      style={
                        isZilky
                          ? { background: BRAND, color: "#fff" }
                          : { background: "#1D3A5F15", color: BRAND }
                      }>
                      {icon}
                    </div>
                  ) : React.isValidElement(icon) ? (
                    icon
                  ) : (
                    (() => {
                      const IconComp = icon as React.ElementType;
                      return (
                        <div
                          className='w-9 h-9 rounded-full flex items-center justify-center shrink-0'
                          style={{ background: "#1D3A5F15" }}>
                          <IconComp
                            className='w-4 h-4'
                            style={{ color: BRAND }}
                          />
                        </div>
                      );
                    })()
                  )}

                  <div className='flex flex-col'>
                    <span
                      className='text-sm font-semibold'
                      style={{ color: BRAND }}>
                      {label}
                    </span>
                    <span
                      className='text-xs px-2 py-0.5 rounded-full w-fit mt-0.5'
                      style={
                        isZilky
                          ? { background: "#1D3A5F15", color: BRAND }
                          : { background: "#f3f3f1", color: "#888" }
                      }>
                      {tag}
                    </span>
                  </div>
                </div>
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
                      {renderCell(row[key])}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
