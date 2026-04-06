"use client";

import ShopHeader from "@/components/home/shop/shop-header";
import ShopProductsGrid from "@/components/home/shop/shop-products-grid";
import ShopVideoSection from "@/components/home/shop/shop-video-section";
import { type ShopCategory, shopProducts } from "@/constants/shop-products";
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
  const [activeCategory, setActiveCategory] = useState<ShopCategory>(
    "starter-kit",
  );

  const filteredProducts = useMemo(
    () => shopProducts.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <ShopHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        titleContent={titleContent}
      />
      <ShopProductsGrid products={filteredProducts} />
      <ShopVideoSection imageSrc={footerImageSrc} imageAlt={footerImageAlt} />
    </>
  );
}
