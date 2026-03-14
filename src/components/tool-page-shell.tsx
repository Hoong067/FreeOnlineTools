import type { ReactNode } from "react";
import { AdSlot } from "@/components/ad-slot";

type ToolPageShellProps = {
  title: string;
  description: string;
  headerAdSlot?: string;
  bodyAdSlot?: string;
  footerAdSlot?: string;
  children: ReactNode;
};

export function ToolPageShell({
  title,
  description,
  headerAdSlot = "1111111111",
  bodyAdSlot = "2222222222",
  footerAdSlot = "3333333333",
  children,
}: ToolPageShellProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">{description}</p>
      </div>

      <AdSlot slot={headerAdSlot} label="Header Ad" className="mb-6" />

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
        {children}
      </section>

      <AdSlot slot={bodyAdSlot} label="Mid Ad" className="my-6" />
      <AdSlot slot={footerAdSlot} label="Bottom Ad" className="mb-2" />
    </div>
  );
}
