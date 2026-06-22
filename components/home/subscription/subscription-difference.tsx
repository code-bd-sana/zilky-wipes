import PageTitle from "@/components/shared/page-title/page-title";

type BenefitItem = {
  no: string;
  title: string;
};

type BenefitColumn = {
  heading: string;
  items: BenefitItem[];
};

export default function SubscriptionDifference({ data }: { data?: any }) {
  const title = data?.title || "See the difference by yourself";
  
  const col1Points = data?.col1Points?.length ? data.col1Points : [
    "Buy when you remember.",
    "Full price.",
    "Manual reordering.",
  ];
  
  const col2Points = data?.col2Points?.length ? data.col2Points : [
    "Always stocked.",
    "Preferred pricing.",
    "Total control.",
  ];

  const benefitColumns: BenefitColumn[] = [
    {
      heading: "One-Time Purchase",
      items: col1Points.map((p: string, idx: number) => ({ no: String(idx + 1).padStart(2, '0'), title: p })),
    },
    {
      heading: "Subscription",
      items: col2Points.map((p: string, idx: number) => ({ no: String(idx + 1).padStart(2, '0'), title: p })),
    },
  ];

  return (
    <section className='bg-[#FBFAF9]'>
      <div className='mx-5 md:mx-12 mt-20 md:mt-50 py-25'>
        <PageTitle
          title={title}
          align='start'
          titleClassName='w-full! text-center!'
        />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10'>
          {benefitColumns.map((column) => (
            <div key={column.heading} className='mt-10 md:mt-14 lg:mt-16'>
              <h3 className='mb-5 text-(--text-primary) text-2xl text-center lg:text-left'>
                {column.heading}
              </h3>
              {column.items.map((plan, index) => (
                <div
                  key={plan.no}
                  className={`grid grid-cols-[68px_1fr] md:grid-cols-[84px_1fr] items-center gap-x-4 py-5 md:py-6 border-b border-(--checkout-divider) ${
                    index === 0 ? "border-t" : ""
                  }`}>
                  <div className='text-sm leading-none font-medium text-(--text-primary)'>
                    / {plan.no}
                  </div>
                  <p className='justify-self-end text-right text-sm leading-tight text-[#4c4c4c]'>
                    {plan.title}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
