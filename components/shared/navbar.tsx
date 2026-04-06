"use client";

import CartDrawer from "@/components/shared/cart/cart-drawer";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full ${
          isHome
            ? ""
            : isShop
              ? "bg-transparent"
              : "border-b border-black/10 bg-white/90 backdrop-blur"
        }`}>
        <nav
          className={`mx-5 md:mx-11.5 grid items-center py-4 ${
            isShop ? "grid-cols-2" : "grid-cols-3"
          } ${
            isHome ? "text-white" : "text-(--text-primary)"
          }`}>
          <button
            className={`justify-self-start text-3xl font-medium transition-colors ${
              isHome
                ? "text-white/90 hover:text-white"
                : "text-(--text-primary)"
            }`}>
            Menu
          </button>

          {!isShop ? (
            <span className='justify-self-center font-heading text-2xl leading-none'>
              Zilky Wipes
            </span>
          ) : null}

          {isShop ? (
            <div className='justify-self-end flex items-center gap-5 text-xl text-(--text-primary)'>
              <button
                aria-label='Search'
                className='inline-flex items-center justify-center text-(--text-primary) transition-colors'>
                <Search className='h-4 w-4' />
              </button>
              <button
                type='button'
                onClick={() => setIsCartOpen(true)}
                className='font-medium text-(--text-primary) transition-colors'>
                Cart (01)
              </button>
            </div>
          ) : (
            <button
              className={`justify-self-end text-sm font-medium uppercase tracking-[0.3em] transition-colors ${
                isHome
                  ? "text-white/90 hover:text-white"
                  : "text-(--text-primary)/80 hover:text-(--text-primary)"
              }`}>
              Shop
            </button>
          )}
        </nav>
      </header>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
