import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@base-ui/react";
import Image from "next/image";
import { isVideo } from "@/lib/utils";

export default function AboutSection1({ data }: { data?: any }) {
  const title = data?.title || 'BRAND STORY';
  const subtitle = data?.subtitle?.split('\n') || [
    "ZilkyWipes exists because hygiene deserves better.",
    "Not louder. Not more complicated.",
    "Just cleaner, calmer, and more considered.",
    "We didn't reinvent care.",
    "We simply made it make sense.",
  ];
  const mediaSrc = data?.imagePaths?.[0] || '/video/3.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section>
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='md:mt-40'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='max-w-250! text-[40px]! leading-[1.1]! md:text-[56px]!'
              subtitle={subtitle}
              subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[24px]!'
            />
            <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8'>
              <Button className='w-full sm:w-auto bg-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                Shop ZilkyWipes
              </Button>
              <Button className='w-full sm:w-auto bg-white border-2 border-(--text-primary) text-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full shadow-sm hover:bg-(--text-primary) hover:text-white hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                Subscribe & Save
              </Button>
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
              poster='/home/banner.png'
              className='w-full h-auto aspect-37/45 rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] object-cover'>
              <source src={mediaSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={mediaSrc}
              alt={title}
              fill
              className='w-full h-full aspect-37/45 rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] object-cover relative'
            />
          )
        }
        mediaClassName={renderVideo ? "relative" : "relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]"}
      />
    </section>
  );
}
