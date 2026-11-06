'use client';
import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;
  return <>
    <Script src={'https://www.googletagmanager.com/gtag/js?id=' + measurementId} strategy="afterInteractive" />
    <Script id="offdaya-google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
      gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)});`}
    </Script>
  </>;
}
