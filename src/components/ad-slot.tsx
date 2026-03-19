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
  const adClient =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-8039489457416276";

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

  return (
    <div className={className} aria-label={label}>
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
