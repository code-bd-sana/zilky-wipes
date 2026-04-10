"use client";

import CartDrawer from "@/components/shared/cart/cart-drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/shop" },
  { label: "Subscription", href: "/subscription" },
  { label: "Benefits", href: "/benefits" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
] as const;

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isShopPage = pathname === "/shop";
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-colors ${
          scrolled || isMobileMenuOpen
            ? "border-b border-black/10 bg-white/50 backdrop-blur"
            : "bg-transparent"
        }`}
        style={{ height: "var(--navbar-height)" }}>
        <nav className='h-full px-4 md:px-6 lg:px-12.5 pt-4 md:pt-6 lg:pt-8'>
          <div className='flex items-center justify-between gap-4'>
            <button
              type='button'
              aria-label='Toggle navigation menu'
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className='inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#1D3A5F]'>
              {isMobileMenuOpen ? (
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M18 6L6 18' />
                  <path d='M6 6L18 18' />
                </svg>
              ) : (
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M3 6h18' />
                  <path d='M3 12h18' />
                  <path d='M3 18h18' />
                </svg>
              )}
            </button>

            <div className='hidden lg:flex items-center gap-10.75'>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-lg lg:text-2xl leading-none text-[#1D3A5F] transition-opacity hover:opacity-80 ${
                    isActiveLink(item.href)
                      ? "font-bold underline decoration-2 underline-offset-8"
                      : "font-medium"
                  }`}>
                  {item.label}
                </Link>
              ))}
            </div>

            {isShopPage ? (
              <button
                type='button'
                onClick={() => setIsCartOpen(true)}
                className='text-sm md:text-base lg:text-xl font-medium leading-none text-(--text-primary) transition-colors'>
                Cart
              </button>
            ) : (
              <Link
                href='/shop'
                className='text-sm md:text-base lg:text-xl font-medium leading-none rounded-full bg-white px-4 md:px-5 lg:px-6 py-2.5 md:py-3 lg:py-4 text-[#1D3A5F] transition-opacity hover:opacity-90'>
                Shop ZilkyWipes
              </Link>
            )}
          </div>

          {isMobileMenuOpen ? (
            <div className='mt-3 lg:hidden rounded-2xl border border-black/10 bg-white/95 p-3 shadow-sm backdrop-blur'>
              <div className='flex flex-col'>
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-xl px-3 py-2 text-base text-[#1D3A5F] transition-colors hover:bg-black/5 ${
                      isActiveLink(item.href)
                        ? "font-bold underline decoration-2 underline-offset-4"
                        : "font-medium"
                    }`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </nav>
      </header>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
