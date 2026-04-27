import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zilky Wipes",
  description: "Because your bottom deserves better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${jost.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>
        {children}
        <Toaster richColors position='bottom-left' />
      </body>
    </html>
  );
}
