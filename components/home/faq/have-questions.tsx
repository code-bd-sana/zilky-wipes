import PageTitle from "@/components/shared/page-title/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HaveQuestions({ data }: { data?: Record<string, unknown> }) {
  const title = (data?.title as string) || 'Still have questions?';
  const subtitle = (data?.subtitle as string) || 'Our support team is here to help Monday–Friday, 9am–5pm EST';

  return (
    <section className='max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20'>
      <div className='bg-[#FBFAF9] border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center shadow-2xs'>
        <PageTitle
          align='center'
          title={title}
          titleClassName='text-xl sm:text-2xl md:text-3xl font-bold text-(--text-primary)'
          subtitle={[subtitle]}
          subtitleClassName='text-xs sm:text-sm md:text-base text-(--text-secondary) mt-2 max-w-md mx-auto'
        />
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6'>
          <a href='mailto:support@zilkywipes.com' className='w-full sm:w-auto'>
            <Button className='w-full sm:w-auto bg-(--text-primary) text-white hover:bg-[#142e50] px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xs'>
              Email Us
            </Button>
          </a>
          <Link href='/about' className='w-full sm:w-auto'>
            <Button className='w-full sm:w-auto bg-white text-(--text-primary) hover:bg-black/5 border border-gray-200 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xs'>
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

