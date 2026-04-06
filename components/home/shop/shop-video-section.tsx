import Image from "next/image";

type ShopVideoSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function ShopVideoSection({
  imageSrc,
  imageAlt = "Shop section media",
}: ShopVideoSectionProps) {
  return (
    <section className='h-[30vh] md:h-screen w-full overflow-hidden'>
      {imageSrc ? (
        <div className='relative h-[30vh] md:h-full w-full'>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes='100vw'
            className='object-cover object-center'
          />
        </div>
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className='h-[30vh] md:h-full w-full object-cover object-center'>
          <source src='/home/shop/shop1.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}
    </section>
  );
}
