"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronsLeft,
  CircleDollarSign,
  FileText,
  GalleryVerticalEnd,
  ListTree,
  Network,
  Package,
  Search,
  Settings,
  Star,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";

type SidebarItem = {
  label: string;
  href: string;
  key: string;
  icon: ComponentType<{ className?: string }>;
};

const operationItems: SidebarItem[] = [
  { label: "Home", key: "home", href: "/dashboard", icon: GalleryVerticalEnd },
  {
    label: "Products",
    key: "products",
    href: "/dashboard/products",
    icon: ListTree,
  },
  {
    label: "Add Product",
    key: "add-product",
    href: "/dashboard/add-product",
    icon: FileText,
  },
  { label: "Orders", key: "orders", href: "/dashboard/orders", icon: Package },
  {
    label: "Subscription",
    key: "subscription",
    href: "/dashboard/subscription",
    icon: CircleDollarSign,
  },
  {
    label: "Customers",
    key: "customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Feedback",
    key: "feedback",
    href: "/dashboard/feedback",
    icon: Star,
  },
];

const otherItems: SidebarItem[] = [
  {
    label: "Integration",
    key: "integration",
    href: "/dashboard/integration",
    icon: Network,
  },
  {
    label: "Settings",
    key: "settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function SidebarNavItem({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: {
  item: SidebarItem;
  isActive: boolean;
  isCollapsed: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={item.label}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-lg text-[#262626] transition-colors",
        isCollapsed ? "xl:justify-center xl:px-0" : "",
        isActive ? "bg-[#e8e8e8]" : "hover:bg-[#ededed]",
      )}>
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 text-[#2b2b2b]",
          isCollapsed ? "xl:h-5 xl:w-5" : "",
        )}
      />
      <span className={cn(isCollapsed ? "xl:hidden" : "")}>{item.label}</span>
    </Link>
  );
}

type DashboardSidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

export default function DashboardSidebar({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const activeView =
    pathname === "/dashboard" ? "home" : (pathname.split("/")[2] ?? "home");

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen shrink-0 flex-col border-r border-black/10 bg-[#FAFAF9] p-3 transition-all duration-300 ease-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "w-72 xl:sticky xl:top-0 xl:h-screen xl:translate-x-0",
        isCollapsed ? "xl:w-20" : "xl:w-80",
      )}>
      <div
        className={cn(
          "flex items-center pb-3",
          isCollapsed ? "xl:justify-center" : "justify-between px-1",
        )}>
        <Link
          href='/'
          aria-label='ZilkyWipes home'
          className={cn(
            "overflow-hidden transition-all duration-300",
            isCollapsed ? "xl:hidden" : "w-auto opacity-100",
          )}>
          <Image
            src='/Logo/Logo-02.svg'
            alt='ZilkyWipes'
            width={190}
            height={52}
            priority
            className='h-8 w-auto object-contain md:h-9 lg:h-10'
          />
        </Link>

        <button
          type='button'
          aria-label='Close sidebar'
          onClick={onCloseMobile}
          className='rounded p-1 text-[#a0a0a0] hover:bg-[#ececec] xl:hidden'>
          <X className='h-4 w-4' />
        </button>

        <button
          type='button'
          aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
          onClick={onToggleCollapse}
          className='hidden rounded p-1 text-[#a0a0a0] hover:bg-[#ececec] xl:inline-flex'>
          <ChevronsLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed ? "rotate-180" : "",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "relative",
          isCollapsed ? "xl:flex xl:items-center xl:justify-center" : "",
        )}>
        <Search
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9e9e9e]",
            isCollapsed
              ? "xl:pointer-events-auto xl:static xl:h-5 xl:w-5 xl:translate-y-0"
              : "",
          )}
        />
        <input
          type='text'
          placeholder='Search Anything...'
          className={cn(
            "h-9 w-full rounded-lg border border-[#dddddd] bg-[#f8f8f8] pl-9 pr-3 text-[14px] outline-none placeholder:text-[#b3b3b3] focus:border-[#cfcfcf]",
            isCollapsed ? "xl:hidden" : "",
          )}
        />
      </div>

      <div
        className={cn(
          "mt-3 flex items-center justify-between rounded-md px-1.5 py-1.5",
          isCollapsed ? "xl:justify-center" : "",
        )}>
        <div className='flex items-center gap-2 text-[#2f2f2f]'>
          <Bell className={cn("h-4 w-4", isCollapsed ? "xl:h-5 xl:w-5" : "")} />
          <span className={cn("text-lg", isCollapsed ? "xl:hidden" : "")}>
            Notification
          </span>
        </div>
        <span
          className={cn(
            "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d9ebff] px-1 text-[10px] text-[#3a86e8]",
            isCollapsed ? "xl:hidden" : "",
          )}>
          1
        </span>
      </div>

      <div className='mt-4'>
        <p
          className={cn(
            "px-1 text-[18px] tracking-[0.08em] text-[#9d9d9d]",
            isCollapsed ? "xl:hidden" : "",
          )}>
          Operation
        </p>
        <div className='mt-2 flex flex-col gap-0.5'>
          {operationItems.map((item) => (
            <SidebarNavItem
              key={item.key}
              item={item}
              isActive={activeView === item.key}
              isCollapsed={isCollapsed}
              onNavigate={onCloseMobile}
            />
          ))}
        </div>
      </div>

      <div className='mt-5'>
        <p
          className={cn(
            "px-1 text-[18px] tracking-[0.08em] text-[#9d9d9d]",
            isCollapsed ? "xl:hidden" : "",
          )}>
          Others
        </p>
        <div className='mt-2 flex flex-col gap-0.5'>
          {otherItems.map((item) => (
            <SidebarNavItem
              key={item.key}
              item={item}
              isActive={activeView === item.key}
              isCollapsed={isCollapsed}
              onNavigate={onCloseMobile}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
