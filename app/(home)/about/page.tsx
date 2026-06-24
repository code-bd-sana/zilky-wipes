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

export default async function About() {
  const pageData = await getAboutPageData();
  const sections = (pageData?.sections || []).reduce((acc: any, sec: any) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {});

  return (
    <>
      <AboutBanner data={sections['hero']} />
      <AboutSection1 data={sections['section-1']} />
      <AboutSection2 data={sections['section-2']} />
      <AboutPeople data={sections['testimonial']} />
    </>
  );
}
