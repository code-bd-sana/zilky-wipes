export default function AboutBanner() {
  return (
    <section className='w-full h-screen relative overflow-hidden'>
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='/home/banner.png'
          className='absolute inset-0 w-full h-full object-cover'>
          <source src='/home/banner.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        <div className='absolute inset-0 ' />
      </div>

      <div className='relative z-10 h-full flex items-end justify-start text-start mx-5 md:mx-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[120px] font-bold w-full text-white'>
          Made for real bathrooms.
          <br />
          And real bodies.
        </p>
      </div>
    </section>
  );
}
