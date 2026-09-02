import PageTitle from '@/components/shared/page-title/page-title';
import SplitContentSection from '@/components/shared/split-content-section';
import { isVideo, getMediaUrl } from '@/lib/utils';
import Image from 'next/image';

export default function SubsSection1({ data }: { data?: Record<string, unknown> }) {
  const defaultPlans = [
    { no: '01', title: 'Better value than one-time purchases' },
    { no: '02', title: 'Flexible delivery, monthly or bi-monthly' },
    { no: '03', title: 'Pause, skip, or cancel anytime' },
    { no: '04', title: 'Change plans in seconds' },
  ];

  const plans = (data?.points as string[])?.length
    ? (data?.points as string[]).map((p: string, idx: number) => ({
        no: String(idx + 1).padStart(2, '0'),
        title: p,
      }))
    : defaultPlans;

  const title = (data?.title as string) || '.....Because comfort shouldn’t be a reminder!';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    'ZilkyWipes arrives before you need it.',
    'No last-minute runs. No guessing.',
    'Just the right amount, on your schedule.',
  ];

  const mediaSrc = getMediaUrl((data?.imagePaths as string[])?.[0] || '/ZilkyWipes/1000308869.png');
  const renderVideo = isVideo(mediaSrc);


  return (
    <section>
      <SplitContentSection
        desktopDirection='content-media'
        sectionClassName='mt-14 sm:mt-20 md:mt-28 lg:mt-36'
        innerClassName='gap-x-8 lg:gap-x-14 xl:gap-x-20'
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
                  key={plan.no}
                  className={`grid grid-cols-[44px_1fr] sm:grid-cols-[60px_1fr] md:grid-cols-[72px_1fr] items-center gap-x-3 sm:gap-x-4 py-3.5 sm:py-4 md:py-5 border-b border-(--checkout-divider) ${
                    index === 0 ? 'border-t' : ''
                  }`}
                >
                  <div className='text-xs sm:text-sm md:text-base leading-none font-semibold text-(--text-primary)'>
                    / {plan.no}
                  </div>
                  <p className='justify-self-end text-right text-xs sm:text-sm md:text-base leading-snug text-[#4c4c4c] font-medium'>
                    {plan.title}
                  </p>
                </div>
              ))}
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
                alt='Subscription preview'
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

