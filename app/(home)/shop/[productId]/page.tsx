import ProductDetailsView from "@/components/home/shop/product-details-view";
import ShopListingSection from "@/components/home/shop/shop-listing-section";
import type { BackendProduct, BackendCategory } from "@/components/dashboard/products/product-list";

type ProductDetailsPageProps = {
  params: Promise<{ productId: string }>;
};

async function getProduct(id: string): Promise<BackendProduct | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      next: { revalidate: 60, tags: [`product-${id}`] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch product", e);
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

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = await params;

  const product = await getProduct(productId);

  if (!product) {
    return (
      <section className='mx-5 pt-30 md:mx-11.5'>
        <h1 className='font-heading text-4xl text-(--text-primary) md:text-6xl'>
          Product not found: {productId}
        </h1>
      </section>
    );
  }

  const allProducts = await getProducts();
  const categories = await getCategories();
  
  // Filter related products (exclude current, matching category)
  const productCategoryIds = product.categories?.map(c => c.id) || [];
  const relatedProducts = allProducts.filter(p => 
    p.id !== product.id && p.categories?.some(c => productCategoryIds.includes(c.id))
  ).slice(0, 3); // max 3 related products

  return (
    <>
      <ProductDetailsView
        product={product}
      />
      
      {relatedProducts.length > 0 && (
        <ShopListingSection
          titleContent='Related Products'
          footerImageSrc='/home/shop/shop-details.png'
          footerImageAlt='Related products footer image'
          products={relatedProducts}
          categories={categories.filter(c => productCategoryIds.includes(c.id))} // Only pass relevant category
        />
      )}
    </>
  );
}
