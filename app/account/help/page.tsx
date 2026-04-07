import HaveQuestions from "@/components/account/help/have-questions";
import HelpTitle from "@/components/account/help/help-title";
import ManagingSubscription from "@/components/account/help/managing-subscription";
import PaymentAndBilling from "@/components/account/help/payment-billing";
import Product from "@/components/account/help/product";
import ShippingAndDelivery from "@/components/account/help/shipping-delivery";

export default function Help() {
  return (
    <>
      <HelpTitle />
      <ManagingSubscription />
      <ShippingAndDelivery />
      <PaymentAndBilling />
      <Product />
      <HaveQuestions />
    </>
  );
}
