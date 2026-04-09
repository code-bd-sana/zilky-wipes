import AboutBanner from "@/components/home/about/about-banner";
import AboutPeople from "@/components/home/about/about-people";
import AboutSection1 from "@/components/home/about/about-section-1";
import AboutSection2 from "@/components/home/about/about-section-2";

export default function About() {
  return (
    <>
      <AboutBanner />
      <AboutSection1 />
      <AboutSection2 />
      <AboutPeople />
    </>
  );
}
