import PageTitle from "@/components/shared/page-title/page-title";
import SplitContentSection from "@/components/shared/split-content-section";
import { Droplet, Package, Recycle } from "lucide-react";
import Image from "next/image";
import { isVideo } from "@/lib/utils";

const iconMap = [
  { icon: Recycle, iconColor: "#4CAF7A", iconBg: "#4CAF7A1A" },
  { icon: Droplet, iconColor: "#2C8E87", iconBg: "#2C8E871A" },
  { icon: Package, iconColor: "#D4A843", iconBg: "#D4A8431A" },
];

export default function BenefitSection2({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Environmental Responsibility';
  const subtitle = (data?.subtitle as string)?.split('\n') || [
    "We're committed to making clean choices that are also green choices. Every ZilkyWipe is designed with the planet in mind.",
  ];

  const defaultEnvironmentalBenefits = [
    {
      title: "100% Biodegradable",
      description:
        "Breaks down completely in water within 24 hours, leaving no harmful residue.",
    },
    {
      title: "Water-Based Formula",
      description:
        "Made with purified water and natural ingredients, free from harsh chemicals.",
    },
    {
      title: "Sustainable Packaging",
      description:
        "Recyclable packaging made from post-consumer materials, minimizing environmental footprint.",
    },
  ];

  const environmentalBenefits = (data?.detailList as {title: string, description: string}[])?.length ? (data?.detailList as {title: string, description: string}[]) : defaultEnvironmentalBenefits;

  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/1.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section>
      <SplitContentSection
        desktopDirection='media-content'
        sectionClassName='mt-14 sm:mt-20 md:mt-28 lg:mt-36'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='text-[28px]! sm:text-[36px]! md:text-[46px]! lg:text-[54px]! leading-[1.15]! sm:leading-[1.1]! font-bold!'
              subtitle={subtitle}
              subtitleClassName='mt-4 sm:mt-6 text-[15px]! sm:text-[18px]! md:text-[22px]! leading-relaxed'
            />
            <div className='mt-6 sm:mt-8 space-y-3 sm:space-y-4'>
              {environmentalBenefits.map((benefit: {title: string, description: string}, index: number) => {
                const iconConf = iconMap[index % iconMap.length];
                const IconComp = iconConf.icon;
                return (
                <div
                  key={benefit.title + index}
                  className='flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 border border-gray-200/80 rounded-xl bg-white shadow-2xs hover:shadow-xs transition-shadow duration-300'>
                  <div
                    style={{ backgroundColor: iconConf.iconBg }}
                    className='p-2.5 sm:p-3 rounded-xl shrink-0 mt-0.5 sm:mt-0'>
                    <IconComp
                      className='w-5 h-5 sm:w-6 sm:h-6'
                      style={{ color: iconConf.iconColor }}
                    />
                  </div>
                  <div>
                    <h3 className='text-sm sm:text-base md:text-lg font-bold text-(--text-primary)'>
                      {benefit.title}
                    </h3>
                    <p className='text-xs sm:text-sm text-gray-600 leading-relaxed mt-0.5'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )})}
            </div>
          </>
        }
        media={
          renderVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              className='w-full h-auto aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] object-cover shadow-lg'>
              <source src={mediaSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className='relative w-full aspect-37/45 max-h-125 lg:max-h-none rounded-[24px] sm:rounded-[48px] md:rounded-[72px] lg:rounded-[96px] overflow-hidden shadow-lg'>
              <Image
                src={mediaSrc}
                alt='Environmental preview'
                fill
                priority
                quality={100}
                sizes='(min-width: 1024px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
          )
        }
      />
    </section>
  );
}

