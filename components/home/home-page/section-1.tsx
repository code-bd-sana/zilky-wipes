import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";

export default function Section1() {
  return (
    <section className='mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20 md:mt-40'>
      <div className='flex flex-col-reverse lg:flex-row justify-between gap-x-10 xl:gap-x-20 gap-y-12 md:gap-y-16 lg:gap-y-20 items-center'>
        <div className='w-full max-w-180 lg:max-w-170'>
          <PageTitle
            title='.....Because dry paper was never the answer!'
            titleClassName='max-w-250! text-[40px]! leading-[1.1]! md:text-[56px]!'
            subtitle={[
              "Water cleans. Dry paper spreads.",
              "ZilkyWipes leaves you genuinely clean — safely,",
              "gently, responsibly.",
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
        <div className='w-full max-w-170 lg:max-w-180'>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster='/home/banner.png'
            className='w-full h-auto aspect-37/45 rounded-[36px] sm:rounded-[72px] lg:rounded-[120px] object-cover'>
            <source src='/home/section1.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
