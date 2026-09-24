"use client";

import BenefitPeople from "@/components/home/home-page/testimonial";

export default function AboutPeople({
  data,
  reviews,
}: {
  data?: Record<string, unknown>;
  reviews?: any[];
}) {
  return <BenefitPeople data={data} reviews={reviews} align="center" />;
}
