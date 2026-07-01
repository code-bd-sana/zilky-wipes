'use client';

import ShopHeader from '@/components/home/shop/shop-header';
import ShopProductsGrid from '@/components/home/shop/shop-products-grid';
import ShopVideoSection from '@/components/home/shop/shop-video-section';
import { useMemo, useState } from 'react';

import type {
  BackendCategory,
  BackendProduct,
  BackendVariant,
} from '@/components/dashboard/products/product-list';

type ShopListingSectionProps = {
  titleContent?: React.ReactNode;
  footerImageSrc?: string;
  footerImageAlt?: string;
  products?: BackendProduct[];
  categories?: BackendCategory[];
};

export default function ShopListingSection({
  titleContent,
  footerImageSrc,
  footerImageAlt,
  products = [],
  categories = [],
}: ShopListingSectionProps) {
  const [activePurchaseType, setActivePurchaseType] = useState<string>('one-time');

  // Default to first category if available, otherwise empty string
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Check purchase type (One-time vs Subscription)
      const hasSubscription = product.variants?.some((v: BackendVariant) => v.subscriptionEligible);

      const matchPurchaseType = activePurchaseType === 'subscription' ? hasSubscription : true;

      // Check category
      const matchCategory = product.categories?.some((cat) => cat.id === activeCategoryId);

      return matchPurchaseType && matchCategory;
    });
  }, [products, activeCategoryId, activePurchaseType]);

  return (
    <>
      <ShopHeader
        activePurchaseType={activePurchaseType}
        onPurchaseTypeChange={setActivePurchaseType}
        activeCategoryId={activeCategoryId}
        onCategoryChange={setActiveCategoryId}
        categories={categories}
        titleContent={titleContent}
      />
      <ShopProductsGrid products={filteredProducts} />
      <ShopVideoSection imageSrc={footerImageSrc} imageAlt={footerImageAlt} />
    </>
  );
}
