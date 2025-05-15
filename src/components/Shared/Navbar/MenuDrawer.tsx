"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  FiX,
  FiHome,
  FiShoppingBag,
  FiMenu,
  FiInfo,
  FiPhone,
  FiUser,
  FiHeart,
} from "react-icons/fi";

interface MenuDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuDrawer({ isOpen, setIsOpen }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Menu items for mobile drawer
  const menuItems = [
    { name: "Home", icon: <FiHome size={20} />, href: "/" },
    { name: "Shop", icon: <FiShoppingBag size={20} />, href: "/shop" },
    { name: "Categories", icon: <FiMenu size={20} />, href: "/categories" },
    { name: "About Us", icon: <FiInfo size={20} />, href: "/about" },
    { name: "Contact", icon: <FiPhone size={20} />, href: "/contact" },
  ];

  return (
    <>
      {/* Overlay - separate element with opacity */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer - fully opaque */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-50 h-full w-4/5 transform bg-white shadow-lg transition-transform duration-300 ease-in-out sm:w-[320px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="my-4 border-t border-gray-200"></div>

          {/* User Account Section */}
          <div className="space-y-1">
            <h3 className="mb-2 text-sm font-medium tracking-wider text-gray-500 uppercase">
              Account
            </h3>
            <Link
              href="/account/profile"
              className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiUser size={20} className="mr-3 text-gray-500" />
              My Profile
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiShoppingBag size={20} className="mr-3 text-gray-500" />
              My Orders
            </Link>
            <Link
              href="/account/wishlist"
              className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiHeart size={20} className="mr-3 text-gray-500" />
              Wishlist
            </Link>
          </div>

          <div className="my-4 border-t border-gray-200"></div>

          {/* Contact & Help */}
          <div className="space-y-1">
            <h3 className="mb-2 text-sm font-medium tracking-wider text-gray-500 uppercase">
              Help & Support
            </h3>
            <Link
              href="/contact"
              className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiPhone size={20} className="mr-3 text-gray-500" />
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="flex items-center rounded-md px-2 py-3 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiInfo size={20} className="mr-3 text-gray-500" />
              FAQ
            </Link>
          </div>

          <div className="my-4 border-t border-gray-200"></div>

          {/* Logout Button */}
          <button className="flex w-full items-center rounded-md px-2 py-3 text-red-600 hover:bg-gray-100">
            <FiX size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
