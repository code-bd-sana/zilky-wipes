import SubsSection1 from "@/components/home/subscription/subs-section-1";
import SubsSection2 from "@/components/home/subscription/subs-section-2";
import SubscriptionBanner from "@/components/home/subscription/subscription-banner";
import SubscriptionDifference from "@/components/home/subscription/subscription-difference";
import SubscriptionFooter from "@/components/home/subscription/subscription-footer";

async function getSubscriptionPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/subscription`, {
      next: { revalidate: 60, tags: ['page-subscription'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch subscription page data", e);
    return null;
  }
}

export default async function Subscription() {
  const pageData = await getSubscriptionPageData();
  type Section = { sectionKey: string; content: unknown };
  const sections = (pageData?.sections || [] as Section[]).reduce((acc: Record<string, unknown>, sec: Section) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, unknown>);

  return (
    <>
      <SubscriptionBanner data={sections['hero']} />
      <SubsSection1 data={sections['section-1']} />
      <SubsSection2 data={sections['section-2']} />
      <SubscriptionDifference data={sections['difference']} />
      <SubscriptionFooter data={sections['footer-video']} />
    </>
  );
}
