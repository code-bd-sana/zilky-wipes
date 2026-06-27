'use client';

import { cn } from '@/lib/utils';
import {
  Bell,
  CircleHelp,
  Grid2X2,
  Info,
  Layers,
  Menu,
  MessageSquareText,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

type CrmNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
};

const crmNavItems: CrmNavItem[] = [
  {
    id: 'homepage',
    label: 'Homepage',
    icon: Layers,
    href: '/dashboard/crm',
  },
  {
    id: 'product',
    label: 'Product',
    icon: Grid2X2,
    href: '/dashboard/crm/product',
  },
  {
    id: 'push-subscription',
    label: 'Push for subscription modal',
    icon: Bell,
    href: '/dashboard/crm/pushSubscription',
  },
  {
    id: 'feedback',
    label: 'Feedback modal',
    icon: MessageSquareText,
    href: '/dashboard/crm/feedback',
  },
  {
    id: 'cancelation',
    label: 'Cancelation modal',
    icon: X,
    href: '/dashboard/crm/cancelation',
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: CircleHelp,
    href: '/dashboard/crm/faq',
  },
  { id: 'subscription', label: 'Subscription', icon: Users, href: '/dashboard/crm/subscription' },
  { id: 'benefits', label: 'Benifits', icon: Sparkles, href: '/dashboard/crm/benefits' },
  { id: 'about', label: 'About', icon: Info, href: '/dashboard/crm/about' },
  {
    id: 'help',
    label: 'Help',
    icon: CircleHelp,
    href: '/dashboard/crm/help',
  },
  {
    id: 'feedback-page',
    label: 'Feedback Page',
    icon: MessageSquareText,
    href: '/dashboard/crm/feedback-page',
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: Info,
    href: '/dashboard/crm/footer',
  },
];

type CrmNavbarProps = {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
};

export default function CrmNavbar({ onToggleMobileSidebar, isMobileSidebarOpen }: CrmNavbarProps) {
  const pathname = usePathname();
  const [activeItemId, setActiveItemId] = useState('homepage');

  const scrollRef = useRef<HTMLElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false); // Reset dragging state on click down
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    
    // If the mouse has moved more than 5px, we consider it a deliberate drag
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isDragging) {
      // Prevent the click from registering as a link navigation if we just finished a drag
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  };

  const routedActiveId = crmNavItems.find((item) => item.href === pathname)?.id;
  const resolvedActiveItemId = routedActiveId ?? activeItemId;

  return (
    <header className='mt-1 border-b border-[#dedede] bg-white px-4 py-3 md:px-8'>
      <div className='flex min-w-0 items-center gap-2 text-[#2c2c2c]'>
        <div className='flex min-w-0 w-full items-center gap-2'>
          <button
            type='button'
            aria-label={isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={onToggleMobileSidebar}
            className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] xl:hidden'
          >
            {isMobileSidebarOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
          </button>

          <nav
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleClickCapture}
            className={`min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDown ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          >
            <ul className='flex min-w-max items-center gap-1 pr-2 pointer-events-auto'>
              {crmNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = resolvedActiveItemId === item.id;
                const itemClassName = cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors',
                  isActive
                    ? 'border-[#E5E7EB] text-[#262626]'
                    : 'border-transparent bg-transparent text-[#4d4d4d] hover:border-[#E5E7EB] hover:bg-[#FAFAF9]',
                );

                return (
                  <li key={item.id}>
                    {item.href ? (
                      <Link href={item.href} className={itemClassName} draggable={false}>
                        <Icon className='h-4 w-4' />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        type='button'
                        onClick={() => setActiveItemId(item.id)}
                        className={itemClassName}
                      >
                        <Icon className='h-4 w-4' />
                        <span>{item.label}</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
