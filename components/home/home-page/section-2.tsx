import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";

export default function Section2() {
  return (
    <section className='mx-5 md:mx-10 lg:mx-20 xl:mx-40 mt-20 md:mt-50'>
      <div className='flex flex-col lg:flex-row justify-between gap-x-10 gap-y-20 items-center'>
        <div className='w-full max-w-180'>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster='home/banner.png'
            className='w-full h-auto aspect-37/45 rounded-[40px] sm:rounded-[72px] lg:rounded-[120px] object-cover'>
            <source src='home/section2.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <PageTitle
            title='Made for real bathrooms. And real bodies.'
            titleClassName='max-w-250!'
            subtitle={[
              "Everyday moments. Private spaces.",
              "ZilkyWipes, exactly where it belongs.",
            ]}
            subtitleClassName='mt-8 text-[24px]!'
          />
          <div className='flex flex-col md:flex-row justify-center gap-x-6 mt-8'>
            <Button className='bg-(--text-primary) px-8 py-6 text-xl rounded-full text-white shadow-sm hover:bg-[#142e50] hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
              Shop ZilkyWipes
            </Button>
            <Button className='bg-white border-2 border-(--text-primary) text-(--text-primary) px-8 py-6 text-xl rounded-full shadow-sm hover:bg-(--text-primary) hover:text-white hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300'>
              Subscribe & Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
