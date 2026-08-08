import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import './App.css';
import './index.css';

export const metadata: Metadata = {
  title: 'Yogzan - Jasa Foto & Video Profesional di 7 Kota Indonesia',
  description:
    'Abadikan momen berharga dengan layanan foto dan video profesional. Wedding, prewedding, wisuda, event. Tersedia di Jogja, Jakarta, Surabaya, Bandung, Malang, Semarang, dan Bali.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
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
