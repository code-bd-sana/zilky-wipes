"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full ${
        isHome ? "" : "border-b border-black/10 bg-white/90 backdrop-blur"
      }`}>
      <nav
        className={`mx-5 md:mx-11.5 grid grid-cols-3 items-center py-4 ${
          isHome ? "text-white" : "text-(--text-primary)"
        }`}>
        <button
          className={`justify-self-start text-sm font-medium uppercase tracking-[0.3em] transition-colors ${
            isHome
              ? "text-white/90 hover:text-white"
              : "text-(--text-primary)/80 hover:text-(--text-primary)"
          }`}>
          Menu
        </button>

        <span className='justify-self-center font-heading text-2xl leading-none'>
          Zilky Wipes
        </span>

        <button
          className={`justify-self-end text-sm font-medium uppercase tracking-[0.3em] transition-colors ${
            isHome
              ? "text-white/90 hover:text-white"
              : "text-(--text-primary)/80 hover:text-(--text-primary)"
          }`}>
          Shop
        </button>
      </nav>
    </header>
  );
}
