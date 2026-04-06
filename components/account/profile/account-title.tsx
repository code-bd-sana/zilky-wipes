import PageTitle from "@/components/shared/page-title/page-title";

export default function AccountTitle() {
  return (
    <section className='mt-30 mx-6'>
      <div className='flex justify-center'>
        <button
          type='button'
          className='text-(--text-primary) text-center border border-(--text-primary) rounded-full px-3 py-2'>
          <ul className='flex items-center gap-2'>
            <li
              aria-hidden='true'
              className='list-none h-2 w-2 rounded-full bg-(--text-primary)'
            />
            <li className='list-none text-sm'>Active subscription</li>
          </ul>
        </button>
      </div>
      <div className='my-8'>
        <PageTitle
          align='center'
          title='Your next delivery is scheduled for March 15'
          titleClassName='text-[#474747]!'
          subtitle={["You're set for the next 6 weeks"]}
          subtitleClassName='text-[#474747]! text-base! mt-6'
        />
      </div>
    </section>
  );
}
