"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          QuickToolsHub
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-slate-400 sm:block">Free • Fast • No signup</p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
