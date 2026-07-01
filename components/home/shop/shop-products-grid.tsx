import ProductCard from "@/components/shared/product-card/product-card";
import type { BackendProduct } from "@/components/dashboard/products/product-list";

type ShopProductsGridProps = {
  products: BackendProduct[];
};

export default function ShopProductsGrid({ products }: ShopProductsGridProps) {
  return (
    <section className='mx-5 md:mx-11.5'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
                ...product.variants.map((v: any) =>
                  v.subscriptionEligible ? v.subscriptionDiscount || 0 : 0
                )
              )
            : 0;
            
          const subscribeLabel = maxDiscount > 0 ? `Subscribe & Save ${maxDiscount}%` : undefined;
          
          const firstVariantId = product.variants?.[0]?.id;
          
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
            />
          );
        })}
      </div>

      {products.length > 0 && (
        <div className='mt-10 md:mt-16 mb-12 md:mb-30 flex justify-center'>
          <p className='rounded-full text-(--shop-pagination-text) px-6 py-2 text-center text-sm font-medium md:text-base'>
            Showing {products.length} Results
          </p>
        </div>
      )}
    </section>
  );
}
