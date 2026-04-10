export default function PaymentAndBilling() {
  const paymentQuestions = [
    {
      question: "When will I be charged?",
      answer:
        "We charge your card 2 days before each scheduled delivery. If your payment doesn't go through, we'll try again after 24 hours. If it still fails, your subscription will pause automatically.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "Click 'Update via Stripe' on your dashboard or in Settings. You'll be securely redirected to Stripe to update your card. We don't store your complete payment information.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Unopened products can be returned within 30 days for a full refund. For hygiene reasons, we can't accept opened items. Contact support to start a return.",
    },
    {
      question: "Where can I find my invoices?",
      answer:
        "We email an invoice after each charge. You can also view and download all past invoices from Settings under 'Billing history.'",
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150  pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Payment & Billing
      </p>
      <div className='mt-6 space-y-8'>
        {paymentQuestions.map((item, index) => (
          <div key={index}>
            <p className='text-[#474747] text-base '>{item.question}</p>
            <p className='text-[#979191] text-sm mt-2'>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
