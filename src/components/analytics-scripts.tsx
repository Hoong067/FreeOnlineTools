import Script from "next/script";

export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adClient =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-8039489457416276";

  return (
    <>
      {adClient ? (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
