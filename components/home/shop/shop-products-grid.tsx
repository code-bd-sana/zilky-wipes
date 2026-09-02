import ProductCard from "@/components/shared/product-card/product-card";
import type { BackendProduct } from "@/components/dashboard/products/product-list";

type ShopProductsGridProps = {
  products: BackendProduct[];
};

export default function ShopProductsGrid({ products }: ShopProductsGridProps) {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5'>
      {products.length === 0 ? (
        <div className='py-16 sm:py-24 text-center'>
          <p className='text-lg sm:text-xl font-medium text-(--text-secondary)'>
            No products found matching your filter selection.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {products.map((product, index) => {
            // Find min price across variants
            const minPrice = product.variants?.length 
              ? Math.min(...product.variants.map((v: { price: number }) => v.price))
              : 0;
              
            // Get first tag name if available
            const tags = product.tags ? product.tags.map(t => t.name) : [];
            
            // Calculate subscribe label dynamically
            const maxDiscount = product.variants?.length
              ? Math.max(
                  ...product.variants.map((v: { subscriptionEligible?: boolean; subscriptionDiscount?: number }) =>
                    v.subscriptionEligible ? v.subscriptionDiscount || 0 : 0
                  )
                )
              : 0;
              
            const subscribeLabel = maxDiscount > 0 ? `Subscribe & Save ${maxDiscount}%` : undefined;
            
            const firstVariantId = product.variants?.[0]?.id;
            const hasMultipleVariants = (product.variants?.length || 0) > 1;
            const stock = product.variants?.[0]?.stock || 0;
            
            return (
              <ProductCard
                key={product.id}
                productId={product.id}
                variantId={firstVariantId}
                image={product.images?.[0] || ""}
                imageAlt={product.name}
                name={product.name}
                price={minPrice}
                tags={tags}
                subscribeLabel={subscribeLabel}
                imageLoading={index < 3 ? "eager" : "lazy"}
                stock={stock}
                hasMultipleVariants={hasMultipleVariants}
                hasSubscriptionOption={maxDiscount > 0}
              />
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className='mt-8 sm:mt-12 mb-10 sm:mb-16 md:mb-20 flex justify-center'>
          <p className='rounded-full text-(--shop-pagination-text) px-5 py-1.5 text-center text-xs sm:text-sm md:text-base font-medium bg-gray-50 border border-gray-100'>
            Showing {products.length} Results
          </p>
        </div>
      )}
    </section>
  );
}

