import PageTitle from '@/components/shared/page-title/page-title';
import ProductCard from '@/components/shared/product-card/product-card';
import { wipesData } from './wipes-data';

export default function ShopeWipes({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Shop ZilkyWipes';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    'You use it every day. You’ve just never been given a reason to question it. Until now!',
  ];

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5 mt-14 sm:mt-20 md:mt-28 lg:mt-32'>
      <PageTitle
        align='start'
        title={title}
        subtitle={subtitle}
        titleClassName='text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-(--text-primary)'
        subtitleClassName='mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-(--text-secondary) max-w-3xl leading-relaxed'
      />

      <div className='mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
        {wipesData.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            stock={99}
            hasSubscriptionOption={!!product.subscribeLabel}
            {...product}
          />
        ))}
      </div>
    </section>
  );
}

