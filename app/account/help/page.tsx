import FaqCategory from "@/components/home/faq/faq-category";
import HaveQuestions from "@/components/account/help/have-questions";
import HelpTitle from "@/components/account/help/help-title";

async function getHelpPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/help`, {
      next: { revalidate: 60, tags: ['page-help'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch help page data", e);
    return null;
  }
}

export default async function Help() {
  const pageData = await getHelpPageData();
  const sections = (pageData?.sections || []).reduce((acc: any, sec: any) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {});

  const faqs = sections['faqs']?.topics || [];

  return (
    <>
      <HelpTitle data={sections['hero']} />
      
      {faqs.map((topic: any, index: number) => (
        <FaqCategory key={topic.name || index} data={topic} />
      ))}

      <HaveQuestions data={sections['cta']} />
    </>
  );
}

