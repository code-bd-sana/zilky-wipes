"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetMyOrders } from "@/hooks/useOrders";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export default function RecentOrder() {
  const { data: response, isLoading } = useGetMyOrders();
  const orders = response?.data || [];
  
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? orders : orders.slice(0, 3);

  if (isLoading) {
    return (
      <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
        <div className='flex items-center gap-2 text-gray-500 justify-center py-10'>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading orders...</span>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
        <div className='mt-6 md:mt-12'>
          <p className='text-[#979191]'>Recent Orders</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>No recent orders found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div>
        <div className='mt-6 md:mt-12'>
          <p className='text-[#979191]'>Recent Orders</p>
          <div className='my-4'>
            {displayed.map((item) => (
              <div
                key={item.id}
                className='mb-4 flex justify-between items-center border-b border-[#E5E5E5] pb-2'>
                <p className='text-[#474747] text-sm capitalize'>
                  {format(new Date(item.createdAt), "MMMM d, yyyy")} · {item.status.toLowerCase()}
                </p>
                <Link href={`/account/track-order?id=${item.id}`}>
                  <Button className='bg-transparent text-(--text-primary) underline hover:text-(--text-primary) transition-colors duration-200 cursor-pointer font-medium'>
                    Track
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          {orders.length > 3 && (
            <div className='mt-2'>
              <button
                type='button'
                onClick={() => setShowAll((s) => !s)}
                className='text-[#979191] text-sm underline cursor-pointer hover:text-(--text-primary) transition-colors duration-200'>
                {showAll ? "Show less" : "View all orders"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
