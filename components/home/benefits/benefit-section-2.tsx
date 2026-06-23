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

export default function BenefitSection2({ data }: { data?: any }) {
  const title = data?.title || 'Environmental Responsibility';
  const subtitle = data?.subtitle?.split('\n') || [
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

  const environmentalBenefits = data?.detailList?.length ? data.detailList : defaultEnvironmentalBenefits;

  const mediaSrc = data?.imagePaths?.[0] || '/video/1.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='mb-10 lg:mb-30'>
      <SplitContentSection
        desktopDirection='media-content'
        sectionClassName='md:mt-50'
        content={
          <>
            <PageTitle
              title={title}
              titleClassName='max-w-250! text-[40px]! leading-[1.1]! md:text-[56px]!'
              subtitle={subtitle}
              subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[24px]! max-w-130! mx-auto text-center'
            />
            <div className='mt-6'>
              {environmentalBenefits.map((benefit: any, index: number) => {
                const iconConf = iconMap[index % iconMap.length];
                const IconComp = iconConf.icon;
                return (
                <div
                  key={benefit.title + index}
                  className='flex flex-row items-center gap-4 mt-5 px-4 border border-gray-200 rounded-xl py-5 md:py-6 hover:shadow-lg transition-shadow duration-300'>
                  <div
                    style={{ backgroundColor: iconConf.iconBg }}
                    className='p-3 rounded-[14px]'>
                    <IconComp
                      className='w-7 h-7'
                      style={{ color: iconConf.iconColor }}
                    />
                  </div>
                  <div>
                    <h3 className='text-lg md:text-xl font-semibold text-(--text-primary)'>
                      {benefit.title}
                    </h3>
                    <p className='text-gray-600 max-w-200'>
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
              className='w-full h-auto aspect-37/45 rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] object-cover'>
              <source src={mediaSrc} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={mediaSrc}
              alt='Environmental preview'
              width={800}
              height={1000}
              className='w-full h-auto aspect-37/45 rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] object-cover'
            />
          )
        }
      />
    </section>
  );
}
