import HaveQuestions from "@/components/home/faq/have-questions";
import HelpTitle from "@/components/home/faq/help-title";
import ManagingSubscription from "@/components/home/faq/managing-subscription";
import PaymentAndBilling from "@/components/home/faq/payment-billing";
import Product from "@/components/home/faq/product";
import ReturnPolicy from "@/components/home/faq/return-policy";
import ShippingAndDelivery from "@/components/home/faq/shipping-delivery";

export default function FaqPage() {
  return (
    <>
      <HelpTitle />
      <ManagingSubscription />
      <ShippingAndDelivery />
      <PaymentAndBilling />
      <Product />
      <ReturnPolicy />
      <HaveQuestions />
    </>
  );
}
