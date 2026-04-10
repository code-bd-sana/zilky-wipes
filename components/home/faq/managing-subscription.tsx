export default function ManagingSubscription() {
  const subsQuestions = [
    {
      question: "How do I pause my subscription?",
      answer:
        "From your dashboard, click 'Modify delivery' to open the adjustment panel, then select 'Pause indefinitely.' You won't be charged while paused, and you can resume anytime from the same place.",
    },
    {
      question: "Can I skip just one delivery?",
      answer:
        "Yes, in the adjustment panel, click 'Skip next delivery.' Your subscription will automatically resume with the following cycle. This doesn't change your regular delivery frequency.",
    },
    {
      question: "What if I need extra wipes before my next delivery?",
      answer:
        "Click 'Order extra now' in the adjustment panel to place a one-time purchase. It ships separately within 2 business days and doesn't affect your subscription schedule.",
    },
    {
      question: "How do I change how often I receive deliveries?",
      answer:
        "Open the adjustment panel and select 'Change frequency.' You can choose delivery every 3, 4, 6, or 8 weeks. Changes apply starting with your next scheduled delivery.",
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Managing Your Subscription
      </p>
      <div className='mt-6 space-y-8'>
        {subsQuestions.map((item, index) => (
          <div key={index}>
            <p className='text-[#474747] text-base '>{item.question}</p>
            <p className='text-[#979191] text-sm mt-2'>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
