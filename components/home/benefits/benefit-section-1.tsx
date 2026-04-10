import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Button } from "@/components/ui/button";

export default function BenefitSection1() {
  const plans = [
    {
      no: "Eco-friendly",
      title: "Flushable, Biodegradable, Designed to disappear, responsibly.",
    },
    { no: "Hygienic", title: "Water does what paper can’t.Every time!" },
    { no: "Luxury", title: "Soft. Calm. Considered.Every day!" },
  ];

  return (
    <section>
      {" "}
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='md:mt-45'
        innerClassName='gap-x-20 xl:gap-x-40'
        content={
          <>
            <PageTitle
              title='Dry paper was never the answer!'
              titleClassName='max-w-150! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
              subtitle={[
                "Paper spreads. Water refreshes.",
                "One is habit. The other is care.",
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
        mediaClassName='relative aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]'
        media={
          <>
            <Image
              src='/home/benefits/benefit-section-1.jpg'
              alt='Benefit preview'
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
