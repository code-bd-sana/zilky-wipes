"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

type AffiliateIconProps = {
  className?: string;
};

const FacebookIcon = ({ className }: AffiliateIconProps) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='currentColor'>
    <path d='M13.5 22v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.6-1.5h1.7V4a24 24 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.1v8h3.4Z' />
  </svg>
);

const InstagramIcon = ({ className }: AffiliateIconProps) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'>
    <rect x='4' y='4' width='16' height='16' rx='4' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17' cy='7' r='1' fill='currentColor' stroke='none' />
  </svg>
);

const YoutubeIcon = ({ className }: AffiliateIconProps) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='currentColor'>
    <path d='M21.6 7.5a2.6 2.6 0 0 0-1.8-1.8C18.2 5.2 12 5.2 12 5.2s-6.2 0-7.8.5a2.6 2.6 0 0 0-1.8 1.8A27 27 0 0 0 2 12a27 27 0 0 0 .4 4.5 2.6 2.6 0 0 0 1.8 1.8c1.6.5 7.8.5 7.8.5s6.2 0 7.8-.5a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.5Zm-10.3 7.3V9.2L16 12l-4.7 2.8Z' />
  </svg>
);

const TiktokIcon = ({ className }: AffiliateIconProps) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M14 4v9.1a4 4 0 1 1-4-4' />
    <path d='M14 4c.8 2.3 2.7 3.9 5 4.3' />
  </svg>
);

const SnapchatIcon = ({ className }: AffiliateIconProps) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='none'
    stroke='currentColor'
    strokeWidth='1.8'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <path d='M12 4.5c2.7 0 4.5 2 4.5 4.8 0 1.5.2 2.8 1.5 3.6.6.4 1.2.6 1.8.8-.5.6-1.1.9-1.8 1.2-.7.3-1 .6-1 1.2 0 .7.6 1.2 1.4 1.5.4.2.8.3 1.2.4-.9.9-1.9 1.2-3.1 1.4-.9.2-1.4.5-1.9 1.2-.4.5-.9.8-2 .8s-1.6-.3-2-.8c-.5-.7-1-1-1.9-1.2-1.2-.2-2.2-.5-3.1-1.4.4-.1.8-.2 1.2-.4.8-.3 1.4-.8 1.4-1.5 0-.6-.3-.9-1-1.2-.7-.3-1.3-.6-1.8-1.2.6-.2 1.2-.4 1.8-.8 1.3-.8 1.5-2.1 1.5-3.6 0-2.8 1.8-4.8 4.5-4.8Z' />
  </svg>
);

const pagesLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "FAQ", href: "/faq" },
];

const otherLinks = [
  {
    label: "Press & Media",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  { label: "Careers", href: "/career" },
  { label: "Terms & Conditaions", href: "/terms" },
  { label: "Return Policy", href: "/return" },
];

const affiliateItems = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/ZilkyWipes",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/ZilkyWipes",
  },
  {
    icon: TiktokIcon,
    label: "Tiktok",
    href: "https://www.tiktok.com/@ZilkyWipes",
  },
  {
    icon: YoutubeIcon,
    label: "Youtube",
    href: "https://www.youtube.com/@ZilkyWipes",
  },
  {
    icon: SnapchatIcon,
    label: "Snapchat",
    href: "https://www.snapchat.com/add/ZilkyWipes",
  },
];

const contactItems = [
  {
    icon: Mail,
    label: "contact@company.com",
  },
  {
    icon: Phone,
    label: "(414) 687 - 5892",
  },
  {
    icon: MapPin,
    label: "794 Mcallister St, San Francisco, 94102",
  },
];

const Footer = () => {
  // // Function to handle service click
  // const handleServiceClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  //   e.preventDefault();

  //   // Update URL hash
  //   window.history.pushState(null, "", `#${id}`);

  //   // Dispatch a custom event that ServicesWeHost can listen to
  //   window.dispatchEvent(
  //     new CustomEvent("service-scroll", {
  //       detail: { id },
  //     }),
  //   );

  //   // Scroll to the element
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // };

  return (
    <footer className='w-full pt-12 pb-8 bg-(--text-primary)'>
      <div className='max-w-480 mx-auto px-6 md:px-12.5'>
        {/* GRID */}
        <div
          className='
            grid
            grid-cols-1
            gap-12
            md:grid-cols-12
            md:gap-20
          '>
          {/* Branding */}
          <div className='lg:col-span-3 flex flex-col gap-y-6'>
            <Link href='/' className='inline-block'>
              <Image
                src='/Logo/logo-white.png'
                alt='ZilkyWipes'
                width={190}
                height={52}
                priority
                className='h-12 md:h-16 lg:h-22 w-auto object-contain mb-4'
              />
            </Link>
            <div>
              <p className='text-white'>
                ZilkyWipes was created for everyday hygiene, done better. We
                make flushable, biodegradable wet wipes on a roll — designed to
                replace dry paper with something gentler, cleaner, and more
                considered.{" "}
              </p>
            </div>
            {/* links */}
            <div className='mt-4 flex flex-wrap gap-4'>
              {affiliateItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className='inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors duration-300'>
                    <Icon className='h-8 w-8 shrink-0 border rounded-full p-1' />
                  </a>
                );
              })}
            </div>
          </div>
          {/* Links */}
          <div
            className='lg:col-span-6 grid
            grid-cols-2
            gap-12
            md:grid-cols-3
            md:gap-20'>
            {/* Pages */}
            <div>
              <h4 className='text-2xl lg:text-3xl font-semibold text-white mb-10 font-heading'>
                Pages
              </h4>

              <ul className='flex flex-col gap-2.5 text-xl text-white'>
                {pagesLinks.map((item) => (
                  <li key={item.href} className='-mt-1'>
                    <Link
                      href={item.href}
                      className='text-white hover:text-white/90 transition-colors duration-300 text-base lg:text-xl'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Others */}
            <div>
              <h4 className='text-2xl lg:text-3xl font-semibold text-white mb-10 font-heading'>
                Others
              </h4>

              <ul className='flex flex-col gap-2.5 text-xl text-white md:max-w-55'>
                {otherLinks.map((item) => (
                  <li key={item.href} className='-mt-1'>
                    <a
                      href={item.href}
                      className='text-white hover:text-white/90 transition-colors duration-300 text-base lg:text-xl'>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className='text-2xl lg:text-3xl font-semibold text-white mb-10 font-heading'>
                Contact Us
              </h4>

              <ul className='flex flex-col gap-3 text-xl text-white'>
                {contactItems.map((item) => {
                  return (
                    <li
                      key={item.label}
                      className='flex items-start gap-2.5 -mt-1'>
                      <item.icon className='h-8 w-8 shrink-0 p-1' />
                      <span className='leading-[1.6] text-white max-w-63 text-base lg:text-xl'>
                        {item.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* GET NOTIFIED */}
          <div className='lg:col-span-3'>
            <h4 className='text-2xl lg:text-3xl font-semibold text-white mb-4 font-heading'>
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
        <div className='w-full h-px bg-[#FFFFFF7A] my-8 mt-10' />

        <div className='text-start text-[14px] font-interFont mt-4'>
          <p className=' text-white text-base'>
            All rights reserved by: ZilkyWipes© 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
