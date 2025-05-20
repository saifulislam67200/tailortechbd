import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "TailorTech",
    template: "%s | TailorTech - Your Style Is Your Story",
  },
  description:
    "Welcome to TailorTech – Where Tradition Meets Innovation.\nAt Tilortech, we believe fashion is more than just clothing — it's a statement of identity. Our brand blends modern design with timeless comfort, offering high-quality apparel for individuals who value style, authenticity, and confidence. We also blend the timeless art of tailoring with cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish apparel. Every piece is crafted with precision, comfort, and confidence in mind.\nTailorTech is more than a brand — it’s a movement towards smarter fashion.\nJoin us and wear the future.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "TailorTech - Your Style Is Your Story",
    description:
      "Welcome to TailorTech – Where Tradition Meets Innovation.\nAt Tilortech, we believe fashion is more than just clothing — it's a statement of identity. Our brand blends modern design with timeless comfort, offering high-quality apparel for individuals who value style, authenticity, and confidence. We also blend the timeless art of tailoring with cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish apparel. Every piece is crafted with precision, comfort, and confidence in mind.\nTailorTech is more than a brand — it’s a movement towards smarter fashion.\nJoin us and wear the future.",
    url: "https://www.bd-shop.com",
    siteName: "TailorTech",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "TailorTech - Your Style Is Your Story",
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
      template: "%s | TailorTech - Your Style Is Your Story",
    },
  };
};
