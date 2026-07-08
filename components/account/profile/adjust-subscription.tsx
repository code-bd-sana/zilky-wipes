"use client";

import { useRouter } from "next/navigation";
import { useGetMySubscriptions, usePauseSubscription, useResumeSubscription } from "@/hooks/useSubscriptions";
import { Loader2, PauseCircle, PlayCircle, ShoppingBag } from "lucide-react";

export default function AdjustSubscription() {
  const router = useRouter();
  
  const { data: response, isLoading } = useGetMySubscriptions();
  const pauseMutation = usePauseSubscription();
  const resumeMutation = useResumeSubscription();

  const subscriptions = response?.data || [];

  const handlePause = (subId: string) => {
    pauseMutation.mutate(subId);
  };

  const handleResume = (subId: string) => {
    resumeMutation.mutate(subId);
  };

  if (isLoading) {
    return (
      <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 mt-4'>
        <div className='bg-[#FBFAF9] p-8 border border-[#E5E5E5] rounded-[8px] flex items-center justify-center'>
          <Loader2 className="w-6 h-6 animate-spin text-[#979191]" />
        </div>
      </section>
    );
  }

  if (subscriptions.length === 0) {
    return null; // Don't show the subscription block if they don't have any
  }

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 mt-4'>
      <div className='bg-[#FBFAF9] p-4 md:p-6 border border-[#E5E5E5] rounded-[8px]'>
        <h2 className='text-[#2B2D2E] text-xl font-medium mb-1'>Your Subscriptions</h2>
        <p className='text-[#979191] text-sm mb-6'>Manage your recurring deliveries</p>

        <div className='space-y-6'>
          {subscriptions.map((sub) => {
            const isPaused = sub.status === 'PAUSED';
            const isCanceled = sub.status === 'CANCELED';
            const isActive = sub.status === 'ACTIVE';

            return (
              <div key={sub.id} className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
                <div className="bg-[#fcfbf9] px-4 py-3 border-b border-[#E5E5E5] flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-[#2B2D2E]">{sub.productVariant?.product?.name}</h3>
                    <p className="text-xs text-[#979191] mt-0.5">{sub.productVariant?.name} • {sub.frequency}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    isActive ? 'bg-green-100 text-green-700' :
                    isPaused ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className='p-4 divide-y divide-[#F0F0F0]'>
                  {!isCanceled && (
                    <div className='flex flex-col md:flex-row gap-y-3 py-3 justify-between items-center'>
                      <div className='flex flex-col w-full'>
                        <h3 className='text-[15px] font-medium text-[#474747] flex items-center gap-2'>
                          {isPaused ? <PlayCircle className="w-4 h-4 text-green-600" /> : <PauseCircle className="w-4 h-4 text-yellow-600" />}
                          {isPaused ? "Resume deliveries" : "Pause indefinitely"}
                        </h3>
                        <p className='mt-1 text-xs text-[#979191] max-w-sm'>
                          {isPaused 
                            ? "Restart your billing cycle and get your next box."
                            : "Going away? Pause your subscription anytime. You won't be charged."}
                        </p>
                      </div>
                      <button
                        type='button'
                        disabled={pauseMutation.isPending || resumeMutation.isPending}
                        onClick={() => isPaused ? handleResume(sub.id) : handlePause(sub.id)}
                        className='shrink-0 rounded-[8px] border border-[#E5E5E5] w-full md:w-32 h-9 text-sm text-[#474747] flex items-center justify-center cursor-pointer hover:bg-[#1D3A5F] hover:text-white transition-colors duration-200 disabled:opacity-50'>
                        {pauseMutation.isPending || resumeMutation.isPending ? "Updating..." : (isPaused ? "Resume" : "Pause")}
                      </button>
                    </div>
                  )}

                  <div className='flex flex-col md:flex-row gap-y-3 py-3 justify-between items-center'>
                    <div className='flex flex-col w-full'>
                      <h3 className='text-[15px] font-medium text-[#474747] flex items-center gap-2'>
                        <ShoppingBag className="w-4 h-4 text-blue-600" />
                        Order extra now
                      </h3>
                      <p className='mt-1 text-xs text-[#979191] max-w-sm'>
                        Run out early? Add a one-time purchase to your cart.
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() => router.push("/shop")}
                      className='shrink-0 rounded-[8px] border border-[#E5E5E5] w-full md:w-32 h-9 text-sm text-[#474747] flex items-center justify-center cursor-pointer hover:bg-[#1D3A5F] hover:text-white transition-colors duration-200'>
                      Go to Shop
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
