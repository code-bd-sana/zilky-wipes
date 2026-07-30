import Image from "next/image";
import { isVideo } from "@/lib/utils";

type ShopVideoSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function ShopVideoSection({
  imageSrc,
  imageAlt = "Shop section media",
}: ShopVideoSectionProps) {
  const mediaSrc = imageSrc || '/video/4.mp4';
  const renderVideo = isVideo(mediaSrc);

  return (
    <section className='h-[30vh] md:h-screen w-full overflow-hidden'>
      {renderVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className='h-[30vh] md:h-full w-full object-cover object-center'>
          <source src={mediaSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className='relative h-[30vh] md:h-full w-full'>
          <Image
            src={mediaSrc}
            alt={imageAlt}
            fill
            sizes='100vw'
            className='object-cover object-center'
          />
        </div>
      )}
    </section>
  );
}
