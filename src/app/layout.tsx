import { ClientProviders } from "@/provider/ClientProviders";
import { metadata as MainMeta } from "@/utils/meta";
import type { Metadata } from "next";
import "./globals.css";
import { FB_PIXEL_ID } from "@/utils/fbp";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = MainMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasPixel = Boolean(FB_PIXEL_ID);
  return (
    <html lang="en">
      <body>
        {hasPixel && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {` !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');`}
            </Script>
            <noscript>
              <Image
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
