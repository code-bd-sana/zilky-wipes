export default function FooterVideo() {
  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full '>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-auto object-cover'>
          <source src='/video/2.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
