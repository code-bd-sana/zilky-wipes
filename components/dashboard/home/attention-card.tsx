import { CornerDownRight } from "lucide-react";

type AttentionItem = {
  message: string;
  badge: string;
};

const attentionData: AttentionItem[] = [
  {
    message: "Inventory alert: Only 2 Items Remained",
    badge: "UltraSoft Towels™",
  },
  {
    message: "Payment alert: Subscription Payment Declined",
    badge: "Saad Rayhan",
  },
  {
    message: "Inventory alert: Only 10 Items Remained",
    badge: "QuickSnack Bars™",
  },
  {
    message: "Payment alert: Invoice Due Soon",
    badge: "John Smith",
  },
  {
    message: "Payment alert: Subscription Payment Successful",
    badge: "Maria Gonzalez",
  },
  {
    message: "Payment alert: Subscription Renewed",
    badge: "Saad Rayhan",
  },
];

export default function AttentionCard() {
  return (
    <section className='mx-6 mb-12 xl:mx-30 mt-10 md:mt-20'>
      <h2 className='text-base text-[#D97706]'>Attention</h2>

      <ul className='mt-4 border-y border-[#e5e5e5]'>
        {attentionData.map((item) => (
          <li
            key={`${item.message}-${item.badge}`}
            className='flex flex-wrap items-center gap-3 border-b border-[#e5e5e5] py-1.5 text-[#2f2f2f] last:border-b-0'>
            <CornerDownRight className='h-4 w-4' color='#262626' />
            <span className='text-sm'>{item.message}</span>
            <span className='rounded-[10px] border border-[#E5E7EB] bg-[#FAFAF9] px-3 py-1 font-mono text-sm text-[#262626]'>
              {item.badge}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
