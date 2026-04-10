import Image from "next/image";

export default function AddressPayment() {
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div>
        <div className='mt-6 md:mt-12'>
          <p className='text-[#979191]'>Delivery Address</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>123 Oak Street</p>
            <p className='text-[#474747] text-sm'>Brooklyn, NY 11201</p>
          </div>
          <p className='text-[#979191] text-sm cursor-pointer underline'>
            Edit address
          </p>
        </div>
        <div className='mt-6 md:mt-12 '>
          <p className='text-[#979191]'>Payment Method</p>
          <div className='my-4 flex items-center gap-1'>
            <Image
              height={40}
              width={60}
              src='/profile/visa.svg'
              alt='Visa'
              quality={100}
              className='w-6 h-6 object-cover'
            />
            <p className='text-[#474747] text-sm'>Visa •••• 4242</p>
          </div>
          <p className='text-[#979191] text-sm cursor-pointer underline pb-8 border-b border-[#E5E5E5]'>
            Update via Stripe
          </p>
        </div>
      </div>
    </section>
  );
}
