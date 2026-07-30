import FeedbackPageContent from "@/components/home/feedback/feedback-page-content";

async function getFeedbackMainData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/feedback-main`, {
      next: { revalidate: 60, tags: ['page-feedback-main'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch feedback page data", e);
    return null;
  }
}

export default async function FeedbackPage() {
  const pageData = await getFeedbackMainData();
  const sections = (pageData?.sections || []).reduce((acc: Record<string, Record<string, unknown>>, sec: { sectionKey: string; content: Record<string, unknown> }) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {} as Record<string, Record<string, unknown>>);

  return (
    <div className='min-h-screen pb-20'>
      <FeedbackPageContent data={sections} />
    </div>
  );
}