"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RecentOrder() {
  const orderData = [
    {
      title: "January 15, 2026 · Delivered",
    },
    {
      title: "December 15, 2025 · Delivered",
    },
    {
      title: "November 15, 2025 · Delivered",
    },
    {
      title: "October 15, 2025 · Delivered",
    },
    {
      title: "September 15, 2025 · Delivered",
    },
    {
      title: "August 15, 2025 · Delivered",
    },
    {
      title: "July 15, 2025 · Delivered",
    },
    {
      title: "June 15, 2025 · Delivered",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? orderData : orderData.slice(0, 3);

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-120 my-6 md:my-12'>
      <div>
        <div className='mt-6 md:mt-12'>
          <p className='text-[#979191]'>Recent Orders</p>
          <div className='my-4'>
            {displayed.map((item, index) => (
              <div
                key={index}
                className='mb-4 flex justify-between items-center border-b border-[#E5E5E5] pb-2'>
                <p className='text-[#474747] text-sm '>{item.title}</p>
                <Button className='bg-transparent text-(--text-primary) underline hover:text-(--text-primary) transition-colors duration-200 cursor-pointer font-medium'>
                  Track
                </Button>
              </div>
            ))}
          </div>
          <div className='mt-2'>
            <button
              type='button'
              onClick={() => setShowAll((s) => !s)}
              className='text-[#979191] text-sm underline cursor-pointer hover:text-(--text-primary) transition-colors duration-200'>
              {showAll ? "Show less" : "View all orders"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
