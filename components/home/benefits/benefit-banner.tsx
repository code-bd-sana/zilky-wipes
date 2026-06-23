import Image from "next/image";
import { isVideo } from "@/lib/utils";

export default function BenefitBanner({ data }: { data?: any }) {
  const title = data?.title || 'A cleaner way to care.';
  const mediaSrc = data?.imagePaths?.[0] || '/video/4.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Hero container */}
      <div className='absolute inset-0 w-full h-full overflow-hidden bg-gray-100'>
        {/* Media Background */}
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='absolute inset-0 w-full h-full object-cover'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt="Benefit Banner"
            fill
            className='absolute inset-0 w-full h-full object-cover'
            priority
          />
        )}

        {/* Dark overlay for text contrast */}
        <div className='absolute inset-0 ' />
      </div>
      {/* Content overlay */}
      <div className='relative z-10 h-full flex items-end justify-start text-start max-w-480 mx-auto px-5 md:px-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[120px] font-bold w-full text-white drop-shadow-md'>
          {title}
        </p>
      </div>
    </section>
  );
}
