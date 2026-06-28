import FooterVideo from "@/components/home/home-page/footer-video";
import HomeBanner from "@/components/home/home-page/home-banner";
import Testimonial from "@/components/home/home-page/testimonial";
import Section1 from "@/components/home/home-page/section-1";
import Section2 from "@/components/home/home-page/section-2";
import ShopeWipes from "@/components/home/home-page/shop-wipes";

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

export default async function Home() {
  const pageData = await getPageData();
  
  const sections = (pageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  return (
    <>
      <HomeBanner data={sections['hero']} />
      <ShopeWipes data={sections['shop']} />
      <Section1 data={sections['feature-1']} />
      <Section2 data={sections['feature-2']} />
      <Testimonial data={sections['testimonial']} />
      <FooterVideo data={sections['footer-video']} />
    </>
  );
}
