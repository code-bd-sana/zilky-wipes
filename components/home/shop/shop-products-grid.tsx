import ProductCard from "@/components/shared/product-card/product-card";
import type { ShopProduct } from "@/constants/shop-products";

type ShopProductsGridProps = {
  products: ShopProduct[];
};

export default function ShopProductsGrid({ products }: ShopProductsGridProps) {
  return (
    <section className='mx-5 pb-16 md:mx-11.5 md:pb-24'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {products.map(({ id, ...product }, index) => (
          <ProductCard
            key={id}
            {...product}
            imageLoading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className='mt-10 flex justify-center'>
        <p className='rounded-full text-[#979191] px-6 py-2 text-center text-sm font-medium md:text-base'>
          Showing 6 Results out of 200
        </p>
      </div>
    </section>
  );
}
