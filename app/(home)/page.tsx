import FooterVideo from "@/components/home/home-page/footer-video";
import HomeBanner from "@/components/home/home-page/home-banner";
import Testimonial from "@/components/home/home-page/testimonial";
import Section1 from "@/components/home/home-page/section-1";
import Section2 from "@/components/home/home-page/section-2";
import ShopeWipes from "@/components/home/home-page/shop-wipes";
import BenefitSection1 from "@/components/home/benefits/benefit-section-1";
import ZilkyAdvantage from "@/components/home/benefits/zilky-advantage";
import type { BackendProduct } from "@/components/dashboard/products/product-list";

async function getPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/home`, {
      next: { revalidate: 60, tags: ['page-home'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch page data", e);
    return null;
  }
}

async function getBenefitsPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/benefits`, {
      next: { revalidate: 60, tags: ['page-benefits'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch benefits page data", e);
    return null;
  }
}

async function getTopReviews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/top?limit=4`, {
      next: { revalidate: 60, tags: ['top-reviews'] }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error("Failed to fetch top reviews", e);
    return [];
  }
}

async function getRecentProducts(): Promise<BackendProduct[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=4&sortBy=createdAt&sortOrder=desc`,
      {
        next: { revalidate: 60, tags: ['products'] },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error("Failed to fetch recent products", e);
    return [];
  }
}

export default async function Home() {
  const [pageData, benefitsPageData, topReviews, recentProducts] = await Promise.all([
    getPageData(),
    getBenefitsPageData(),
    getTopReviews(),
    getRecentProducts(),
  ]);
  
  const sections = (pageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const benefitsSections = (benefitsPageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  return (
    <>
      <HomeBanner data={sections['hero']} />
      <BenefitSection1
        data={sections['section-1'] || benefitsSections['section-1']}
        hideMediaOnMobile={true}
      />
      <ZilkyAdvantage data={sections['advantage'] || benefitsSections['advantage']} />
      <ShopeWipes data={sections['shop']} products={recentProducts} />
      <Section1 data={sections['feature-1']} />
      <Section2 data={sections['feature-2']} />
      <Testimonial data={sections['testimonial']} reviews={topReviews} />
      <FooterVideo data={sections['footer-video']} />
    </>
  );
}
