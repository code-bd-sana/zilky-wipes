import PageTitle from "@/components/shared/page-title/page-title";
import {
  Award,
  BadgeCheck,
  Droplet,
  Flower,
  Leaf,
  Recycle,
  ShieldCheckIcon,
  Zap,
} from "lucide-react";

export default function BenefitComfort() {
  const comfortData = [
    {
      icon: ShieldCheckIcon,
      title: "Superior Cleanliness",
      description:
        "Clinically effective formula that leaves you feeling remarkably fresh and clean.",
    },
    {
      icon: Flower,
      title: "Gentle on Skin",
      description:
        "Ultra-soft fibers designed to prevent irritation and respect your skin's balance.",
    },
    {
      icon: Recycle,
      title: "Truly Flushable",
      description:
        "Breaks down rapidly in water systems, ensuring safety for plumbing.",
    },
    {
      icon: BadgeCheck,
      title: "Dermatologist Tested",
      description:
        "Clinically proven safe for sensitive skin and free from harsh chemicals.",
    },
    {
      icon: Zap,
      title: "Ultimate Convenience",
      description:
        "Designed for modern lives, easy to use at home or while traveling.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Experience luxury in every wipe with our high-grade material selection.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description:
        "Sustainably sourced materials and environmentally conscious packaging.",
    },
    {
      icon: Droplet,
      title: "Water-Based Formula",
      description:
        "99% pure water infusion for an uncompromisingly gentle clinical clean.",
    },
  ];
  return (
    <section className='max-w-480 mx-auto px-4 md:px-14 lg:px-40 py-10 md:py-16 '>
      <div className='my-10 md:mb-25'>
        <PageTitle
          title='Engineered for Comfort'
          titleClassName='max-w-200! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 '>
        {comfortData.map((item, index) => (
          <div
            key={index}
            className='mb-8 last:mb-0 h-full min-h-40 bg-[#FBFAF9] rounded-[12px] hover:scale-[1.03] transition-all duration-300 p-8 flex flex-col'>
            <item.icon className='w-6 h-6 text-(--text-primary) mb-4' />
            <div className='flex-1'>
              <h3 className='text-lg md:text-2xl text-[#262626] mb-1'>
                {item.title}
              </h3>
              <p className='text-base md:text-base text-[#979191] leading-relaxed max-w-60'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
