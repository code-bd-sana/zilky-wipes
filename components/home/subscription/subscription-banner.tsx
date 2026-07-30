import { isVideo } from '@/lib/utils';
import Image from 'next/image';

export default function SubscriptionBanner({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Never run out again.';
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/2.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden bg-black/10'>
        {/* Background Media */}
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='absolute inset-0 w-full h-full object-cover'
          >
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image src={mediaSrc} alt='Hero Background' fill className='object-cover' priority />
        )}

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 ' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 h-full flex items-end justify-start text-start mx-5 md:mx-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[120px] font-bold w-full text-white'>
          {title}
        </p>
      </div>
    </section>
  );
}
