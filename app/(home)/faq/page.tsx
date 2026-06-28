import FaqCategory from "@/components/home/faq/faq-category";
import HaveQuestions from "@/components/home/faq/have-questions";
import HelpTitle from "@/components/home/faq/help-title";

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

  const faqs = sections['faqs']?.topics || [];

  return (
    <>
      <HelpTitle data={sections['hero']} />
      
      {faqs.map((topic: { name?: string; questions?: unknown[] }, index: number) => (
        <FaqCategory key={topic.name || index} data={topic} />
      ))}

      <HaveQuestions data={sections['cta']} />
    </>
  );
}
