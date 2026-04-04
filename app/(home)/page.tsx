import HomeBanner from "@/components/home/home-page/home-banner";
import Section1 from "@/components/home/home-page/section-1";
import Section2 from "@/components/home/home-page/section-2";
import ShopeWipes from "@/components/home/home-page/shop-wipes";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <ShopeWipes />
      <Section1 />
      <Section2 />
    </>
  );
}
