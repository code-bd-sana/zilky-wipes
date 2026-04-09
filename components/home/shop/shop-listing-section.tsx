"use client";

import ShopHeader from "@/components/home/shop/shop-header";
import ShopProductsGrid from "@/components/home/shop/shop-products-grid";
import ShopVideoSection from "@/components/home/shop/shop-video-section";
import {
  type ShopCategory,
  type ShopPurchaseType,
  shopProducts,
} from "@/constants/shop-products";
import { useMemo, useState } from "react";

type ShopListingSectionProps = {
  titleContent?: React.ReactNode;
  footerImageSrc?: string;
  footerImageAlt?: string;
};

export default function ShopListingSection({
  titleContent,
  footerImageSrc,
  footerImageAlt,
}: ShopListingSectionProps) {
  const [activePurchaseType, setActivePurchaseType] = useState<ShopPurchaseType>(
    "one-time",
  );
  const [activeCategory, setActiveCategory] = useState<ShopCategory>(
    "starter-kit",
  );

  const filteredProducts = useMemo(
    () =>
      shopProducts.filter(
        (product) =>
          (product.purchaseType ?? "one-time") === activePurchaseType &&
          product.category === activeCategory,
      ),
    [activeCategory, activePurchaseType],
  );

  return (
    <>
      <ShopHeader
        activePurchaseType={activePurchaseType}
        onPurchaseTypeChange={setActivePurchaseType}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        titleContent={titleContent}
      />
      <ShopProductsGrid products={filteredProducts} />
      <ShopVideoSection imageSrc={footerImageSrc} imageAlt={footerImageAlt} />
    </>
  );
}
