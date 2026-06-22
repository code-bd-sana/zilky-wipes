import ShopListingSection from "@/components/home/shop/shop-listing-section";

async function getShopPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/shop`, {
      next: { revalidate: 60, tags: ['page-shop'] }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Failed to fetch shop page data", e);
    return null;
  }
}

export default async function Shop() {
  const pageData = await getShopPageData();
  const sections = (pageData?.sections || []).reduce((acc: any, sec: any) => {
    acc[sec.sectionKey] = sec.content;
    return acc;
  }, {});

  const footerVideoSrc = sections['footer-video']?.imagePaths?.[0];

  return (
    <div className='min-h-screen bg-white'>
      <ShopListingSection footerImageSrc={footerVideoSrc} />
    </div>
  );
}
