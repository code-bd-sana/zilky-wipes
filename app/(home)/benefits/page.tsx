import BenefitBanner from "@/components/home/benefits/benefit-banner";
import BenefitComfort from "@/components/home/benefits/benefit-comfort";
import BenefitsFooter from "@/components/home/benefits/benefit-footer";
// import BenefitPeople from "@/components/home/benefits/benefit-people";
import BenefitSection1 from "@/components/home/benefits/benefit-section-1";
import BenefitSection2 from "@/components/home/benefits/benefit-section-2";
import ProvenResults from "@/components/home/benefits/prover-result";
import ZilkyAdvantage from "@/components/home/benefits/zilky-advantage";
import BenefitPeople from "@/components/home/home-page/testimonial";

export default function Benefits() {
  return (
    <>
      <BenefitBanner />
      <BenefitSection1 />
      <ZilkyAdvantage />
      <BenefitComfort />
      <BenefitSection2 />
      <ProvenResults />
      <BenefitPeople />
      <BenefitsFooter />
    </>
  );
}
