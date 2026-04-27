import React from "react";
import AnalyticsCard from "./analytics-card";
import Image from "next/image";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <section>
      <div className='px-2 md:px-8 border'>
        {/* Top Header */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-4 p-6'>
          {/* Title */}
          <div className='flex justify-center items-center gap-3'>
            <Image
              src='/dashboard/facebook.png'
              alt='Facebook'
              priority
              width={20}
              height={20}
            />
            <Image
              src='/dashboard/instagram.png'
              alt='Instagram'
              priority
              width={20}
              height={20}
            />
            <p className='text-2xl'>Facebook & Instagram Analytics</p>
          </div>
          {/* Filters */}
          <div className='grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-3'>
            <select
              className='btn border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 rounded-[6px] cursor-pointer hover:bg-white text-[13px] md:text-base'
              defaultValue='Facebook & Instagram'>
              <option>Facebook & Instagram</option>
              <option>TikTok</option>
              <option>Google Ads</option>
              <option>Amazon</option>
            </select>
            <button className='btn border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 rounded-[6px] cursor-pointer hover:bg-white text-[13px] md:text-base'>
              Dec 1 - Dec 31, 2025
            </button>
            <button className='btn border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 rounded-[6px] cursor-pointer hover:bg-white text-[13px] md:text-base'>
              Year
            </button>
            <button className='btn border border-[#E5E7EB] bg-[#FAFAF9] px-2 py-1 rounded-[6px] cursor-pointer hover:bg-white text-[13px] md:text-base'>
              Export
              <Download className='inline-block ml-1' size={16} />
            </button>
          </div>
        </div>
      </div>
      <AnalyticsCard />
    </section>
  );
}
