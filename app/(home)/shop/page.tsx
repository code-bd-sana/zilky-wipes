import ShopListingSection from "@/components/home/shop/shop-listing-section";
import type { BackendProduct, BackendCategory } from "@/components/dashboard/products/product-list";

async function getShopPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/shop`, {
      next: { revalidate: 60, tags: ['page-shop'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch shop page data", e);
    return null;
  }
}

async function getProducts(): Promise<BackendProduct[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`, {
      next: { revalidate: 60, tags: ['products'] }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error("Failed to fetch products", e);
    return [];
  }
}

async function getCategories(): Promise<BackendCategory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 60, tags: ['categories'] }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error("Failed to fetch categories", e);
    return [];
  }
}

export default async function Shop() {
  const pageData = await getShopPageData();
  const products = await getProducts();
  const categories = await getCategories();

  const sections = (pageData?.sections || []).reduce((acc: Record<string, unknown>, sec: { sectionKey: string; content: unknown }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {});

  const footerVideoSrc = sections['footer-video']?.imagePaths?.[0];

  return (
    <div className='min-h-screen bg-white'>
      <ShopListingSection 
        footerImageSrc={footerVideoSrc as string} 
        products={products}
        categories={categories}
      />
    </div>
  );
}
