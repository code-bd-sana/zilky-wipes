"use client";

import ShopHeader from "@/components/home/shop/shop-header";
import ShopProductsGrid from "@/components/home/shop/shop-products-grid";
import ShopVideoSection from "@/components/home/shop/shop-video-section";
import { type ShopCategory, shopProducts } from "@/constants/shop-products";
import { useMemo, useState } from "react";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>(
    "starter-kit",
  );

  const filteredProducts = useMemo(
    () => shopProducts.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className='min-h-screen bg-white'>
      <ShopHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ShopProductsGrid products={filteredProducts} />
      <ShopVideoSection />
    </div>
  );
}
