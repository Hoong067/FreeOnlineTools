import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AnalyticsScripts } from "@/components/analytics-scripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quicktoolshub.com"),
  title: {
    default: "QuickToolsHub - Free Online Tools",
    template: "%s | QuickToolsHub",
  },
  description:
    "Free online tools including random name picker, password generator, QR code generator, random number generator, unit converter, JSON formatter, text tools, color picker, and spin wheel.",
  keywords: [
    "free online tools",
    "random name picker",
    "password generator",
    "QR code generator",
    "random number generator",
    "unit converter",
    "image compressor",
    "JSON formatter",
    "text tools",
    "color picker",
    "spin wheel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QuickToolsHub - Free Online Tools",
    description:
      "Fast, free utilities for daily tasks. No signup required.",
    url: "https://quicktoolshub.com",
    siteName: "QuickToolsHub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        <AnalyticsScripts />
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
