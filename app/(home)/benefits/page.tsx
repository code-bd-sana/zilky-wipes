import BenefitBanner from "@/components/home/benefits/benefit-banner";
import BenefitComfort from "@/components/home/benefits/benefit-comfort";
import BenefitsFooter from "@/components/home/benefits/benefit-footer";
import BenefitSection1 from "@/components/home/benefits/benefit-section-1";
import BenefitSection2 from "@/components/home/benefits/benefit-section-2";
import ProvenResults from "@/components/home/benefits/prover-result";
import ZilkyAdvantage from "@/components/home/benefits/zilky-advantage";
import BenefitPeople from "@/components/home/home-page/testimonial";

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

export default async function Benefits() {
  const pageData = await getBenefitsPageData();
  const sections = (pageData?.sections || []).reduce((acc: any, sec: any) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {});

  return (
    <>
      <BenefitBanner data={sections['hero']} />
      <BenefitSection1 data={sections['section-1']} />
      <ZilkyAdvantage data={sections['advantage']} />
      <BenefitComfort data={sections['comfort']} />
      <BenefitSection2 data={sections['section-2']} />
      <ProvenResults data={sections['proven-results']} />
      <BenefitPeople data={sections['testimonial']} />
      <BenefitsFooter data={sections['footer-video']} />
    </>
  );
}
