import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@/components/ui/button";
import { isVideo } from "@/lib/utils";

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

  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/ZilkyWipes/1000308870.png';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='max-w-480 mx-auto'>
      {" "}
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='md:mt-45'
        innerClassName='gap-x-20 xl:gap-x-40'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='max-w-600! mx-auto text-[40px]! leading-[1.1]! md:text-[54px]!'
              subtitle={subtitle}
              subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[22px]!'
            />
            <div className='mt-10 md:mt-14 lg:mt-16'>
              {plans.map((plan: { no: string; title: string }, index: number) => (
                <div
                  key={plan.no + index}
                  className={`grid grid-cols-[68px_1fr] md:grid-cols-[84px_1fr] items-center gap-x-4 py-5 md:py-6 border-b border-(--checkout-divider) ${
                    index === 0 ? "border-t" : ""
                  }`}>
                  <div className='text-xs md:text-base leading-none font-medium text-(--text-primary) underline'>
                    {plan.no}
                  </div>
                  <p className='justify-self-end text-right text-base md:text-lg leading-tight text-[#4c4c4c]'>
                    {plan.title}
                  </p>
                </div>
              ))}
            </div>
            <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-16'>
              <Button className='w-full sm:w-auto bg-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                Shop ZilkyWipes
              </Button>
              <Button className='w-full sm:w-auto bg-white border-2 border-(--text-primary) text-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full shadow-sm hover:bg-(--text-primary) hover:text-white hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
                Subscribe & Save
              </Button>
            </div>
          </>
        }
        mediaClassName={renderVideo ? "relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]" : "relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]"}
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
            <Image
              src={mediaSrc}
              alt='Benefit preview'
              fill
              priority
              quality={100}
              sizes='(min-width: 1536px) 720px, (min-width: 1024px) 45vw, 92vw'
              className='object-cover'
            />
          )
        }
      />
    </section>
  );
}
