export default function Product() {
  const productQuestions = [
    {
      question: "Are these actually flushable?",
      answer:
        "Yes, ZilkyWipes are certified flushable by independent labs and break down in water faster than toilet paper. They're safe for all plumbing systems, including septic tanks.",
    },
    {
      question: "How long does one roll last?",
      answer:
        "For one person, a roll typically lasts 3-4 weeks. It varies by household size and usage habits. You can adjust your delivery frequency anytime to match your actual needs.",
    },
    {
      question: "What are they made of?",
      answer:
        "100% biodegradable plant-based fibers. No plastic, no harsh chemicals, and free from parabens, alcohol, and synthetic fragrances.",
    },
    {
      question: "Are they safe for sensitive skin?",
      answer:
        "Yes. Our wipes are hypoallergenic and pH balanced. They're gentler than toilet paper and contain no irritating ingredients. If you have specific concerns, we recommend checking with your dermatologist.",
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150  pt-20'>
      <p className='text-[#979191] border-b border-[#F2F2F2] pb-2'>
        Product Questions
      </p>
      <div className='mt-6 space-y-8'>
        {productQuestions.map((item, index) => (
          <div key={index}>
            <p className='text-[#474747] text-base '>{item.question}</p>
            <p className='text-[#979191] text-sm mt-2'>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
