import FooterVideo from "@/components/home/home-page/footer-video";
import HomeBanner from "@/components/home/home-page/home-banner";
import People from "@/components/home/home-page/people";
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
      <People />
      <FooterVideo />
    </>
  );
}
