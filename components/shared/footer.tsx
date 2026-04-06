"use client";

import type { MouseEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import PageTitle from "./page-title/page-title";

const pagesLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

const linkLinks = [
  {
    label: "Facebook",
    id: "facebook",
  },
  {
    label: "Instagram",
    id: "instagram",
  },
  { label: "Tiktok", id: "tiktok" },
  { label: "Youtube", id: "youtube" },
  { label: "Snapchat", id: "snapchat" },
];

const affiliateItems = [
  {
    label: "Facebook",
    href: "facebook",
  },
  {
    label: "Instagram",
    href: "instagram",
  },
  { label: "Tiktok", href: "tiktok" },
  { label: "Youtube", href: "youtube" },
  { label: "Snapchat", href: "snapchat" },
];

const otherItems = [
  {
    label: "Press & Media",
    href: "/press",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    label: "Return Policy",
    href: "/return",
  },
];

const Footer = () => {
  // Function to handle service click
  const handleServiceClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Update URL hash
    window.history.pushState(null, "", `#${id}`);

    // Dispatch a custom event that ServicesWeHost can listen to
    window.dispatchEvent(
      new CustomEvent("service-scroll", {
        detail: { id },
      }),
    );

    // Scroll to the element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <footer className='w-full pt-12 pb-8 bg-(--text-primary)'>
      <div className='mx-5 md:mx-12'>
        <div className='mb-8'>
          <PageTitle
            align='start'
            title='Running out shouldn’t be part of your mental load.'
            titleClassName='text-white!'
            subtitle={[
              "With Subscribe & Save, ZilkyWipes arrives on your schedule — monthly or bi-monthly — with preferred pricing.",
            ]}
            subtitleClassName='mt-2 px-2 text-[24px]! text-white!'
          />
          <div className='flex flex-col md:flex-row justify-start gap-x-6 mt-8'>
            <button
              type='button'
              className='bg-white px-8 py-6 text-xl rounded-full text-(--text-primary) shadow-sm hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-(--text-primary)/40 transition-all duration-300 cursor-pointer'>
              Shop ZilkyWipes
            </button>
            <button
              type='button'
              className='bg-transparent border-2 border-white text-white px-8 py-6 text-xl rounded-full shadow-sm hover:bg-white hover:text-(--text-primary) hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-300'>
              Subscribe & Save
            </button>
          </div>
        </div>

        {/* GRID */}
        <div
          className='
            grid
            grid-cols-1
            gap-12
            sm:grid-cols-2
            lg:grid-cols-5
            lg:gap-20
          '>
          {/* Pages */}
          <div>
            <h4 className='text-[32px] font-semibold text-white mb-4 font-heading'>
              Pages
            </h4>

            <ul className='flex flex-col gap-2.5 text-[24px] text-white'>
              {pagesLinks.map((item) => (
                <li key={item.href} className='-mt-1'>
                  <Link
                    href={item.href}
                    className='text-white hover:text-white/90 transition-colors duration-300'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className='text-[32px] font-semibold text-white mb-4 font-heading'>
              Links
            </h4>

            <ul className='flex flex-col gap-2.5 text-[24px] text-white md:max-w-55'>
              {linkLinks.map((item) => (
                <li key={item.id} className='-mt-1'>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleServiceClick(e, item.id)}
                    className='text-white hover:text-white/90 transition-colors duration-300'>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* AFFILIATE */}
          <div>
            <h4 className='text-[32px] font-semibold text-white mb-4 font-heading'>
              Affiliates
            </h4>

            <ul className='flex flex-col gap-3 text-[24px] text-white'>
              {affiliateItems.map((item) => {
                return (
                  <li
                    key={item.label}
                    className='flex items-start gap-2.5 -mt-1'>
                    {item.href ? (
                      <a
                        href={item.href}
                        className='text-white hover:text-white/90 transition-colors duration-300'>
                        {item.label}
                      </a>
                    ) : (
                      <span className='leading-[1.6] text-white max-w-63'>
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* OTHERS */}
          <div>
            <h4 className='text-[32px] font-semibold text-white mb-4 font-heading'>
              Others
            </h4>

            <ul className='flex flex-col gap-3 text-[24px] text-white'>
              {otherItems.map((item) => {
                return (
                  <li
                    key={item.label}
                    className='flex items-start gap-2.5 -mt-1'>
                    {item.href ? (
                      <a
                        href={item.href}
                        className='text-white hover:text-white/90 transition-colors duration-300'>
                        {item.label}
                      </a>
                    ) : (
                      <span className='leading-[1.6] text-white max-w-63'>
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* GET NOTIFIED */}
          <div>
            <h4 className='text-[32px] font-semibold text-white mb-4'>
              Get Notified
            </h4>
            <div className='relative max-w-full'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-full bg-white text-(--text-primary) placeholder:text-(--text-secondary) h-14 pl-5 pr-34 outline-none'
              />
              <button
                type='button'
                className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-(--text-primary) h-12 px-5 text-sm font-semibold transition-colors duration-300'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className='w-full h-px bg-gray-100 my-10' />
        {/* BOTTOM */}
        <p className='text-[22px] text-white'>
          ZilkyWipes was created for everyday hygiene, done better. We make
          flushable, biodegradable wet wipes on a roll — designed to replace dry
          paper with something gentler, cleaner, and more considered. No harsh
          ingredients. No unnecessary plastic. Just a simple upgrade to a
          routine you already trust with your body. Thoughtfully made, easy to
          use, and designed to belong naturally in real bathrooms. ZilkyWipes
          isn’t about changing habits — it’s about finally improving them.
        </p>

        {/* DIVIDER */}
        <div className='w-full h-px bg-gray-100 my-10' />

        <div className='text-start text-[14px] font-interFont'>
          <p className=' text-white text-base'>
            All rights reserved by: ZilkyWipes© 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
