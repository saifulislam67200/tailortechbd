import { ClientProviders } from "@/provider/ClientProviders";
import { metadata as MainMeta } from "@/utils/meta";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = MainMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
