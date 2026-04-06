export default function ShopVideoSection() {
  return (
    <section className='h-[30vh] md:h-screen w-full overflow-hidden'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='h-[30vh] md:h-full w-full object-cover object-center'>
        <source src='/home/shop/shop1.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
