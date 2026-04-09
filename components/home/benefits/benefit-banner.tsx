export default function BenefitBanner() {
  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='/home/benefits/benefits-banner.png'
          className='absolute inset-0 w-full h-full object-cover'>
          <source src='/home/benefits/benefits-banner.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 ' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 h-full flex items-end justify-start text-start mx-5 md:mx-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[120px] font-bold w-full text-white'>
          A cleaner way to care.
        </p>
      </div>
    </section>
  );
}
