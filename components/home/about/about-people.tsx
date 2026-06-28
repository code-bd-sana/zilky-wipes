"use client";

import { useState, useRef } from "react";
import PageTitle from "@/components/shared/page-title/page-title";

const allTestimonials = [
  {
    name: "Sarah Jhonson",
    feedback:
      "I had a great experience! The website is easy to navigate and I found everything I needed quickly. Highly recommend it!",
    stars: 5,
  },
  {
    name: "Daniel Carter",
    feedback:
      "The products are exactly as described. The checkout process was smooth, and delivery was on time. Love this site!",
    stars: 5,
  },
  {
    name: "Sophia Martinez",
    feedback:
      "Very good experience overall. Only thing is I wish there were more payment options, but service is top-notch.",
    stars: 5,
  },
  {
    name: "Charlotte Wilson",
    feedback:
      "Great website! Easy to use and products arrived quickly. I just wish they had more variety in colors and sizes.",
    stars: 5,
  },
  {
    name: "James Anderson",
    feedback:
      "Absolutely love the quality of their products. Customer support was very responsive and helpful throughout.",
    stars: 5,
  },
  {
    name: "Emily Davis",
    feedback:
      "Fast shipping and great packaging. The product exceeded my expectations. Will definitely order again!",
    stars: 5,
  },
  {
    name: "Michael Brown",
    feedback:
      "Really impressed with the overall experience. The site is intuitive and the products are top quality.",
    stars: 5,
  },
  {
    name: "Olivia Taylor",
    feedback:
      "Wonderful experience from start to finish. The team clearly cares about their customers and it shows.",
    stars: 5,
  },
  {
    name: "Liam Wilson",
    feedback:
      "I was skeptical at first but I'm so glad I tried it. The quality is outstanding and delivery was super fast.",
    stars: 5,
  },
  {
    name: "Ava Johnson",
    feedback:
      "Smooth checkout process and my order arrived earlier than expected. Couldn't be happier with my purchase.",
    stars: 5,
  },
  {
    name: "Noah Martinez",
    feedback:
      "Excellent service and product quality. The website is easy to use and the prices are very competitive.",
    stars: 5,
  },
  {
    name: "Isabella Garcia",
    feedback:
      "Amazing experience! The product is exactly what I was looking for. Will recommend to all my friends.",
    stars: 5,
  },
];

// Group into sets of 4 for desktop
const desktopSlides = [
  allTestimonials.slice(0, 4),
  allTestimonials.slice(4, 8),
  allTestimonials.slice(8, 12),
];

// Group into sets of 2 for tablet
const tabletSlides = [
  allTestimonials.slice(0, 2),
  allTestimonials.slice(2, 4),
  allTestimonials.slice(4, 6),
  allTestimonials.slice(6, 8),
  allTestimonials.slice(8, 10),
  allTestimonials.slice(10, 12),
];

function StarRating({ count }: { count: number }) {
  return (
    <div className='flex gap-1 mb-4'>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 1L12.39 6.26L18.18 7.11L14.09 11.1L15.12 16.87L10 14.12L4.88 16.87L5.91 11.1L1.82 7.11L7.61 6.26L10 1Z'
            fill='#1B2F6E'
            stroke='#1B2F6E'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
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
    <div className='w-full bg-white rounded-sm border border-gray-100 p-6 shadow-sm'>
      <StarRating count={person.stars} />
      <p className='text-sm text-gray-700 leading-relaxed mb-6'>
        {person.feedback}
      </p>
      <p className='text-sm text-gray-600'>— {person.name}</p>
    </div>
  );
}

export default function AboutPeople({ data }: { data?: Record<string, unknown> }) {
  const [desktopSlide, setDesktopSlide] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [tabletSlide, setTabletSlide] = useState(0);

  const title = (data?.title as string) || "People don't talk about this. ....Until they try it!";

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

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
            Math.min(prev + 1, allTestimonials.length - 1),
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
    <section className='bg-[#FBFAF9]'>
      <div className='max-w-480 mx-auto px-5 md:px-12 lg:px-20 xl:px-40 mt-20 py-25'>
        <PageTitle
          title={title}
          titleClassName='max-w-250!'
        />

        {/* ── MOBILE: 1 card at a time with swipe ── */}
        <div className='block md:hidden mt-16'>
          <div
            className='relative overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}>
              {allTestimonials.map((person, i) => (
                <div key={i} className='w-full shrink-0 px-1'>
                  <BenefitPeopleCard person={person} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots */}
          <div className='flex justify-center gap-2 mt-8'>
            {allTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === mobileIndex
                    ? "w-2.5 h-2.5 bg-[#1B2F6E]"
                    : "w-2 h-2 bg-gray-300"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── TABLET: 2 cards per slide with swipe ── */}
        <div
          className='hidden md:block lg:hidden mt-16'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className='relative overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${tabletSlide * 100}%)` }}>
              {tabletSlides.map((slide, slideIdx) => (
                <div key={slideIdx} className='w-full shrink-0 flex gap-6 px-1'>
                  {slide.map((person, personIdx) => (
                    <div key={personIdx} className='flex-1'>
                      <BenefitPeopleCard person={person} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet dots */}
          <div className='flex justify-center gap-2 mt-8'>
            {tabletSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setTabletSlide(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === tabletSlide
                    ? "w-2.5 h-2.5 bg-[#1B2F6E]"
                    : "w-2 h-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 4 cards per slide (large screens) ── */}
        <div
          className='hidden lg:block mt-16'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className='relative overflow-hidden'>
            <div
              className='flex transition-transform duration-300 ease-in-out gap-x-6'
              style={{ transform: `translateX(-${desktopSlide * 100}%)` }}>
              {desktopSlides.map((slide, slideIdx) => (
                <div
                  key={slideIdx}
                  className='w-full shrink-0 flex gap-x-6 justify-center'>
                  {slide.map((person, personIdx) => (
                    <div key={personIdx} className='flex-1'>
                      <BenefitPeopleCard person={person} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop dots */}
          <div className='flex justify-center gap-2 mt-10'>
            {desktopSlides.map((_, index) => (
              <button
                key={index}
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
