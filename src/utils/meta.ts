import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tailortech",
    template: "%s | Tailortech - Your Style Is Your Story",
  },
  description:
    "Welcome to Tailortech – Where Tradition Meets Innovation.\nAt Tailortech, we believe fashion is more than just clothing — it's a statement of identity. Our brand blends modern design with timeless comfort, offering high-quality apparel for individuals who value style, authenticity, and confidence. We also blend the timeless art of tailoring with cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish apparel. Every piece is crafted with precision, comfort, and confidence in mind.\Tailortech is more than a brand — it’s a movement towards smarter fashion.\nJoin us and wear the future.",

  keywords: ["fashion", "apparel", "tailoring", "style"],

  icons: {
    icon: [
      { url: "/images/logos/favicon.jpg" },
      { url: "/images/logos/favicon.jpg", sizes: "16x16", type: "image/jpg" },
      { url: "/images/logos/favicon.jpg", sizes: "32x32", type: "image/jpg" },
      { url: "/images/logos/logo.jpg", type: "image/png" },
    ],
    apple: [{ url: "/images/logos/favicon.jpg", sizes: "180x180" }],
    other: [
      { rel: "icon", url: "/images/logos/favicon.jpg", sizes: "192x192", type: "image/jpg" },
      { rel: "icon", url: "/images/logos/favicon.jpg", sizes: "512x512", type: "image/jpg" },
    ],
  },

  openGraph: {
    title: "Tailortech - Your Style Is Your Story",
    description:
      "Welcome to Tailortech – Where Tradition Meets Innovation.\nAt Tailortech, we believe fashion is more than just clothing — it's a statement of identity. Our brand blends modern design with timeless comfort, offering high-quality apparel for individuals who value style, authenticity, and confidence. We also blend the timeless art of tailoring with cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish apparel. Every piece is crafted with precision, comfort, and confidence in mind.\Tailortech is more than a brand — it’s a movement towards smarter fashion.\nJoin us and wear the future.",
    url: "https://www.tailortechbd.com",
    siteName: "Tailortech",
    images: [
      {
        url: "/images/logos/favicon.jpg",
        width: 1200,
        height: 630,
        alt: "Tailortech - Your Style Is Your Story",
        type: "image/jpg",
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
      template: "%s | Tailortech - Your Style Is Your Story",
    },
  };
};
