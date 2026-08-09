import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { getLocale } from 'next-intl/server';
import './globals.css';
import './App.css';
import './index.css';

export const viewport: Viewport = {
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Yogzan - Jasa Foto & Video Profesional di 7 Kota Indonesia',
  description:
    'Abadikan momen berharga dengan layanan foto dan video profesional. Wedding, prewedding, wisuda, event. Tersedia di Jogja, Jakarta, Surabaya, Bandung, Malang, Semarang, dan Bali.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'facebook-domain-verification': 'knqnmm30wfisruji2u9h09r6b9vdpu',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WTHMZH6');`,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xz6i8j9i5m");`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4Y9RTECPZ0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4Y9RTECPZ0');`,
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','6172564279426694');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=6172564279426694&ev=PageView&noscript=1"
          />
        </noscript>
        {/* TikTok Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","setUserProperties","setUserPropertiesOnce","unsetUserProperty"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var o="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=o;ttq._t=ttq._t||{};ttq._t[e]=+new Date();ttq._o=ttq._o||{};ttq._o[e]=n||{};var r=document.createElement("script");r.type="text/javascript";r.async=!0;r.src=o;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)};ttq.load('CREU5R3C77U6CK69V3J0');ttq.page()}(window,document,'ttq');`,
          }}
        />
        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Yogzan Fotosinema',
              description:
                'Jasa foto dan video profesional untuk wisuda, wedding, prewedding, keluarga, dan event di 7 kota Indonesia',
              url: 'https://www.yogzan.com',
              image: 'https://www.yogzan.com/apple-touch-icon.png',
              telephone: '+6285713866294',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Yogyakarta',
                addressCountry: 'ID',
              },
              areaServed: [
                'Yogyakarta',
                'Jakarta',
                'Bandung',
                'Surabaya',
                'Malang',
                'Semarang',
                'Bali',
              ],
              priceRange: '$$',
              sameAs: ['https://instagram.com/yogzan'],
            }),
          }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTHMZH6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}