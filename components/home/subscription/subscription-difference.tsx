import PageTitle from '@/components/shared/page-title/page-title';

type BenefitItem = {
  no: string;
  title: string;
};

type BenefitColumn = {
  heading: string;
  items: BenefitItem[];
};

export default function SubscriptionDifference({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'See the difference by yourself';

  const col1Points = (data?.col1Points as string[])?.length
    ? (data?.col1Points as string[])
    : ['Buy when you remember.', 'Full price.', 'Manual reordering.'];

  const col2Points = (data?.col2Points as string[])?.length
    ? (data?.col2Points as string[])
    : ['Always stocked.', 'Preferred pricing.', 'Total control.'];

  const benefitColumns: BenefitColumn[] = [
    {
      heading: 'One-Time Purchase',
      items: col1Points.map((p: string, idx: number) => ({
        no: String(idx + 1).padStart(2, '0'),
        title: p,
      })),
    },
    {
      heading: 'Subscription',
      items: col2Points.map((p: string, idx: number) => ({
        no: String(idx + 1).padStart(2, '0'),
        title: p,
      })),
    },
  ];

  return (
    <section className='w-full bg-[#FBFAF9] mt-14 sm:mt-20 md:mt-28 lg:mt-36'>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12.5 2xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 2xl:py-28'>
        <PageTitle
          title={title}
          align='center'
          titleClassName='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) text-center max-w-4xl mx-auto'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 mt-8 sm:mt-12 md:mt-16'>
          {benefitColumns.map((column) => (
            <div key={column.heading} className='rounded-2xl sm:rounded-3xl bg-white border border-gray-100 p-5 sm:p-7 md:p-8 lg:p-10 xl:p-12 shadow-xs flex flex-col justify-start'>
              <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-(--text-primary) mb-2 sm:mb-3 pb-3 border-b border-(--text-primary)/15'>
                {column.heading}
              </h3>
              <div className='flex flex-col'>
                {column.items.map((plan, index) => (
                  <div
                    key={plan.no}
                    className={`grid grid-cols-[44px_1fr] sm:grid-cols-[56px_1fr] items-center gap-x-3 py-3.5 sm:py-4.5 border-b border-gray-100 ${
                      index === column.items.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className='text-xs sm:text-sm font-bold text-(--text-primary)'>
                      / {plan.no}
                    </div>
                    <p className='justify-self-end text-right text-xs sm:text-sm md:text-base leading-snug text-[#4c4c4c] font-medium'>
                      {plan.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

