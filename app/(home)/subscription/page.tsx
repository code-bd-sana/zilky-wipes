import SubsSection1 from "@/components/home/subscription/subs-section-1";
import SubsSection2 from "@/components/home/subscription/subs-section-2";
import SubscriptionBanner from "@/components/home/subscription/subscription-banner";
import SubscriptionDifference from "@/components/home/subscription/subscription-difference";
import SubscriptionFooter from "@/components/home/subscription/subscription-footer";

export default function Subscription() {
  return (
    <>
      <SubscriptionBanner />
      <SubsSection1 />
      <SubsSection2 />
      <SubscriptionDifference />
      <SubscriptionFooter />
    </>
  );
}
