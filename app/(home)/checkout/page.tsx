import CheckoutLeftPanel from "@/components/home/checkout/checkout-left-panel";
import CheckoutRightPanel from "@/components/home/checkout/checkout-right-panel";

export default function CheckoutPage() {
  return (
    <section
      className='min-h-screen bg-white'
      style={{ paddingTop: "var(--navbar-height)" }}>
      <div className='grid min-h-[calc(100dvh-var(--navbar-height))] grid-cols-1 overflow-hidden lg:grid-cols-2'>
        <div className='bg-white lg:overflow-y-auto'>
          <CheckoutLeftPanel />
        </div>
        <div className='bg-(--checkout-panel-bg)'>
          <CheckoutRightPanel />
        </div>
      </div>
    </section>
  );
}
