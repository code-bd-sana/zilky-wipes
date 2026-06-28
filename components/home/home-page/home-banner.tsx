import PageTitle from '@/components/shared/page-title/page-title';
import { isVideo } from '@/lib/utils';
import Image from 'next/image';

export default function HomeBanner({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'A better way to feel clean.';
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/ZilkyWipes/hero.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
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
        <PageTitle
          align='start'
          title={title}
          className='w-full'
          titleClassName='text-white! text-[40px]! md:text-[70px]! lg:text-[120px]! font-bold! leading-[0.95]!'
        />
      </div>
    </section>
  );
}
