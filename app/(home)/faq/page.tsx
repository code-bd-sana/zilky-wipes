import FaqClient from "@/components/home/faq/faq-client";
import { defaultFaqTopics } from "@/components/home/faq/default-faqs";

async function getFaqPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/faq`, {
      next: { revalidate: 60, tags: ['page-faq'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch faq page data", e);
    return null;
  }
}

export default async function FaqPage() {
  const pageData = await getFaqPageData();
  const sections = (pageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  const rawFaqs = sections['faqs']?.topics as { name?: string; questions?: { id?: string; question: string; answer: string; }[] }[] | undefined;
  const faqs = rawFaqs && rawFaqs.length > 0 ? rawFaqs : defaultFaqTopics;

  return (
    <FaqClient
      heroData={sections['hero']}
      topics={faqs}
      ctaData={sections['cta']}
    />
  );
}
