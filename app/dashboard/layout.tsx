"use client";

import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardTopHeader from "@/components/dashboard/dashboard-top-header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const activeView =
    pathname === "/dashboard" ? "home" : pathname.split("/")[2] ?? "home";

  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
        <DashboardTopHeader
          activeView={activeView}
          onToggleMobileSidebar={() =>
            setIsMobileSidebarOpen((previous) => !previous)
          }
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
