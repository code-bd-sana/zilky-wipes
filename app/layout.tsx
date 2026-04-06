import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const malibu = localFont({
  src: "../public/font/Malibu/Malibu Sunday Serif.ttf",
  variable: "--font-malibu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zilky Wipes",
  description: "A better way to feel clean.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${jost.variable} ${malibu.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>
        {children}
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
