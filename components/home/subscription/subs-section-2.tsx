import Image from "next/image";
import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";

export default function SubsSection2() {
  return (
    <section className='mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20 md:mt-45'>
      <div className='flex flex-col lg:flex-row justify-between gap-x-10 xl:gap-x-20 gap-y-12 md:gap-y-16 lg:gap-y-20 items-center'>
        {/* Left Content */}
        <div className='relative w-full max-w-170 lg:max-w-180 aspect-37/45 overflow-hidden rounded-[36px] sm:rounded-[72px] lg:rounded-[120px]'>
          <Image
            src='/home/subscription/subscription-2.png'
            alt='Subscription preview'
            fill
            priority
            quality={100}
            sizes='(min-width: 1536px) 720px, (min-width: 1024px) 45vw, 92vw'
            className='object-cover'
          />
        </div>

        {/* Right Content */}
        <div className='w-full max-w-180 lg:max-w-160'>
          <PageTitle
            title='Choose your rhythm.'
            titleClassName='max-w-180! mx-auto text-[40px]! leading-[1.1]! md:text-[56px]!'
            subtitle={[
              " Monthly delivery / Bi-monthly delivery",
              "You can change this anytime.",
            ]}
            subtitleClassName='mt-6 text-[18px]! sm:text-[20px]! md:mt-8 md:text-[24px]!'
          />
          <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8'>
            <Button className='w-full sm:w-auto bg-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
              Shop ZilkyWipes
            </Button>
            <Button className='w-full sm:w-auto bg-white border-2 border-(--text-primary) text-(--text-primary) px-6 md:px-8 py-5 md:py-6 text-lg md:text-xl rounded-full shadow-sm hover:bg-(--text-primary) hover:text-white hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
              Subscribe & Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
