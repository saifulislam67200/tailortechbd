"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaCircleUser size={22} />
        <FiChevronDown size={16} className="ml-[4px]" />
      </button>

      {/* User Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <Link
            href="/account/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/account/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Orders
          </Link>
          <Link
            href="/account/wishlist"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Wishlist
          </Link>
          <Link
            href="/account/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </Link>
          <div className="my-1 border-t border-gray-100"></div>
          <button className="block w-full px-4 py-2 text-left text-sm text-danger hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
