import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";

export default function HaveQuestions() {
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 py-20'>
      <div className='bg-[#FBFAF9] border border-[#F2F2F2] rounded-[10px] py-8'>
        <div className=''>
          <PageTitle
            align='center'
            title='Still have questions?'
            titleClassName='text-[#474747]! text-3xl! font-bold!'
            subtitle={[
              "Our support team is here to help Monday–Friday, 9am–5pm EST",
            ]}
            subtitleClassName='text-[#979191]! text-base! mt-3'
          />
        </div>
        <div className='flex items-center justify-center mt-3'>
          <div className='flex space-x-4 pt-2'>
            <Button className='bg-[#FFFFFF] text-[#474747] hover:bg-[#f3e9e9] border border-[#E5E5E5] px-6 py-1.5 rounded-lg text-sm'>
              Email Us
            </Button>
            <Button className='bg-[#FFFFFF] text-[#474747] hover:bg-[#f3e9e9] border border-[#E5E5E5] px-6 py-1.5 rounded-lg text-sm'>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
