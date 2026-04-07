import AccountFooter from "@/components/account/profile/account-footer";
import AccountTitle from "@/components/account/profile/account-title";
import AddressPayment from "@/components/account/profile/address-payment";
import AdjustSubscription from "@/components/account/profile/adjust-subscription";
import RecentOrder from "@/components/account/profile/recent-order";

export default function Profile() {
  return (
    <>
      <AccountTitle />
      <AdjustSubscription />
      <AddressPayment />
      <RecentOrder />
      <AccountFooter />
    </>
  );
}
