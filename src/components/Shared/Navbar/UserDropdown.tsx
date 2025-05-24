"use client";

import { useAppSelector } from "@/hooks/redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

export default function UserDropdown({ displayName = false }: { displayName?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.user);

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
    <div className="relative hidden lg:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-[10px] text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            width={30}
            height={30}
            alt="User Avatar"
            className="rounded-full"
          />
        ) : (
          <FaCircleUser size={22} />
        )}
        {displayName ? (
          <span className="flex items-center justify-start gap-[1px]">
            <span className="line-clamp-1 max-w-[100px] text-[14px] font-[700] text-primary">
              {user?.fullName}
            </span>
            <FiChevronDown size={16} className="ml-[4px]" />
          </span>
        ) : (
          <FiChevronDown size={16} className="ml-[4px]" />
        )}
      </button>

      {/* User Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-start gap-[8px]"></div>

          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-solid-slab bg-white py-1 shadow-lg">
            <Link
              href="/account/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-solid-slab"
            >
              Profile
            </Link>
            {user?.role === "user" ? (
              <>
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
              </>
            ) : (
              <Link
                href="/dashboard/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            )}
            <div className="my-1 border-t border-gray-100"></div>
            <button className="block w-full px-4 py-2 text-left text-sm text-danger hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
