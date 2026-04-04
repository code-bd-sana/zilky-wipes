import ProductCard from "@/components/shared/product-card/product-card";
import type { ShopProduct } from "@/constants/shop-products";

type ShopProductsGridProps = {
  products: ShopProduct[];
};

export default function ShopProductsGrid({ products }: ShopProductsGridProps) {
  return (
    <section className='mx-5 md:mx-11.5'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {products.map(({ id, ...product }, index) => (
          <ProductCard
            key={id}
            productId={id}
            {...product}
            imageLoading={index < 3 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className='mt-10 md:mt-16 mb-12 md:mb-30 flex justify-center'>
        <p className='rounded-full text-(--shop-pagination-text) px-6 py-2 text-center text-sm font-medium md:text-base'>
          Showing 6 Results out of 200
        </p>
      </div>
    </section>
  );
}
