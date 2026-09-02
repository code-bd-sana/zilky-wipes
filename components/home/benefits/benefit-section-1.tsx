import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@/components/ui/button";
import { isVideo, getMediaUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BenefitSection1({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Why ZilkyWipes Are Superior to Everything Else';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    "Discover the revolutionary benefits that make ZilkyWipes the ultimate ",
    "choice for personal hygiene. Backed by science, loved by users.",
  ];

  const plans = (data?.detailList as { title: string; description: string }[])?.length ? (data?.detailList as { title: string; description: string }[]).map((d) => ({
    no: d.title,
    title: d.description
  })) : [
    {
      no: "Eco-friendly",
      title: "Flushable, Biodegradable, Designed to disappear, responsibly.",
    },
    { no: "Hygienic", title: "Water does what paper can’t.Every time!" },
    { no: "Luxury", title: "Soft. Calm. Considered.Every day!" },
  ];

  const mediaSrc = getMediaUrl((data?.imagePaths as string[])?.[0] || '/ZilkyWipes/1000308870.png');
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
            <div className='mt-8 sm:mt-10 md:mt-12'>
              {plans.map((plan: { no: string; title: string }, index: number) => (
                <div
                  key={plan.no + index}
                  className={`grid grid-cols-[85px_1fr] sm:grid-cols-[105px_1fr] md:grid-cols-[125px_1fr] items-center gap-x-3 py-3.5 sm:py-4 md:py-5 border-b border-(--checkout-divider) ${
                    index === 0 ? "border-t" : ""
                  }`}>
                  <div className='text-xs sm:text-sm md:text-base leading-none font-semibold text-(--text-primary) underline'>
                    {plan.no}
                  </div>
                  <p className='justify-self-end text-right text-xs sm:text-sm md:text-base leading-snug text-[#4c4c4c] font-medium'>
                    {plan.title}
                  </p>
                </div>
              ))}
            </div>
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
              className='w-full h-auto aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] object-cover shadow-lg'
            >
              <source src={mediaSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='relative w-full aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] overflow-hidden shadow-lg'>
              <Image
                src={mediaSrc}
                alt='Benefit preview'
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

