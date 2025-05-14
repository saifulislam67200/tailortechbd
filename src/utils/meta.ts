import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "BD Shop",
    template: "%s | BD Shop - Your Marketplace for Bulk Products",
  },
  description:
    "BD Shop - Your Ultimate Destination for Trendy Shopping! Explore a wide range of products, from fashion to electronics, all in one place. Enjoy seamless browsing, secure payments, and fast delivery. Shop smarter, shop happier with BD Shop!",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "BD Shop - Your Marketplace for Bulk Products",
    description:
      "BD Shop - Your Ultimate Destination for Trendy Shopping! Explore a wide range of products, from fashion to electronics, all in one place. Enjoy seamless browsing, secure payments, and fast delivery. Shop smarter, shop happier with BD Shop!",
    url: "https://www.bd-shop.com",
    siteName: "BD Shop",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "bd-shop - Your Marketplace for Bulk Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const getPageMetaData = (pageName: string) => {
  return {
    ...metadata,
    title: {
      default: pageName,
      template: "%s | BD Shop - Your Marketplace for Bulk Products",
    },
  };
};
