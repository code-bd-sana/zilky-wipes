import PageTitle from "@/components/shared/page-title/page-title";
import { Input } from "@base-ui/react";
import { Search } from "lucide-react";

export default function HelpTitle() {
  return (
    <section className='mt-30 mx-6'>
      <div className='my-8 pt-8'>
        <PageTitle
          align='center'
          title='Everything you need to know.'
          titleClassName='text-[#474747]! max-w-120! mx-auto!'
          subtitle={[
            "Find answers to common questions about your subscription",
          ]}
          subtitleClassName='text-[#979191]! text-base! mt-5'
        />
      </div>
      <div className='mx-auto flex w-full max-w-90 justify-center -mt-2'>
        <div className='relative w-full'>
          <div className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--text-primary)'>
            <Search color='#FFFFFF' size={24} />
          </div>
          <Input
            placeholder='Search for the answer you are looking for...'
            className='w-full rounded-full border border-(--text-primary) bg-(--text-primary) pl-12 pr-4 py-2 text-[#999999] focus:ring-2 focus:ring-[#FFFFFF7A] focus:ring-offset-2 focus:ring-offset---(--text-primary)'
          />
        </div>
      </div>
    </section>
  );
}
