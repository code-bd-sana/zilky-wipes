"use client";

import { useState, useRef } from "react";
import PageTitle from "@/components/shared/page-title/page-title";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1L12.39 6.26L18.18 7.11L14.09 11.1L15.12 16.87L10 14.12L4.88 16.87L5.91 11.1L1.82 7.11L7.61 6.26L10 1Z"
            fill="#1B2F6E"
            stroke="#1B2F6E"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function BenefitPeopleCard({
  person,
}: {
  person: { name: string; feedback: string; stars: number };
}) {
  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm min-h-40 flex flex-col justify-between">
      <div>
        <StarRating count={person.stars} />
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
          {person.feedback}
        </p>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 font-medium">— {person.name}</p>
    </div>
  );
}

export default function AboutPeople({
  data,
  reviews,
}: {
  data?: Record<string, unknown>;
  reviews?: any[];
}) {
  const displayTestimonials =
    reviews && reviews.length > 0
      ? reviews.map((r) => ({
          name: r.user ? `${r.user.firstName} ${r.user.lastName}` : "Anonymous",
          feedback: r.comment || "Great product!",
          stars: r.rating,
        }))
      : [];

  const desktopSlides = [];
  for (let i = 0; i < displayTestimonials.length; i += 4) {
    desktopSlides.push(displayTestimonials.slice(i, i + 4));
  }

  const tabletSlides = [];
  for (let i = 0; i < displayTestimonials.length; i += 2) {
    tabletSlides.push(displayTestimonials.slice(i, i + 2));
  }

  const [desktopSlide, setDesktopSlide] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [tabletSlide, setTabletSlide] = useState(0);

  const title =
    (data?.title as string) ||
    "People don't talk about this. ....Until they try it!";

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      const isTablet =
        typeof window !== "undefined" &&
        window.innerWidth >= 768 &&
        window.innerWidth < 1024;
      const isDesktop =
        typeof window !== "undefined" && window.innerWidth >= 1024;

      if (diff > 0) {
        // Swipe left (next)
        if (isDesktop) {
          setDesktopSlide((prev) =>
            Math.min(prev + 1, desktopSlides.length - 1),
          );
        } else if (isTablet) {
          setTabletSlide((prev) => Math.min(prev + 1, tabletSlides.length - 1));
        } else {
          setMobileIndex((prev) =>
            Math.min(prev + 1, displayTestimonials.length - 1),
          );
        }
      } else {
        // Swipe right (prev)
        if (isDesktop) {
          setDesktopSlide((prev) => Math.max(prev - 1, 0));
        } else if (isTablet) {
          setTabletSlide((prev) => Math.max(prev - 1, 0));
        } else {
          setMobileIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="bg-[#FBFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5 mt-14 sm:mt-20 md:mt-28 py-12 sm:py-16 md:py-20 lg:py-24">
        <PageTitle
          title={title}
          align="center"
          titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) text-center max-w-3xl mx-auto"
        />

        {/* ── MOBILE: 1 card at a time with swipe ── */}
        <div className="block md:hidden mt-8 sm:mt-12">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {displayTestimonials.map((person, i) => (
                <div key={i} className="w-full shrink-0 px-1">
                  <BenefitPeopleCard person={person} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {displayTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMobileIndex(i)}
                className="p-1.5 focus:outline-none"
                aria-label={`Go to review ${i + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-200 ${
                    i === mobileIndex
                      ? "w-4 h-2 bg-[#1B2F6E]"
                      : "w-2 h-2 bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── TABLET: 2 cards per slide with swipe ── */}
        <div
          className="hidden md:block lg:hidden mt-10 md:mt-14"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${tabletSlide * 100}%)` }}
            >
              {tabletSlides.map((slide, slideIdx) => (
                <div key={slideIdx} className="w-full shrink-0 flex gap-6 px-1">
                  {slide.map((person, personIdx) => (
                    <div key={personIdx} className="flex-1">
                      <BenefitPeopleCard person={person} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {tabletSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setTabletSlide(index)}
                className="p-1.5 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-200 ${
                    index === tabletSlide
                      ? "w-4 h-2 bg-[#1B2F6E]"
                      : "w-2 h-2 bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 4 cards per slide (large screens) ── */}
        <div
          className="hidden lg:block mt-14"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-x-6"
              style={{ transform: `translateX(-${desktopSlide * 100}%)` }}
            >
              {desktopSlides.map((slide, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full shrink-0 flex gap-x-6 justify-center"
                >
                  {slide.map((person, personIdx) => (
                    <div key={personIdx} className="flex-1">
                      <BenefitPeopleCard person={person} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop dots */}
          <div className="flex justify-center gap-2 mt-10">
            {desktopSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setDesktopSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === desktopSlide ? "bg-[#1B2F6E]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

