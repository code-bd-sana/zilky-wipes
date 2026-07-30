import ShippingMethodList from "@/components/dashboard/shipping/shipping-method-list";

export const metadata = {
  title: "Shipping Methods | Dashboard",
  description: "Manage shipping methods and dynamic delivery charges",
};

export default function ShippingPage() {
  return <ShippingMethodList />;
}
