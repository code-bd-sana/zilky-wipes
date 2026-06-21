import Image from "next/image";
import { isVideo } from "@/lib/utils";

export default function FooterVideo({ data }: { data?: any }) {
  const mediaSrc = data?.imagePaths?.[0] || '/video/2.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='bg-(--text-primary) relative'>
      <div className='w-full h-full min-h-75'>
        {renderVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-auto object-cover'>
            <source src={mediaSrc} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image 
            src={mediaSrc} 
            alt="Footer Media" 
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
          />
        )}
      </div>
    </section>
  );
}
