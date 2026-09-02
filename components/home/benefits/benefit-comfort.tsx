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

const iconMap = [ShieldCheckIcon, Flower, Recycle, BadgeCheck, Zap, Award, Leaf, Droplet];

export default function BenefitComfort({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Engineered for Comfort';
  
  const defaultComfortData = [
    {
      title: "Superior Cleanliness",
      description:
        "Clinically effective formula that leaves you feeling remarkably fresh and clean.",
    },
    {
      title: "Gentle on Skin",
      description:
        "Ultra-soft fibers designed to prevent irritation and respect your skin's balance.",
    },
    {
      title: "Truly Flushable",
      description:
        "Breaks down rapidly in water systems, ensuring safety for plumbing.",
    },
    {
      title: "Dermatologist Tested",
      description:
        "Clinically proven safe for sensitive skin and free from harsh chemicals.",
    },
    {
      title: "Ultimate Convenience",
      description:
        "Designed for modern lives, easy to use at home or while traveling.",
    },
    {
      title: "Premium Quality",
      description:
        "Experience luxury in every wipe with our high-grade material selection.",
    },
    {
      title: "Eco-Friendly",
      description:
        "Sustainably sourced materials and environmentally conscious packaging.",
    },
    {
      title: "Water-Based Formula",
      description:
        "99% pure water infusion for an uncompromisingly gentle clinical clean.",
    },
  ];

  const comfortData = (data?.detailList as {title: string, description: string}[])?.length ? (data?.detailList as {title: string, description: string}[]) : defaultComfortData;

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5 py-10 sm:py-16 md:py-20'>
      <div className='my-6 sm:my-10 md:my-14 text-center'>
        <PageTitle
          title={title}
          align='center'
          titleClassName='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--text-primary) text-center max-w-3xl mx-auto'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
        {comfortData.map((item: {title: string, description: string}, index: number) => {
          const IconComp = iconMap[index % iconMap.length];
          return (
          <div
            key={index}
            className='h-full min-h-35 bg-[#FBFAF9] rounded-2xl hover:scale-[1.02] transition-all duration-300 p-5 sm:p-6 flex flex-col border border-gray-100 shadow-2xs'>
            <IconComp className='w-5 h-5 sm:w-6 sm:h-6 text-(--text-primary) mb-3 sm:mb-4' />
            <div className='flex-1'>
              <h3 className='text-base sm:text-lg md:text-xl font-bold text-[#262626] mb-1.5'>
                {item.title}
              </h3>
              <p className='text-xs sm:text-sm md:text-base text-[#737373] leading-relaxed'>
                {item.description}
              </p>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}

