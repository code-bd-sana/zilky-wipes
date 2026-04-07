"use client";

import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFooter = pathname === "/checkout" || pathname.startsWith("/checkout/");

  return (
    <>
      <div className='relative z-50'>
        <Navbar />
      </div>
      <main className='relative z-10'>{children}</main>
      {hideFooter ? null : <Footer />}
    </>
  );
}
