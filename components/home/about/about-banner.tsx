import Image from "next/image";
import { isVideo } from "@/lib/utils";

export default function AboutBanner({ data }: { data?: Record<string, unknown> }) {
  const titleText = (data?.title as string) || "Made for real bathrooms.\nAnd real bodies.";
  const titleLines = titleText.split('\n');
  const mediaSrc = (data?.imagePaths as string[])?.[0] || '/video/4.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='w-full h-screen relative overflow-hidden'>
      <div className='absolute inset-0 w-full h-full overflow-hidden bg-gray-100'>
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster='/home/banner.png'
            className='absolute inset-0 w-full h-full object-cover'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaSrc}
            alt="About Banner"
            fill
            className='absolute inset-0 w-full h-full object-cover'
            priority
          />
        )}

        <div className='absolute inset-0 ' />
      </div>

      <div className='relative z-10 h-full flex items-end justify-start text-start mx-5 md:mx-11.5 py-15'>
        <p className='font-heading text-[40px] md:text-[70px] lg:text-[120px] font-bold w-full text-white drop-shadow-md'>
          {titleLines.map((line: string, index: number) => (
            <span key={index}>
              {line}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
