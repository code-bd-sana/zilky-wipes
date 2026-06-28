import PageTitle from '@/components/shared/page-title/page-title';
import ProductCard from '@/components/shared/product-card/product-card';
import { wipesData } from './wipes-data';

export default function ShopeWipes({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Shop ZilkyWipes';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    'You use it every day. You’ve just never been given a reason to question it. Until now!',
  ];

  return (
    <section className='mx-5 mt-30 md:mx-12.5'>
      <PageTitle align='start' title={title} subtitle={subtitle} />

      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {wipesData.map((product) => (
          <ProductCard key={product.id} productId={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
