import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";

export default function SubsSection1() {
  const plans = [
    { no: "01", title: "Better value than one-time purchases" },
    { no: "02", title: "Flexible delivery, monthly or bi-monthly" },
    { no: "03", title: "Pause, skip, or cancel anytime" },
    { no: "04", title: "Change plans in seconds" },
  ];

  return (
    <section className='mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20 md:mt-45'>
      <div className='flex flex-col-reverse lg:flex-row justify-between gap-x-20 xl:gap-x-40 gap-y-12 md:gap-y-16 lg:gap-y-20 items-center'>
        {/* Left Content */}
        <div className='w-full max-w-180 lg:max-w-170'>
          <PageTitle
            title='.....Because comfort shouldn’t be a reminder!'
            titleClassName='max-w-180! text-[40px]! leading-[1.1]! md:text-[56px]!'
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
        </div>
        {/* Right Video */}
        <div className='relative w-full max-w-170 lg:max-w-180 aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]'>
          <Image
            src='/home/subscription/subscription-1.jpg'
            alt='Subscription preview'
            fill
            priority
            quality={100}
            sizes='(min-width: 1536px) 720px, (min-width: 1024px) 45vw, 92vw'
            className='object-cover'
          />
        </div>
      </div>
    </section>
  );
}
