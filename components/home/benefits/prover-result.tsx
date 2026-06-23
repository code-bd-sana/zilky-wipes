"use client";

import { FlaskConical, Timer, FlaskRound, UserCheck } from "lucide-react";
import PageTitle from "@/components/shared/page-title/page-title";

const iconConfigs = [
  { icon: FlaskConical, iconColor: "#4ECBA4", iconBg: "rgba(78,203,164,0.12)", accentColor: "#4ECBA4", valueColor: "#4ECBA4" },
  { icon: Timer, iconColor: "#A78BFA", iconBg: "rgba(167,139,250,0.12)", accentColor: "#A78BFA", valueColor: "#A78BFA" },
  { icon: FlaskRound, iconColor: "#F87171", iconBg: "rgba(248,113,113,0.12)", accentColor: "#F87171", valueColor: "#F87171" },
  { icon: UserCheck, iconColor: "#FBBF24", iconBg: "rgba(251,191,36,0.12)", accentColor: "#FBBF24", valueColor: "#FBBF24" },
];

export default function ProvenResults({ data }: { data?: any }) {
  const title = data?.title || 'Scientifically Proven Results';
  
  const defaultStats = [
    {
      value: "99.9%",
      title: "Bacteria Removal Rate",
      description: "Breaks down 4x faster than leading competitor wet wipes.",
    },
    {
      value: "4×",
      title: "Faster Breakdown",
      description: "Breaks down 4x faster than leading competitor wet wipes.",
    },
    {
      value: "0%",
      title: "Harsh Chemicals or Alcohol",
      description: "Pure water-based formula, nothing irritating or synthetic.",
    },
    {
      value: "100%",
      title: "Dermatologist Approved",
      description:
        "Every formulation reviewed and certified by leading dermatologists.",
    },
  ];

  const stats = data?.statList?.length ? data.statList : defaultStats;

  return (
    <section
      className='px-4 md:px-14 lg:px-40 py-10 md:py-16 font-serif mb-10 lg:mb-20'
      style={{ background: "#1D3A5F" }}>
      {/* Heading */}
      <PageTitle
        title={title}
        titleClassName='max-w-600! mx-auto text-[40px]! leading-[1.1]! md:text-[54px]! text-white! mb-14'
      />

      {/* Cards grid */}
      <div className='max-w-480 mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((stat: any, index: number) => {
          const config = iconConfigs[index % iconConfigs.length];
          const Icon = config.icon;
          return (
            <div
              key={index}
              className='flex flex-col gap-6 rounded-2xl p-6 md:p-7 transition-transform duration-200 hover:-translate-y-1'
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
              }}>
              {/* Icon */}
              <div
                className='w-9 h-9 rounded-lg flex items-center justify-center'
                style={{ background: config.iconBg }}>
                <Icon
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: config.iconColor }}
                />
              </div>

              {/* Value */}
              <span
                className='text-4xl md:text-[42px] font-serif font-normal leading-none'
                style={{ color: config.valueColor }}>
                {stat.value}
              </span>

              {/* Title */}
              <p className='font-sans text-white text-2xl leading-snug'>
                {stat.title}
              </p>

              {/* Description */}
              <p
                className='font-sans text-xs md:text-sm leading-relaxed'
                style={{ color: "rgba(255,255,255,0.5)" }}>
                {stat.description}
              </p>

              {/* Bottom accent line */}
              <div className='mt-auto pt-4'>
                <div
                  className='h-px w-8 rounded-full'
                  style={{ background: config.accentColor, opacity: 0.6 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
