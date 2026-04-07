export default function ShippingAndDelivery() {
  const shippingQuestions = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard delivery takes 3-5 business days. You'll get tracking information by email as soon as your order ships.",
    },
    {
      question: "Can I change my delivery address?",
      answer:
        "Yes. Click 'Edit address' on your dashboard or update it in Settings. Changes apply to all future orders. If an order has already shipped, contact support immediately.",
    },
    {
      question: "Do I need to be home when my package arrives?",
      answer:
        "No signature needed. Your package will be left at your door. You can add special instructions for your carrier in Settings if you'd like.",
    },
    {
      question: "My package hasn't arrived. What should I do?",
      answer:
        "First, check the tracking link in your delivery email. If it shows delivered but you haven't received it, check with neighbors or your building manager. Still can't find it? Contact our support team and we'll help resolve it.",
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150  pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Shipping & Delivery
      </p>
      <div className='mt-6 space-y-8'>
        {shippingQuestions.map((item, index) => (
          <div key={index}>
            <p className='text-[#474747] text-base '>{item.question}</p>
            <p className='text-[#979191] text-sm mt-2'>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
