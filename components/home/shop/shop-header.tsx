import {
  shopPurchaseTypeTabs,
} from "@/constants/shop-products";
import PageTitle from "@/components/shared/page-title/page-title";
import type { BackendCategory } from "@/components/dashboard/products/product-list";

type ShopHeaderProps = {
  activePurchaseType: string;
  onPurchaseTypeChange: (purchaseType: string) => void;
  activeCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  categories: BackendCategory[];
  titleContent?: React.ReactNode;
};

export default function ShopHeader({
  activePurchaseType,
  onPurchaseTypeChange,
  activeCategoryId,
  onCategoryChange,
  categories,
  titleContent,
}: ShopHeaderProps) {
  return (
    <section className='bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5 pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-5 sm:pb-8 md:pb-12'>
        <div className='h-full flex flex-col justify-end gap-4 sm:gap-6'>
          <div className='flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end'>
            <PageTitle
              align='start'
              titleClassName='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'
              titleContent={
                titleContent ?? (
                  <div className='flex items-center flex-wrap gap-1.5 sm:gap-2'>
                    {shopPurchaseTypeTabs.map((tab, index) => {
                      const isActive = activePurchaseType === tab.value;

                      return (
                        <span key={tab.value} className='inline-flex items-center'>
                          <button
                            type='button'
                            onClick={() => onPurchaseTypeChange(tab.value)}
                            aria-pressed={isActive}
                            className={`transition-colors text-left ${
                              isActive
                                ? "text-(--text-primary) font-bold"
                                : "text-[#8291a8] hover:text-(--text-primary)/70 font-medium"
                            }`}>
                            {tab.label}
                          </button>
                          {index < shopPurchaseTypeTabs.length - 1 ? (
                            <span className='px-1.5 sm:px-2 text-[#9aa6b8]'>/</span>
                          ) : null}
                        </span>
                      );
                    })}
                  </div>
                )
              }
            />

            {categories.length > 0 && (
              <div className='w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible sm:pb-0 md:justify-end scrollbar-none'>
                {categories.map((category) => {
                  const isActive = activeCategoryId === category.id;
                  return (
                    <button
                      key={category.id}
                      type='button'
                      onClick={() => onCategoryChange(category.id)}
                      className={`rounded-full px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-all duration-200 shadow-2xs ${
                        isActive
                          ? "bg-(--text-primary) text-white"
                          : "border border-(--text-primary)/30 text-(--text-primary) hover:bg-(--text-primary)/5 bg-white"
                      }`}>
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

