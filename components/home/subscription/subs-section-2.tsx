import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@/components/ui/button";
import { isVideo } from "@/lib/utils";

export default function SubsSection2({ data }: { data?: any }) {
  const title = data?.title || 'Choose your rhythm.';
  const subtitle = data?.subtitle?.split('\n') || [
    " Monthly delivery / Bi-monthly delivery",
    "You can change this anytime.",
  ];

  const mediaSrc = data?.imagePaths?.[0] || '/ZilkyWipes/1000308869.png';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section>
      <SplitContentSection
        desktopDirection='media-content'
        sectionClassName='md:mt-45'
        contentClassName='max-w-180 lg:max-w-160'
        mediaClassName={renderVideo ? "relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]" : ""}
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='max-w-180! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
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
              className='w-full h-full object-cover rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] aspect-37/45'
            >
              <source src={mediaSrc} type='video/mp4' />
            </video>
          ) : (
            <div className='relative w-full aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]'>
              <Image
                src={mediaSrc}
                alt='Subscription preview'
                fill
                priority
                quality={100}
                sizes='(min-width: 1536px) 720px, (min-width: 1024px) 45vw, 92vw'
                className='object-cover'
              />
            </div>
          )
        }
      />
    </section>
  );
}
