import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const socialLinks = [
  {
    name: "facebook",
    url: "https://www.facebook.com/tailortechbd",
    icon: FaFacebookF,
  },
  // {
  //   name: "youtube",
  //   url: "https://www.youtube.com",
  //   icon: FaYoutube,
  // },
  // {
  //   name: "instagram",
  //   url: "https://www.instagram.com",
  //   icon: FaInstagram,
  // },
  {
    name: "Email",
    url: "mailto:tailortechbd2025@gmail.com",
    icon: MdEmail,
  },
];

export const footerLinks = [
  {
    label: "TailorTech",
    contents: [
      {
        label: "About Us",
        url: "/about",
      },
      {
        label: "Our Products",
        url: "/shop",
      },
      {
        label: "Contact Us",
        url: "/contact",
      },
    ],
  },

  {
    label: "Customer Service",
    contents: [
      {
        label: "Exchange & Return Policy",
        url: "/exchange-and-return-policy",
      },
      {
        label: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        url: "/terms-and-conditions",
      },
      {
        label: "Cancelation & Return Policy",
        url: "/privacy-policy",
      },
    ],
  },
];
