"use client";

import CartDrawer from "@/components/shared/cart/cart-drawer";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;
  const pathname = usePathname();
  const isShopPage = pathname === "/shop";
  const easing = [0.22, 1, 0.36, 1] as const;

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.82,
        ease: easing,
      },
    },
  };

  const navListVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.18,
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.54,
        ease: easing,
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.56,
        delay: 0.44,
        ease: easing,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.24,
        ease: easing,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.36,
        ease: easing,
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      y: -8,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: easing,
      },
    },
  };

  const headerMotionProps = shouldAnimate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: headerVariants,
      }
    : {
        initial: false as const,
      };

  const navListMotionProps = shouldAnimate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: navListVariants,
      }
    : {};

  const ctaMotionProps = shouldAnimate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants: ctaVariants,
      }
    : {};

  const mobileMenuMotionProps = shouldAnimate
    ? {
        initial: "closed" as const,
        animate: "open" as const,
        exit: "closed" as const,
        variants: mobileMenuVariants,
      }
    : {};
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
      <motion.header
        {...headerMotionProps}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || isMobileMenuOpen
            ? "border-b border-black/10 bg-white/50 backdrop-blur"
            : "bg-transparent"
        }`}
        style={{ height: "var(--navbar-height)" }}>
        <nav className='h-full px-4 md:px-6 lg:px-12.5 pt-4 md:pt-6 lg:pt-8'>
          <div className='grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-6'>
            <motion.div
              variants={shouldAnimate ? navItemVariants : undefined}
              initial={shouldAnimate ? "hidden" : false}
              animate={shouldAnimate ? "visible" : undefined}
              className='flex items-center'>
              <Link href='/' aria-label='ZilkyWipes home'>
                <Image
                  src='/Logo/Logo-02.svg'
                  alt='ZilkyWipes'
                  width={190}
                  height={52}
                  priority
                  className='h-8 md:h-9 lg:h-12 w-auto object-contain'
                />
              </Link>
            </motion.div>

            <motion.div
              {...navListMotionProps}
              className='hidden lg:flex items-center justify-center gap-10.75'>
              {navLinks.map((item) => (
                <motion.span
                  key={item.label}
                  variants={shouldAnimate ? navItemVariants : undefined}
                  className='inline-flex'>
                  <Link
                    href={item.href}
                    className={`text-lg lg:text-2xl leading-none text-[#1D3A5F] transition-opacity hover:opacity-80 ${
                      isActiveLink(item.href)
                        ? "font-medium underline decoration-2 underline-offset-8"
                        : "font-normal"
                    }`}>
                    {item.label}
                  </Link>
                </motion.span>
              ))}
            </motion.div>

            <div className='flex items-center justify-end gap-2 md:gap-3'>
              {isShopPage ? (
                <motion.div {...ctaMotionProps}>
                  <button
                    type='button'
                    onClick={() => setIsCartOpen(true)}
                    className='text-sm md:text-base lg:text-xl font-medium leading-none text-(--text-primary) transition-colors'>
                    Cart
                  </button>
                </motion.div>
              ) : (
                <motion.div {...ctaMotionProps}>
                  <Link
                    href='/shop'
                    className='text-xs sm:text-sm md:text-base lg:text-xl font-medium leading-none rounded-full bg-white px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-4 text-[#1D3A5F] transition-opacity hover:opacity-90'>
                    Shop ZilkyWipes
                  </Link>
                </motion.div>
              )}

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
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMobileMenuOpen ? (
              <motion.div
                {...mobileMenuMotionProps}
                className='mt-3 lg:hidden rounded-2xl border border-black/10 bg-white/95 p-3 shadow-sm backdrop-blur'>
                <div className='flex flex-col'>
                  {navLinks.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={shouldAnimate ? mobileItemVariants : undefined}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`rounded-xl px-3 py-2 text-base text-[#1D3A5F] transition-colors hover:bg-black/5 ${
                          isActiveLink(item.href)
                            ? "font-bold underline decoration-2 underline-offset-4"
                            : "font-medium"
                        }`}>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </motion.header>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
