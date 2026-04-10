export default function DeliveryDetails() {
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div className='mt-6 md:mt-12'>
        <div className='mt-8'>
          <p className='text-[#979191]'>Delivery Address</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>123 Oak Street</p>
            <p className='text-[#474747] text-sm'>Brooklyn, NY 11201</p>
          </div>
          <p className='text-[#979191] text-sm cursor-pointer underline'>
            Edit address
          </p>
        </div>
        <div className='mt-8'>
          <p className='text-[#979191]'>Order Date</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>February 01, 2026</p>
            <p className='text-[#474747] text-sm'>08:14 AM EST</p>
          </div>
          <p className='text-[#979191] text-sm cursor-pointer underline'>
            Edit address
          </p>
        </div>
        <div className='mt-8'>
          <p className='text-[#979191]'>Order Contents</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>1x ZilkyWipes Roll</p>
            <p className='text-[#474747] text-sm'>Subscription delivery</p>
          </div>
          <p className='text-[#979191] text-sm cursor-pointer underline'>
            Edit address
          </p>
        </div>
      </div>
    </section>
  );
}
