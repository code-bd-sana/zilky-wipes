"use client";
import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelSubscriptionModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <section
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <div className='relative z-10 w-[90%] max-w-140 shadow-lg p-6 bg-(--text-primary)'>
        {/* <h3 className='text-6xl font-semibold text-white font-heading'>
          We’d hate to see you go
        </h3> */}
        <PageTitle
          align='start'
          title='We’d hate to see you go'
          titleClassName='text-white! font-medium! max-w-[450px] '
        />
        <div className='my-8'>
          <p className='text-2xl text-white mt-2'>
            Before you cancel, would any of these options help?
          </p>
          <div className='flex gap-x-2 items-center mt-8'>
            <p className='text-[22px] text-white underline'>
              Deliver less often
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <div className='flex gap-x-2 items-center mt-2 '>
            <p className='text-[22px] text-white underline'>
              Skip just one delivery
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <div className='flex gap-x-2 items-center mt-2'>
            <p className='text-[22px] text-white underline'>
              Pause for a while
            </p>
            <ArrowRight size={24} color='#FFFFFF' />
          </div>
          <p className='text-[22px] text-white mt-8'>
            If none of these work for you right now, we understand.
          </p>
        </div>
        <div className='mt-14 flex flex-col justify-end gap-3'>
          <Button
            onClick={() => {
              onConfirm();
            }}
            className='bg-white py-6 text-base md:text-xl rounded-full text-(--text-primary) shadow-sm hover:bg-[#ecebf0] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300 cursor-pointer'>
            Continue with cancellation
          </Button>
          <Button
            onClick={onClose}
            className='bg-transparent  text-white text-base md:text-xl underline cursor-pointer hover:text-white/90 transition-colors duration-200'>
            Keep my subscription
          </Button>
        </div>
      </div>
    </section>
  );
}
