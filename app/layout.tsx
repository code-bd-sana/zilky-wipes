import type { Metadata } from "next";

import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={`${jost.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col font-sans'>{children}</body>
    </html>
  );
}
