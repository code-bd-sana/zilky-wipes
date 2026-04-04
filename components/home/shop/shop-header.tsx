export default function ShopHeader() {
  return (
    <section className='bg-white'>
      <div className='mx-5 md:mx-11.5 min-h-44 pt-18 pb-5 md:min-h-52 md:pt-20 md:pb-7'>
        <div className='h-full flex flex-col justify-end gap-5 md:gap-6'>
          <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'>
            <h1 className='font-heading text-3xl md:text-5xl leading-[1.08] font-bold text-(--text-primary)'>
              One Time <span className='px-1 text-[#9aa6b8]'>/</span>
              <span className='text-[#8291a8]'> Subscription</span>
            </h1>

            <div className='flex flex-wrap items-center gap-2 md:justify-end'>
              <button className='rounded-full bg-(--text-primary) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1f3f71]'>
                Starter Kit
              </button>
              <button className='rounded-full border border-(--text-primary)/35 px-4 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-white/80'>
                Refill
              </button>
              <button className='rounded-full border border-(--text-primary)/35 px-4 py-2 text-sm font-medium text-(--text-primary) transition-colors hover:bg-white/80'>
                Bundles
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
