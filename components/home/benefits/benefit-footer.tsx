import Image from "next/image";
import { isVideo } from "@/lib/utils";

export default function BenefitsFooter({ data }: { data?: Record<string, unknown> }) {
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/2.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='relative w-full h-[30vh] sm:h-[45vh] md:h-[60vh] lg:h-[75vh] xl:h-svh min-h-55 sm:min-h-80 md:min-h-115 lg:min-h-145 xl:min-h-175 overflow-hidden bg-[#1D3A5F]'>
      <div className='w-full h-full'>
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='auto'
            className='w-full h-full object-cover object-center'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt='Footer Media'
            fill
            className='object-cover object-center'
            sizes="100vw"
          />
        )}
      </div>
    </section>
  );
}

