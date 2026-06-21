export default function FooterVideo({ data }: { data?: any }) {
  const videoSrc = data?.imagePaths?.[0] || '/video/2.mp4';

  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full '>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-auto object-cover'>
          <source src={videoSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
