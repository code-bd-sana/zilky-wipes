export default function SubscriptionFooter() {
  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full '>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='/home/subscription/subscription-footer.png'
          className='w-full h-auto object-cover'>
          <source
            src='/video/4.mp4'
            type='video/mp4'
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
