import BenefitBanner from "@/components/home/benefits/benefit-banner";
import BenefitsFooter from "@/components/home/benefits/benefit-footer";
import BenefitPeople from "@/components/home/benefits/benefit-people";
import BenefitSection1 from "@/components/home/benefits/benefit-section-1";

export default function Benefits() {
  return (
    <>
      <BenefitBanner />
      <BenefitSection1 />
      <BenefitPeople />
      <BenefitsFooter />
    </>
  );
}
