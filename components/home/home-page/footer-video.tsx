import { isVideo } from '@/lib/utils';
import Image from 'next/image';

export default function FooterVideo({ data }: { data?: Record<string, unknown> }) {
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/2.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='bg-(--text-primary) relative'>
      <div className='w-full h-full min-h-75'>
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
          />
        )}
      </div>
    </section>
  );
}
