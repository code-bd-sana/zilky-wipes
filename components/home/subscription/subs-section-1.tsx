import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";

export default function SubsSection1() {
  const plans = [
    { no: "01", title: "Better value than one-time purchases" },
    { no: "02", title: "Flexible delivery, monthly or bi-monthly" },
    { no: "03", title: "Pause, skip, or cancel anytime" },
    { no: "04", title: "Change plans in seconds" },
  ];

  return (
    <section>
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='md:mt-45'
        innerClassName='gap-x-20 xl:gap-x-40'
        content={
          <>
            <PageTitle
              title='.....Because comfort shouldn’t be a reminder!'
              titleClassName='max-w-180! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
              subtitle={[
                "ZilkyWipes arrives before you need it.",
                "No last-minute runs. No guessing.",
                "Just the right amount, on your schedule.",
              ]}
              subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[24px]!'
            />
            <div className='mt-10 md:mt-14 lg:mt-16'>
              {plans.map((plan, index) => (
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
        mediaClassName='relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]'
        media={
          <>
            <Image
              src='/home/subscription/subscription-1.jpg'
              alt='Subscription preview'
              fill
              priority
              quality={100}
              sizes='(min-width: 1536px) 720px, (min-width: 1024px) 45vw, 92vw'
              className='object-cover'
            />
          </>
        }
      />
    </section>
  );
}
