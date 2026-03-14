"use client";

import { useEffect } from "react";

type AdSlotProps = {
  slot: string;
  label?: string;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, label = "Advertisement", className }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!adClient) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      return;
    }
  }, [adClient]);

  if (!adClient) {
    return (
      <div
        className={`rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-4 text-center text-xs text-slate-400 ${className ?? ""}`}
      >
        {label} Slot • Set `NEXT_PUBLIC_ADSENSE_CLIENT` + slot IDs to activate
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
