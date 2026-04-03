import Image from "next/image";
import type { WipesProduct } from "@/components/home/wipes-data";

type ProductCardProps = Omit<WipesProduct, "id">;

export default function ProductCard({
  image,
  imageAlt = "Product image",
  subscribeLabel = "Subscribe & Save 15%",
  name,
  price,
  tags = [],
}: ProductCardProps) {
  return (
    <div className='flex w-full flex-col overflow-hidden'>
      <div className='relative flex h-140 items-center justify-center px-6 pb-4 pt-6 bg-[#FBFAF9] '>
        {subscribeLabel ? (
          <span className='absolute left-4 top-4 whitespace-nowrap rounded-[15px] border border-[#F2F2F2] bg-white px-3 py-1 text-base text-[#474747] '>
            {subscribeLabel}
          </span>
        ) : null}
        <div className='relative h-[88%] w-[88%]'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={100}
            sizes='(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 768px) 44vw, 90vw'
            className='object-contain drop-shadow-md'
            priority={false}
          />
        </div>
      </div>

      <div className='flex flex-col gap-2 px-4 pb-5 pt-1'>
        <div>
          <h3 className='text-2xl leading-snug text-(--text-primary)'>
            {name}
          </h3>
          <p className='mt-0.5 text-2xl text-(--text-primary)'>
            ${price.toFixed(2)}
          </p>
        </div>

        {tags.length > 0 ? (
          <div className='flex flex-wrap gap-1'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-(--text-primary) bg-transparent px-2.5 py-0.5 text-base font-medium text-(--text-primary)'>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
