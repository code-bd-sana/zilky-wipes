import { isVideo } from '@/lib/utils';
import Image from 'next/image';

export default function SubscriptionFooter({ data }: { data?: Record<string, unknown> }) {
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/4.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='bg-(--text-primary)'>
      <div className='w-full relative min-h-[30vh]'>
        {renderVideo ? (
          <video autoPlay loop muted playsInline className='w-full h-auto object-cover'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt='Footer Media'
            width={1920}
            height={1080}
            className='w-full h-auto object-cover'
            sizes='100vw'
          />
        )}
      </div>
    </section>
  );
}
