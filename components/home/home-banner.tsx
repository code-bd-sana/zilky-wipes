export default function HomeBanner() {
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
          poster='home/banner.png'
          className='absolute inset-0 w-full h-full object-cover'>
          <source src='home/banner.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 bg-black/55 md:bg-black/35' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 h-full flex items-end justify-start text-start mx-5 md:mx-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[100px] font-bold w-full text-white'>
          A better way to feel clean.
        </p>
      </div>
    </section>
  );
}
