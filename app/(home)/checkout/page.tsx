import CheckoutLeftPanel from "@/components/home/checkout/checkout-left-panel";
import CheckoutRightPanel from "@/components/home/checkout/checkout-right-panel";

export default function CheckoutPage() {
  return (
    <section
      className='min-h-screen bg-white'
      style={{ paddingTop: "var(--navbar-height)" }}>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:items-start'>
        <div className='bg-white lg:min-h-[calc(100dvh-var(--navbar-height))]'>
          <CheckoutLeftPanel />
        </div>
        <div className='bg-(--checkout-panel-bg) lg:sticky lg:top-(--navbar-height) lg:h-[calc(100dvh-var(--navbar-height))] lg:overflow-y-auto'>
          <CheckoutRightPanel />
        </div>
      </div>
    </section>
  );
}
