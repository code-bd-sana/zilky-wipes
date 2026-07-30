"use client";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import CrmNavbar from "@/components/dashboard/crm/crm-navbar";
import DashboardTopHeader from "@/components/dashboard/dashboard-top-header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubscriptionModal from "@/components/dashboard/subscription/subscription-modal";
import { useGetMe } from "@/hooks/useAuth";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const activeView =
    pathname === "/dashboard" ? "home" : (pathname.split("/")[2] ?? "home");
  const isCrmView = activeView === "crm";

  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // For Subscription Modal
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  
  const router = useRouter();
  const { data: meData, isLoading, isError } = useGetMe();
  const user = meData?.data;

  useEffect(() => {
    if (!isLoading) {
      if (isError || !user || user.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [isLoading, isError, user, router]);

  useEffect(() => {
    if (!isMobileSidebarOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileSidebarOpen]);

  // Handler for opening subscription modal
  const handleAddSubscription = () => {
    setIsSubscriptionModalOpen(true);
  };

  // Handler for closing subscription modal
  const handleCloseSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  if (isLoading || !user || user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-xl font-medium text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#f5f5f5] xl:flex'>
      <DashboardSidebar
        isCollapsed={isDesktopSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onToggleCollapse={() =>
          setIsDesktopSidebarCollapsed((previous) => !previous)
        }
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {isMobileSidebarOpen ? (
        <button
          type='button'
          aria-label='Close sidebar overlay'
          className='fixed inset-0 z-40 bg-black/30 xl:hidden'
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      ) : null}

      <main className='min-w-0 flex-1 bg-white'>
        {isCrmView ? (
          <CrmNavbar
            onToggleMobileSidebar={() =>
              setIsMobileSidebarOpen((previous) => !previous)
            }
            isMobileSidebarOpen={isMobileSidebarOpen}
          />
        ) : (
          <DashboardTopHeader
            activeView={activeView}
            onToggleMobileSidebar={() =>
              setIsMobileSidebarOpen((previous) => !previous)
            }
            isMobileSidebarOpen={isMobileSidebarOpen}
            onAddSubscription={handleAddSubscription}
          />
        )}
        {children}
      </main>
      {/* Subscription Modal - only renders when open */}
      {isSubscriptionModalOpen && (
        <SubscriptionModal onClose={handleCloseSubscriptionModal} />
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
