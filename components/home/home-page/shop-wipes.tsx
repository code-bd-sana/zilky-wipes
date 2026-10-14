import PageTitle from '@/components/shared/page-title/page-title';
import ProductCard from '@/components/shared/product-card/product-card';
import type { BackendProduct } from '@/components/dashboard/products/product-list';
import { getMediaUrl } from '@/lib/utils';

type ShopeWipesProps = {
  data?: Record<string, unknown>;
  products?: BackendProduct[];
};

export default function ShopeWipes({ data, products = [] }: ShopeWipesProps) {
  const title = (data?.title as string) || 'Shop ZilkyWipes';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    'You use it every day. You’ve just never been given a reason to question it. Until now!',
  ];

  const recentProducts = products.slice(0, 4);

  return (
    <section className='w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12.5 2xl:px-16 mt-14 sm:mt-20 md:mt-28 lg:mt-32'>
      <PageTitle
        align='start'
        title={title}
        subtitle={subtitle}
        titleClassName='text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-(--text-primary)'
        subtitleClassName='mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-(--text-secondary) max-w-3xl leading-relaxed'
      />

      {recentProducts.length === 0 ? (
        <div className='mt-8 sm:mt-10 py-16 text-center text-gray-500'>
          <p className='text-base sm:text-lg'>No products available at the moment.</p>
        </div>
      ) : (
        <div className='mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-8'>
          {recentProducts.map((product, index) => {
            const minPrice = product.variants?.length
              ? Math.min(...product.variants.map((v) => v.price))
              : 0;

            const tags = product.tags ? product.tags.map((t) => t.name) : [];

            const maxDiscount = product.variants?.length
              ? Math.max(
                  ...product.variants.map((v) =>
                    v.subscriptionEligible ? v.subscriptionDiscount || 0 : 0
                  )
                )
              : 0;

            const subscribeLabel =
              maxDiscount > 0 ? `Subscribe & Save ${maxDiscount}%` : undefined;

            const firstVariantId = product.variants?.[0]?.id;
            const hasMultipleVariants = (product.variants?.length || 0) > 1;
            const stock = product.variants?.[0]?.stock || 0;
            const imageSrc = getMediaUrl(product.images?.[0]) || '/ZilkyWipes/p.png';

            return (
              <ProductCard
                key={product.id}
                productId={product.id}
                variantId={firstVariantId}
                image={imageSrc}
                imageAlt={product.name}
                name={product.name}
                price={minPrice}
                tags={tags}
                subscribeLabel={subscribeLabel}
                imageLoading={index < 3 ? 'eager' : 'lazy'}
                stock={stock}
                hasMultipleVariants={hasMultipleVariants}
                hasSubscriptionOption={maxDiscount > 0}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

