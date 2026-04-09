export default function BenefitsFooter() {
  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full '>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='/home/benefits/benefit-footer.png'
          className='w-full h-auto lg:h-260 object-cover'>
          <source src='/home/benefits/benefit-footer.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
