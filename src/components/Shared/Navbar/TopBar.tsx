import Link from "next/link";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaTag, FaBoxOpen, FaHeadset } from "react-icons/fa";

// Define prop types
interface TopBarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

const TopBarItem: React.FC<TopBarItemProps> = ({ icon: Icon, label, href }) => {
  return (
    <li className="group flex items-center">
      <Link href={href} className="flex items-center">
        <span className="mr-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-white group-hover:border-primary">
          <Icon className="text-[10px] text-white group-hover:text-primary" />
        </span>
        <span className="text-white text-[16px] transition-colors group-hover:text-primary">{label}</span>
      </Link>
    </li>
  );
};

// Data array
const topBarItems: TopBarItemProps[] = [
  { icon: FaPhoneAlt, label: "16810", href: "tel:16810" },
  { icon: FaEnvelope, label: "info@bdshop.com", href: "mailto:info@bdshop.com" },
  { icon: FaTag, label: "Offer", href: "/offer" },
  { icon: FaBoxOpen, label: "New Arrival", href: "/new-arrival" },
  { icon: FaHeadset, label: "Customer Service", href: "/customer-service" },
];

const TopBar: React.FC = () => {
  return (
    <div className="hidden w-full bg-black py-[4px] lg:flex justify-center">
      <nav className="flex flex-col items-center justify-center md:flex-row">
        <ul className="flex flex-wrap justify-center gap-[16px]">
          {topBarItems.map((item, index) => (
            <TopBarItem key={index} icon={item.icon} label={item.label} href={item.href} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
