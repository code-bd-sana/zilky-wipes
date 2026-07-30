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
  Star,
  Menu,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ComponentType } from "react";

// Define types for header actions and configuration
type HeaderAction = {
  label: string;
  href?: string;
  icon?: ComponentType<{ className?: string }>;
  className: string;
  onClick?: () => void;
};

// Define header configuration for different views
type HeaderConfig = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  badgeIcon?: ComponentType<{ className?: string }>;
};

// Function to get actions based on active view
const getHeaderActions = (
  activeView: string,
  onAddSubscription?: () => void,
): HeaderAction[] => {
  const baseActions: HeaderAction[] = [];

  // Add Subscription button for subscription page
  if (activeView === "subscription") {
    baseActions.push({
      label: "Add Subscription",
      icon: Plus,
      className:
        "border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] hover:bg-[#F0F0F0] cursor-pointer",
      onClick: onAddSubscription,
    });
  }

  // Add Product button for all pages except subscription
  if (activeView !== "subscription") {
    baseActions.push({
      label: "Add Product",
      href: "/dashboard/add-product",
      icon: Plus,
      className:
        "border border-[#E5E7EB] bg-[#FAFAF9] text-[#262626] hover:bg-[#F0F0F0] cursor-pointer",
    });
  }

  // Always show View Orders button (except on orders & subscription pages)
  if (activeView !== "orders" && activeView !== "subscription") {
    baseActions.push({
      label: "View Orders",
      href: "/dashboard/orders",
      icon: Package,
      className: "bg-white text-[#262626] cursor-pointer",
    });
  }

  return baseActions;
};

// Predefined header configurations for known views
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
    icon: Star,
  },
  settings: {
    label: "Settings",
    icon: Network,
  },
  "add-product": {
    label: "Add Product",
    icon: ListTodo,
    badgeIcon: ClipboardList,
  },
  integration: {
    label: "Integration",
    icon: Network,
  },
};

// Fallback function to format label from view name
function formatLabel(view: string) {
  return view
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// Main function to get header configuration based on active view
function getHeaderConfig(view: string): HeaderConfig {
  const predefined = headerByView[view];
  if (predefined) {
    return predefined;
  }

  // Fallback for unknown views
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
  onAddSubscription,
}: {
  activeView: string;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  onAddSubscription?: () => void;
}) {
  const config = getHeaderConfig(activeView);
  const LeadingIcon = config.icon;
  const BadgeIcon = config.badgeIcon ?? config.icon;
  const headerActions = getHeaderActions(activeView, onAddSubscription);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "general";

  return (
    <header className='mt-1 border-b border-[#dedede] bg-white px-4 py-3 md:px-8'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-2 text-[#2c2c2c]'>
          {/* Sidebar opening & closing in mobile view */}
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
          {/* Top Header */}
          <LeadingIcon className='h-4 w-4 text-[#3b3b3b]' />
          <span className='text-base'>{config.label}</span>
          
          {activeView === "feedback" ? (
            <div className="flex gap-2 ml-4">
              <Link 
                href="?tab=general" 
                className={cn(
                  "inline-flex items-center rounded-lg border px-3 py-1 text-sm transition-colors", 
                  currentTab === "general" 
                    ? "border-[#E5E7EB] bg-[#F5F5F4] text-[#3a3a3a]" 
                    : "border-transparent text-gray-500 hover:bg-gray-50"
                )}
              >
                General Feedback
              </Link>
              <Link 
                href="?tab=market" 
                className={cn(
                  "inline-flex items-center rounded-lg border px-3 py-1 text-sm transition-colors", 
                  currentTab === "market" 
                    ? "border-[#E5E7EB] bg-[#F5F5F4] text-[#3a3a3a]" 
                    : "border-transparent text-gray-500 hover:bg-gray-50"
                )}
              >
                Market Research Survey
              </Link>
            </div>
          ) : config.badge ? (
            <span className='ml-1 inline-flex items-center rounded-lg border border-[#E5E7EB] bg-[#F5F5F4] px-3 py-1 text-sm text-[#3a3a3a]'>
              <BadgeIcon className='mr-2 h-4 w-4 text-[#262626]' />
              {config.badge}
            </span>
          ) : null}
        </div>

        {/* Header Actions */}
        <div className='flex flex-wrap items-center gap-3 md:justify-end'>
          {headerActions.map((action) => {
            const ActionIcon = action.icon;
            // If action has onClick, render as button
            if (action.onClick) {
              return (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors",
                    action.className,
                  )}>
                  {ActionIcon ? <ActionIcon className='mr-2 h-4 w-4' /> : null}
                  {action.label}
                </button>
              );
            }

            // If action has href, render as Link
            if (action.href) {
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
            }

            // render as button without onClick (should not happen)
            return (
              <button
                key={action.label}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors",
                  action.className,
                )}>
                {ActionIcon ? <ActionIcon className='mr-2 h-4 w-4' /> : null}
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
