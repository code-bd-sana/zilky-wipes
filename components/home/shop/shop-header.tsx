import {
  type ShopCategory,
  shopCategoryFilters,
} from "@/constants/shop-products";
import PageTitle from "@/components/shared/page-title/page-title";

type ShopHeaderProps = {
  activeCategory: ShopCategory;
  onCategoryChange: (category: ShopCategory) => void;
  titleContent?: React.ReactNode;
};

export default function ShopHeader({
  activeCategory,
  onCategoryChange,
  titleContent,
}: ShopHeaderProps) {
  return (
    <section className='bg-white'>
      <div className='mx-5 md:mx-12.5 pt-28 md:pt-72 pb-6 md:pb-16'>
        <div className='h-full flex flex-col justify-end gap-5 md:gap-6'>
          <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'>
            <PageTitle
              align='start'
              titleClassName='text-3xl sm:text-4xl md:text-6xl leading-[1.08]'
              titleContent={
                titleContent ?? (
                  <>
                    One Time <span className='px-1 text-[#9aa6b8]'>/</span>
                    <span className='text-[#8291a8]'> Subscription</span>
                  </>
                )
              }
            />

            <div className='flex flex-wrap items-center gap-2 md:justify-end'>
              {shopCategoryFilters.map((filter) => {
                const isActive = activeCategory === filter.value;
                return (
                  <button
                    key={filter.value}
                    type='button'
                    onClick={() => onCategoryChange(filter.value)}
                    className={`rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl font-medium transition-colors ${
                      isActive
                        ? "bg-(--text-primary) text-white"
                        : "border border-(--text-primary)/35 text-(--text-primary) hover:bg-white/80"
                    }`}>
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
