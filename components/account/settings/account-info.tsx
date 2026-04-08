"use client";

import { useState } from "react";

export default function AccountInfo() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const handleUpdate = (field: string, value: string) => {
    // replace with real save logic
    console.log("Update", field, value);
  };

  return (
    <section className='max-w-3xl mx-auto bg-white py-12 px-6 md:px-10 mt-22 pb-40'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-base text-[#979191]'>Account Information</h1>
      </div>

      {/* Email Address */}
      <div className='mb-6 '>
        <div className='flex items-center mb-3'>
          <p className='text-sm font-base text-[#474747]'>Email Address</p>
        </div>

        <div className='relative'>
          <input
            type='email'
            value={email}
            placeholder='user@example.com'
            onChange={(e) => setEmail(e.target.value)}
            className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333]'
          />

          <button
            onClick={() => handleUpdate("email", email)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>
        </div>

        <p className='text-xs text-[#979191] mt-3'>
          Primary contact for your account
        </p>
      </div>

      {/* Phone Number */}
      <div className='mb-11 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-sm font-base text-[#474747]'>Phone Number</p>
        </div>

        <div className='relative'>
          <input
            type='tel'
            value={phone}
            placeholder='+1 111 1111 111'
            onChange={(e) => setPhone(e.target.value)}
            className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333]'
          />

          <button
            onClick={() => handleUpdate("phone", phone)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>
        </div>

        <p className='text-xs text-[#979191] mt-3'>
          Optional delivery notifications
        </p>
      </div>

      {/* Shipping */}
      <div className='mb-11 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-base font-base text-[#979191]'>Shipping</p>
        </div>

        <p className='text-sm font-base text-[#474747] mb-3'>Default Address</p>

        <div className='relative'>
          <textarea
            value={address}
            placeholder='123 Oak Street, Brooklyn, NY 11201'
            onChange={(e) => setAddress(e.target.value)}
            className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333] resize-none'
            rows={1}
          />

          <button
            onClick={() => handleUpdate("address", address)}
            className='absolute right-2 top-2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>
        </div>

        <p className='text-xs text-[#979191] mt-3'>Used for all deliveries</p>
      </div>

      {/* Payment */}
      <div className='mb-10 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-base font-base text-[#979191]'>Payment</p>
        </div>

        <div className='relative'>
          <p className='text-sm font-base text-[#474747] mb-1'>
            Payment Method
          </p>
          <input
            type='text'
            value={payment}
            placeholder='Visa •••• 4242'
            onChange={(e) => setPayment(e.target.value)}
            className='mt-1 w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333]'
          />

          <button
            onClick={() => handleUpdate("payment", payment)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>

          <p className='text-xs text-[#979191] mt-3'>Managed by Stripe</p>
        </div>
      </div>

      {/* Billing History */}
      <div className='mb-12'>
        <p className='text-sm font-base text-[#474747] mb-4'>Billing History</p>
        <div className=''>
          <button className='w-full px-8 py-3 text-sm font-base text-[#333333] border border-[#F2F2F2] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Download Invoices
          </button>
          <p className='text-xs text-[#979191] mt-3'>View past invoices</p>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className='border border-[#E5E5E5] rounded-xl p-8'>
        <div className='mb-6'>
          <p className='text-(--text-primary) font-medium text-base mb-2'>
            Cancel Subscription
          </p>
          <p className='text-base text-[#979191] leading-relaxed'>
            This will stop all future deliveries immediately. Your order history
            will remain accessible, and you can reactivate your subscription at
            any time.
          </p>
        </div>

        <button className='bg-[#DC2626] hover:bg-red-800 transition text-white font-base px-8 py-3.5 rounded-full text-sm w-full md:w-auto cursor-pointer'>
          Cancel My Subscription
        </button>
      </div>
    </section>
  );
}
