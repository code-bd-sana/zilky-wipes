import PageTitle from "../shared/page-title/page-title";
import ProductCard from "../shared/product-card/product-card";
import { wipesData } from "./wipes-data";

export default function ShopeWipes() {
  return (
    <section className='mx-5 mt-30 md:mx-12.5'>
      <PageTitle
        align='start'
        title='Shop ZilkyWipes'
        subtitle='You use it every day. You’ve just never been given a reason to question it. Until now!'
      />

      <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {wipesData.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
