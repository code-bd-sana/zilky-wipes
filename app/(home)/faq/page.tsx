import HaveQuestions from "@/components/home/faq/have-questions";
import HelpTitle from "@/components/home/faq/help-title";
import ManagingSubscription from "@/components/home/faq/managing-subscription";
import OrderingAndDelivery from "@/components/home/faq/ordering-and-delivary";
import PaymentAndBilling from "@/components/home/faq/payment-billing";
import Product from "@/components/home/faq/product";
import ReturnPolicy from "@/components/home/faq/return-policy";
import ShippingAndDelivery from "@/components/home/faq/shipping-delivery";
import TechnicalAndPractical from "@/components/home/faq/technical-and-practical";

export default function FaqPage() {
  return (
    <>
      <HelpTitle />
      <ManagingSubscription />
      <ShippingAndDelivery />
      <PaymentAndBilling />
      <Product />
      <OrderingAndDelivery />
      <TechnicalAndPractical />
      <ReturnPolicy />
      <HaveQuestions />
    </>
  );
}
