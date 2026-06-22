import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { isVideo } from "@/lib/utils";

export default function SubsSection1({ data }: { data?: any }) {
  const defaultPlans = [
    { no: "01", title: "Better value than one-time purchases" },
    { no: "02", title: "Flexible delivery, monthly or bi-monthly" },
    { no: "03", title: "Pause, skip, or cancel anytime" },
    { no: "04", title: "Change plans in seconds" },
  ];

  const plans = data?.points?.length 
    ? data.points.map((p: string, idx: number) => ({ no: String(idx + 1).padStart(2, '0'), title: p }))
    : defaultPlans;

  const title = data?.title || '.....Because comfort shouldn’t be a reminder!';
  const subtitle = data?.subtitle?.split('\n') || [
    "ZilkyWipes arrives before you need it.",
    "No last-minute runs. No guessing.",
    "Just the right amount, on your schedule.",
  ];

  const mediaSrc = data?.imagePaths?.[0] || '/ZilkyWipes/1000308869.png';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section>
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='md:mt-45'
        innerClassName='gap-x-20 xl:gap-x-40'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='max-w-180! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
              subtitle={subtitle}
              subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[24px]!'
            />
            <div className='mt-10 md:mt-14 lg:mt-16'>
              {plans.map((plan: any, index: number) => (
                <div
                  key={plan.no}
                  className={`grid grid-cols-[68px_1fr] md:grid-cols-[84px_1fr] items-center gap-x-4 py-5 md:py-6 border-b border-(--checkout-divider) ${
                    index === 0 ? "border-t" : ""
                  }`}>
                  <div className='text-sm md:text-base leading-none font-medium text-(--text-primary)'>
                    / {plan.no}
                  </div>
                  <p className='justify-self-end text-right text-base md:text-lg leading-tight text-[#4c4c4c]'>
                    {plan.title}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
        mediaClassName={renderVideo ? "relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]" : ""}
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
