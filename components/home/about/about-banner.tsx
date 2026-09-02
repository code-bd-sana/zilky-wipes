import PageTitle from "@/components/shared/page-title/page-title";
import { isVideo, getMediaUrl } from "@/lib/utils";
import Image from "next/image";

export default function AboutBanner({ data }: { data?: Record<string, unknown> }) {
  const titleText = (data?.title as string) || "Made for real bathrooms.\nAnd real bodies.";
  const mediaSrc = getMediaUrl((data?.imagePaths as string[])?.[0] || '/video/4.mp4');
  const renderVideo = isVideo(mediaSrc);


  return (
    <section className='relative w-full h-[30vh] sm:h-[45vh] md:h-[60vh] lg:h-[75vh] xl:h-svh min-h-55 sm:min-h-80 md:min-h-115 lg:min-h-145 xl:min-h-175 overflow-hidden bg-[#1D3A5F]'>
      {/* Hero background media */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='auto'
            poster='/home/banner.png'
            className='absolute inset-0 w-full h-full object-cover object-center'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt="About Banner"
            fill
            className='object-cover object-center'
            priority
            sizes='100vw'
          />
        )}

        {/* Dynamic gradient overlay for crystal clear text readability on all mobile & desktop screens */}
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/15 pointer-events-none' />
      </div>

      {/* Content overlay */}
      <div className='relative z-10 h-full w-full max-w-7xl mx-auto flex items-end justify-start text-start px-4 sm:px-6 md:px-10 lg:px-12 pb-3.5 sm:pb-7 md:pb-10 lg:pb-12 xl:pb-16 pt-16 sm:pt-20'>
        <PageTitle
          align='start'
          title={titleText}
          className='w-full'
          titleClassName='text-white! text-[20px]! sm:text-[32px]! md:text-[50px]! lg:text-[72px]! xl:text-[100px]! 2xl:text-[120px]! font-bold! leading-[1.1]! sm:leading-[1.05]! md:leading-[1]! xl:leading-[0.95]! tracking-tight max-w-full drop-shadow-md whitespace-pre-line'
        />
      </div>
    </section>
  );
}

