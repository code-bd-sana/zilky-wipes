"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CancelSubscriptionModal from "./cancel-subscription-modal";

export default function AccountFooter() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-120 mt-6 md:mt-16 mb-7 border-t border-[#E5E5E5] pt-6'>
        <div className='flex justify-between items-center'>
          <Link
            href='/help'
            className='text-[#979191] text-xs hover:text-(--text-primary) transition-colors duration-200 cursor-pointer'>
            Help
          </Link>
          <Link
            href='/contact'
            className='text-[#979191] text-xs hover:text-(--text-primary) transition-colors duration-200 cursor-pointer'>
            Contact Support
          </Link>
          <Button
            onClick={() => setShowModal(true)}
            className='bg-transparent text-(--text-primary) text-xs underline cursor-pointer'>
            Cancel Subscription
          </Button>
        </div>
      </section>

      <CancelSubscriptionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          // TODO: wire-up cancellation action
          console.log("User confirmed cancellation");
          setShowModal(false);
        }}
      />
    </>
  );
}
