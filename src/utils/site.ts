import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
// import { MdEmail } from "react-icons/md";
import { AiOutlineTikTok } from "react-icons/ai";

export const socialLinks = [
  {
    name: "facebook",
    url: "https://www.facebook.com/tailortechbd",
    icon: FaFacebookF,
  },
  {
    name: "youtube",
    url: "https://www.youtube.com",
    icon: FaYoutube,
  },
  {
    name: "instagram",
    url: "https://www.instagram.com",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    name: "LinkedIn",
    url: "https://www.x.com",
    icon: RiTwitterXFill,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com",
    icon: AiOutlineTikTok,
  },
];

export const footerLinks = [
  {
    label: "Tailortech",
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
