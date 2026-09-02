import Image from "next/image";
import { isVideo, getMediaUrl } from "@/lib/utils";

type ShopVideoSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function ShopVideoSection({
  imageSrc,
  imageAlt = "Shop section media",
}: ShopVideoSectionProps) {
  const mediaSrc = getMediaUrl(imageSrc || '/video/4.mp4');
  const renderVideo = isVideo(mediaSrc);


  return (
    <section className='relative w-full h-[30vh] sm:h-[45vh] md:h-[60vh] lg:h-[75vh] xl:h-svh min-h-55 sm:min-h-80 md:min-h-115 lg:min-h-145 xl:min-h-175 overflow-hidden bg-[#1D3A5F]'>
      {renderVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          className='w-full h-full object-cover object-center'>
          <source src={mediaSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className='relative w-full h-full'>
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

