export default function DeliveryTrack() {
  const steps = [
    {
      date: "Feb 01, 2026 · 08:14 AM",
      label: "Order placed",
      sub: "ZilkyWipes fulfillment center",
      done: true,
    },
    {
      date: "Feb 01, 2026 · 02:37 PM",
      label: "Picked and packed",
      sub: "Brooklyn, NY facility",
      done: true,
    },
    {
      date: "Feb 02, 2026 · 06:22 AM",
      label: "In transit",
      sub: "USPS regional facility",
      done: true,
    },
    {
      date: "Feb 03, 2026 · 07:45 AM",
      label: "Out for delivery",
      sub: "Local post office",
      done: true,
    },
    {
      date: "Expected today by 8:00 PM",
      label: "Delivery",
      sub: "123 Oak Street, Brooklyn",
      done: false,
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div className='mb-6'>
        <p className='text-[#979191]'>Order Tracking</p>
        <p className='text-(--text-primary) text-3xl font-heading font-semibold'>
          #ZW-2026-00472
        </p>
      </div>

      <div className='bg-white rounded-2xl border border-neutral-200 px-7 py-6'>
        {/* Status badge */}
        <div className='inline-flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-1.5 mb-7'>
          <span className='w-2 h-2 rounded-full bg-[#008236]' />
          <span className='text-sm text-(--text-primary)'>
            Out for delivery
          </span>
        </div>

        {/* Timeline */}
        <div className='relative pl-7'>
          {/* Vertical line */}
          <div className='absolute left-1.5 top-2.5 bottom-2.5 w-px'>
            <div className='h-[78%] bg-[#474747]' />
            <div className='h-[22%] bg-neutral-300' />
          </div>

          {steps.map((step, i) => (
            <div key={i} className='relative mb-8 last:mb-0'>
              {/* Dot */}
              <div
                className={`absolute -left-7 top-0.75 w-3.25 h-3.25 rounded-full border
                  ${
                    step.done
                      ? "bg-(--text-primary) border-(--text-primary)"
                      : "bg-white border-neutral-400"
                  }`}
              />
              <p
                className={`text-[12.5px] mb-0.5 ${step.done ? "text-[#979191]" : "text-neutral-400"}`}>
                {step.date}
              </p>
              <p
                className={`text-[15px]  mb-0.5 ${step.done ? "text-[#474747]" : "text-neutral-400"}`}>
                {step.label}
              </p>
              <p
                className={`text-[13px] ${step.done ? "text-[#979191]" : "text-neutral-400"}`}>
                {step.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
