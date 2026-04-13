"use client";

import { cn } from "@/lib/utils";
import {
  ClipboardList,
  GalleryVerticalEnd,
  ListTree,
  ListOrdered,
  Network,
  Package,
  Layers,
  ListTodo,
  Menu,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

type HeaderAction = {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  className: string;
};

type HeaderConfig = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  badgeIcon?: ComponentType<{ className?: string }>;
};

const headerActions: HeaderAction[] = [
  {
    label: "View Orders",
    href: "/dashboard/orders",
    icon: Package,
    className: "bg-white text-[#262626] cursor-pointer",
  },
  {
    label: "Add Product",
    href: "/dashboard/add-product",
    icon: Plus,
    className:
      "border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] hover:bg-[#F0F0F0] cursor-pointer",
  },
];

const headerByView: Record<string, HeaderConfig> = {
  home: {
    label: "Home",
    icon: GalleryVerticalEnd,
    badge: "Key Metrics",
    badgeIcon: Layers,
  },
  products: {
    label: "Products",
    icon: ListTodo,
    badge: "Product List",
    badgeIcon: ClipboardList,
  },
  orders: {
    label: "Orders",
    icon: Package,
    badge: "Order lists",
    badgeIcon: ListOrdered,
  },
  subscription: {
    label: "Subscription",
    icon: Package,
    badge: "Subscription",
    badgeIcon: ListOrdered,
  },
  customers: {
    label: "Customers",
    icon: Package,
    badge: "Customer lists",
    badgeIcon: ListOrdered,
  },
  feedback: {
    label: "Feedback",
    icon: Package,
    badge: "Feedback",
    badgeIcon: ListOrdered,
  },
  settings: {
    label: "Settings",
    icon: Network,
  },
  "add-product": {
    label: "Add Product",
    icon: ListTodo,
    badge: "Create Product",
    badgeIcon: ClipboardList,
  },
  integration: {
    label: "Integration",
    icon: Network,
  },
};

function formatLabel(view: string) {
  return view
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getHeaderConfig(view: string): HeaderConfig {
  const predefined = headerByView[view];
  if (predefined) {
    return predefined;
  }

  return {
    label: formatLabel(view),
    icon: ListTree,
    badge: `${formatLabel(view)} Overview`,
    badgeIcon: ListTree,
  };
}

export default function DashboardTopHeader({
  activeView,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}: {
  activeView: string;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}) {
  const config = getHeaderConfig(activeView);
  const LeadingIcon = config.icon;
  const BadgeIcon = config.badgeIcon ?? config.icon;

  return (
    <header className='mt-1 border-b border-[#dedede] bg-white px-4 py-3 md:px-8'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-2 text-[#2c2c2c]'>
          <button
            type='button'
            aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={onToggleMobileSidebar}
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] xl:hidden'>
            {isMobileSidebarOpen ? (
              <X className='h-4 w-4' />
            ) : (
              <Menu className='h-4 w-4' />
            )}
          </button>

          <LeadingIcon className='h-4 w-4 text-[#3b3b3b]' />
          <span className='text-base'>{config.label}</span>
          {config.badge ? (
            <span className='ml-1 inline-flex items-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F4] px-3 py-1 text-sm text-[#3a3a3a]'>
              <BadgeIcon className='mr-2 h-4 w-4 text-[#262626]' />
              {config.badge}
            </span>
          ) : null}
        </div>

        <div className='flex flex-wrap items-center gap-3 md:justify-end'>
          {headerActions.map((action) => {
            const ActionIcon = action.icon;

            return (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors",
                  action.className,
                )}>
                {ActionIcon ? <ActionIcon className='mr-2 h-4 w-4' /> : null}
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
