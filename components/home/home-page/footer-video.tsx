import React from "react";

export default function FooterVideo() {
  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full '>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='home/footer.png'
          className='w-full h-auto object-cover'>
          <source src='/home/footer.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
