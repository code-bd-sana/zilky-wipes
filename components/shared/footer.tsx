'use client';

import { getPage } from '@/lib/api/pages';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type AffiliateIconProps = {
  className?: string;
};

const FacebookIcon = ({ className }: AffiliateIconProps) => (
  <svg viewBox='0 0 24 24' aria-hidden='true' className={className} fill='currentColor'>
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
    strokeWidth='1.8'
  >
    <rect x='4' y='4' width='16' height='16' rx='4' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17' cy='7' r='1' fill='currentColor' stroke='none' />
  </svg>
);

const YoutubeIcon = ({ className }: AffiliateIconProps) => (
  <svg viewBox='0 0 24 24' aria-hidden='true' className={className} fill='currentColor'>
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
    strokeLinejoin='round'
  >
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
    strokeLinejoin='round'
  >
    <path d='M12 4.5c2.7 0 4.5 2 4.5 4.8 0 1.5.2 2.8 1.5 3.6.6.4 1.2.6 1.8.8-.5.6-1.1.9-1.8 1.2-.7.3-1 .6-1 1.2 0 .7.6 1.2 1.4 1.5.4.2.8.3 1.2.4-.9.9-1.9 1.2-3.1 1.4-.9.2-1.4.5-1.9 1.2-.4.5-.9.8-2 .8s-1.6-.3-2-.8c-.5-.7-1-1-1.9-1.2-1.2-.2-2.2-.5-3.1-1.4.4-.1.8-.2 1.2-.4.8-.3 1.4-.8 1.4-1.5 0-.6-.3-.9-1-1.2-.7-.3-1.3-.6-1.8-1.2.6-.2 1.2-.4 1.8-.8 1.3-.8 1.5-2.1 1.5-3.6 0-2.8 1.8-4.8 4.5-4.8Z' />
  </svg>
);

const defaultPagesLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Benefits', href: '/benefits' },
  { label: 'FAQ', href: '/faq' },
];

const defaultOtherLinks = [
  { label: 'Press & Media', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/career' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Return Policy', href: '/return' },
];

const defaultAffiliateItems = [
  { platform: 'Facebook', href: 'https://www.facebook.com/ZilkyWipes' },
  { platform: 'Instagram', href: 'https://www.instagram.com/ZilkyWipes' },
  { platform: 'Tiktok', href: 'https://www.tiktok.com/@ZilkyWipes' },
  { platform: 'Youtube', href: 'https://www.youtube.com/@ZilkyWipes' },
  { platform: 'Snapchat', href: 'https://www.snapchat.com/add/ZilkyWipes' },
];

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return FacebookIcon;
    case 'instagram':
      return InstagramIcon;
    case 'tiktok':
      return TiktokIcon;
    case 'youtube':
      return YoutubeIcon;
    case 'snapchat':
      return SnapchatIcon;
    default:
      return FacebookIcon; // fallback
  }
};

const Footer = () => {
  const { data: pageData } = useQuery({
    queryKey: ['page', 'footer'],
    queryFn: () => getPage('footer'),
  });

  const getContent = (key: string) =>
    pageData?.sections?.find(
      (s: { sectionKey: string; content: Record<string, unknown> }) => s.sectionKey === key,
    )?.content;

  const companyText =
    getContent('company_info')?.text ||
    'ZilkyWipes was created for everyday hygiene, done better. We make flushable, biodegradable wet wipes on a roll — designed to replace dry paper with something gentler, cleaner, and more considered.';
  const pagesLinks = getContent('links_pages')?.links || defaultPagesLinks;
  const otherLinks = getContent('links_others')?.links || defaultOtherLinks;
  const affiliateItems = getContent('links_social')?.links || defaultAffiliateItems;
  const contactInfo = getContent('contact_info') || {
    email: 'contact@company.com',
    phone: '(414) 687 - 5892',
    address: '794 Mcallister St, San Francisco, 94102',
  };
  const subscription = getContent('subscription') || {
    title: 'Get Notified',
    buttonText: 'Subscribe',
  };
  const copyrightText = getContent('copyright')?.text || 'All rights reserved by: ZilkyWipes© 2025';

  return (
    <footer className='w-full pt-10 sm:pt-12 md:pt-14 pb-8 bg-(--text-primary)'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12.5'>
        {/* GRID */}
        <div
          className='
            grid
            grid-cols-1
            gap-10
            md:grid-cols-12
            md:gap-12
            lg:gap-16
          '
        >
          {/* Branding */}
          <div className='md:col-span-12 lg:col-span-4 flex flex-col gap-y-4 sm:gap-y-6'>
            <Link href='/' className='inline-block'>
              <Image
                src='/Logo/logo-white.png'
                alt='ZilkyWipes'
                width={190}
                height={52}
                priority
                className='h-8 sm:h-10 md:h-12 w-auto object-contain mb-2'
              />
            </Link>
            <div>
              <p className='text-white/90 text-sm sm:text-base leading-relaxed max-w-lg'>{companyText}</p>
            </div>
            {/* links */}
            <div className='mt-2 flex flex-wrap gap-3 sm:gap-4'>
              {affiliateItems.map((item: { platform: string; href: string }) => {
                const Icon = getSocialIcon(item.platform);
                const ensureAbsoluteUrl = (url: string) => {
                  if (!url) return '#';
                  if (url.startsWith('http://') || url.startsWith('https://')) return url;
                  return `https://${url}`;
                };
                return (
                  <a
                    key={item.href}
                    href={ensureAbsoluteUrl(item.href)}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={item.platform}
                    className='inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300'
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div
            className='md:col-span-7 lg:col-span-5 grid
            grid-cols-2
            sm:grid-cols-3
            gap-8
            sm:gap-6
            md:gap-8'
          >
            {/* Pages */}
            <div>
              <p className='text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-heading tracking-wide'>
                Pages
              </p>

              <ul className='flex flex-col gap-2 text-white/90'>
                {pagesLinks.map((item: { href: string; label: string }) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className='text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base'
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Others */}
            <div>
              <p className='text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-heading tracking-wide'>
                Others
              </p>

              <ul className='flex flex-col gap-2 text-white/90'>
                {otherLinks.map((item: { href: string; label: string }) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className='text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base'
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className='col-span-2 sm:col-span-1'>
              <p className='text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 font-heading tracking-wide'>
                Contact Us
              </p>

              <ul className='flex flex-col gap-3 text-white/90 text-sm sm:text-base'>
                {contactInfo.email && (
                  <li className='flex items-start gap-2.5'>
                    <Mail className='h-4 w-4 shrink-0 mt-1 text-white/70' />
                    <span className='leading-relaxed text-white/80 break-all'>
                      {contactInfo.email}
                    </span>
                  </li>
                )}
                {contactInfo.phone && (
                  <li className='flex items-start gap-2.5'>
                    <Phone className='h-4 w-4 shrink-0 mt-1 text-white/70' />
                    <span className='leading-relaxed text-white/80'>
                      {contactInfo.phone}
                    </span>
                  </li>
                )}
                {contactInfo.address && (
                  <li className='flex items-start gap-2.5'>
                    <MapPin className='h-4 w-4 shrink-0 mt-1 text-white/70' />
                    <span className='leading-relaxed text-white/80'>
                      {contactInfo.address}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* GET NOTIFIED */}
          <div className='md:col-span-5 lg:col-span-3 flex flex-col'>
            <p className='text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 font-heading tracking-wide'>
              {subscription.title}
            </p>
            <div className='relative w-full max-w-md'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-full bg-white text-(--text-primary) placeholder:text-(--text-secondary) h-12 sm:h-13 pl-4 sm:pl-5 pr-28 sm:pr-32 outline-none text-sm sm:text-base shadow-xs'
              />
              <button
                type='button'
                className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-(--text-primary) sm:bg-transparent text-white sm:text-(--text-primary) h-10 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold transition-all duration-300 hover:opacity-90'
              >
                {subscription.buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className='w-full h-px bg-white/15 my-6 sm:my-8' />

        <div className='text-start text-xs sm:text-sm text-white/70'>
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
