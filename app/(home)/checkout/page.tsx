import CheckoutRightPanel from "@/components/home/checkout/checkout-right-panel";

export default function CheckoutPage() {
  return (
    <section className='min-h-screen bg-white' style={{ paddingTop: "6.25rem" }}>
      <div className='grid min-h-[calc(100dvh-5.5rem)] grid-cols-1 lg:grid-cols-2'>
        <div className='hidden bg-white lg:block' />
        <CheckoutRightPanel />
      </div>
    </section>
  );
}
