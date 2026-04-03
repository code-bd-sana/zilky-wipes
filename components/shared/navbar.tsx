export default function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 w-full'>
      <nav className='mx-5 md:mx-11.5 grid grid-cols-3 items-center py-4 text-white'>
        <button className='justify-self-start text-sm font-medium uppercase tracking-[0.3em] text-white/90 transition-colors hover:text-white'>
          Menu
        </button>

        <span className='justify-self-center font-heading text-2xl leading-none text-white'>
          Zilky Wipes
        </span>

        <button className='justify-self-end text-sm font-medium uppercase tracking-[0.3em] text-white/90 transition-colors hover:text-white'>
          Shop
        </button>
      </nav>
    </header>
  );
}
