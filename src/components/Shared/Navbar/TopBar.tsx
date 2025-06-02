const TopBar: React.FC = () => {
  return (
    <div className="hidden w-full border-b border-border-muted bg-white py-2 lg:block">
      <div className="relative mx-auto w-full main_container overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="px-4 text-primary font-bold capitalize">Your trusted online clothing provider!!!</span>
          {/* <span className="px-4">Your trusted online clothing provider!!!</span>
          <span className="px-4">Your trusted online clothing provider!!!</span> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

// import Link from "next/link";
// import React from "react";
// import { FaBoxOpen, FaEnvelope, FaHeadset, FaPhoneAlt } from "react-icons/fa";

// // Define prop types
// interface TopBarItemProps {
//   icon: React.ElementType;
//   label: string;
//   href: string;
// }

// const TopBarItem: React.FC<TopBarItemProps> = ({ icon: Icon, label, href }) => {
//   return (
//     <li className="group flex items-center">
//       <Link href={href} className="flex items-center">
//         <span className="mr-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-white group-hover:border-primary">
//           <Icon className="text-[10px] text-black group-hover:text-primary" />
//         </span>
//         <span className="text-[16px] text-black transition-colors group-hover:text-primary">
//           {label}
//         </span>
//       </Link>
//     </li>
//   );
// };

// // Data array
// const topBarItems: TopBarItemProps[] = [
//   { icon: FaPhoneAlt, label: "01911 696556", href: "tel:+8801911696556" },
//   {
//     icon: FaEnvelope,
//     label: "tailortechbd2025@gmail.com",
//     href: "mailto:tailortechbd2025@gmail.com",
//   },
//   { icon: FaBoxOpen, label: "New Arrival", href: "/shop/new-arrival" },
//   { icon: FaHeadset, label: "Customer Service", href: "/contact" },
// ];

// const TopBar: React.FC = () => {
//   return (
//     <div className="hidden w-full justify-center border-b-[1px] border-border-muted bg-white py-[8px] lg:flex">
//       <nav className="flex flex-col items-center justify-center md:flex-row">
//         <ul className="flex flex-wrap justify-center gap-[16px]">
//           {topBarItems.map((item, index) => (
//             <TopBarItem key={index} icon={item.icon} label={item.label} href={item.href} />
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default TopBar;
