import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { isVideo, getMediaUrl } from "@/lib/utils";

export default function AboutSection1({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'BRAND STORY';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    "ZilkyWipes exists because hygiene deserves better.",
    "Not louder. Not more complicated.",
    "Just cleaner, calmer, and more considered.",
    "We didn't reinvent care.",
    "We simply made it make sense.",
  ];
  const mediaSrc = getMediaUrl((data?.imagePaths as string[])?.[0] || '/video/3.mp4');
  const renderVideo = isVideo(mediaSrc);


  return (
    <section>
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='mt-14 sm:mt-20 md:mt-28 lg:mt-36'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='text-[28px]! sm:text-[36px]! md:text-[46px]! lg:text-[54px]! leading-[1.15]! sm:leading-[1.1]! font-bold!'
              subtitle={subtitle}
              subtitleClassName='mt-4 sm:mt-6 text-[15px]! sm:text-[18px]! md:text-[22px]! leading-relaxed'
            />
            <div className='flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8'>
              <Link href='/shop' className='w-full sm:w-auto'>
                <Button className='w-full sm:w-auto bg-(--text-primary) px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg md:text-xl rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                  Shop ZilkyWipes
                </Button>
              </Link>
              <Link href='/subscription' className='w-full sm:w-auto'>
                <Button className='w-full sm:w-auto bg-white border-2 border-(--text-primary) text-(--text-primary) px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg md:text-xl rounded-full shadow-sm hover:bg-(--text-primary) hover:text-white hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                  Subscribe & Save
                </Button>
              </Link>
            </div>
          </>
        }
        media={
          renderVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              poster='/home/banner.png'
              className='w-full h-auto aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] object-cover shadow-lg'>
              <source src={mediaSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='relative w-full aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] overflow-hidden shadow-lg'>
              <Image
                src={mediaSrc}
                alt={title}
                fill
                priority
                quality={100}
                sizes='(min-width: 1024px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
          )
        }
      />
    </section>
  );
}

