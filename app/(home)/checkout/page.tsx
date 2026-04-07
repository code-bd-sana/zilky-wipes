import CheckoutLeftPanel from "@/components/home/checkout/checkout-left-panel";
import CheckoutRightPanel from "@/components/home/checkout/checkout-right-panel";

export default function CheckoutPage() {
  return (
    <section
      className='min-h-screen bg-white'
      style={{ paddingTop: "var(--navbar-height)" }}>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:items-start'>
        <div className='order-2 bg-white lg:order-1 lg:min-h-[calc(100dvh-var(--navbar-height))]'>
          <CheckoutLeftPanel />
        </div>
        <div className='order-1 border-b border-(--checkout-divider) bg-(--checkout-panel-bg) lg:order-2 lg:sticky lg:top-(--navbar-height) lg:h-[calc(100dvh-var(--navbar-height))] lg:overflow-y-auto lg:border-b-0'>
          <CheckoutRightPanel />
        </div>
      </div>
    </section>
  );
}
