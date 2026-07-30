import AboutBanner from "@/components/home/about/about-banner";
import AboutPeople from "@/components/home/about/about-people";
import AboutSection1 from "@/components/home/about/about-section-1";
import AboutSection2 from "@/components/home/about/about-section-2";

async function getAboutPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/about`, {
      next: { revalidate: 60, tags: ['page-about'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch about page data", e);
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

export default async function About() {
  const [pageData, topReviews] = await Promise.all([
    getAboutPageData(),
    getTopReviews()
  ]);
  const sections = (pageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  return (
    <>
      <AboutBanner data={sections['hero']} />
      <AboutSection1 data={sections['section-1']} />
      <AboutSection2 data={sections['section-2']} />
      <AboutPeople data={sections['testimonial']} reviews={topReviews} />
    </>
  );
}
