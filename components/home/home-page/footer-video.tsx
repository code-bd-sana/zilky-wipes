import { isVideo } from '@/lib/utils';
import Image from 'next/image';

export default function FooterVideo({ data }: { data?: Record<string, unknown> }) {
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/2.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='bg-(--text-primary) relative overflow-hidden'>
      <div className='w-full min-h-50 sm:min-h-75 md:min-h-100 flex items-center justify-center'>
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='auto'
            className='w-full h-auto min-h-50 sm:min-h-75in-h-[400px] object-cover object-center'
          >
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt='Footer Media'
            width={1920}
            height={1080}
            className='w-full h-auto min-h-50 sm:min-h-75 md:min-h-100 object-cover object-center'
            sizes='100vw'
          />
        )}
      </div>
    </section>
  );
}

