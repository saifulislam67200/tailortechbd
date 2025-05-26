"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiUser,
  // FiSettings,
  // FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiShoppingBag,
  FiGrid,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserDropdown({ displayName = false }: { displayName?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);
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
  }, []);

  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    setIsOpen(false);
    await logoutUser(undefined);
    toast.success("Logout successfully");
    router.push("/");
  };

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
            className="aspect-square w-[30px] overflow-hidden rounded-full"
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white pt-2 shadow-lg">
          {/* User Info Header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <div className="aspect-square w-[40px] overflow-hidden rounded-full">
                  <Image
                    src={user?.avatar}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <Image
                  src="/images/avatar.jpg"
                  alt="user-icon"
                  width={40}
                  height={40}
                  className="rounded-full border border-border-muted object-cover"
                />
              )}
              <div>
                <p className="text-[14px] font-medium capitalize">{user?.fullName}</p>
                <p className="text-[12px] text-info capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <Link
              href="/account/profile"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center space-x-[12px] border-b border-gray-200 px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
            >
              <FiUser className="h-[16px] w-[16px]" />
              <span>Profile</span>
            </Link>
            {user?.role === "user" ? (
              <>
                <Link
                  href="/account/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center space-x-[12px] border-b border-gray-200 px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
                >
                  <FiShoppingBag className="h-[16px] w-[16px]" />
                  <span>My Orders</span>
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center space-x-[12px] border-b border-gray-200 px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
              >
                <FiGrid className="h-[16px] w-[16px]" />
                <span>Dashboard </span>
              </Link>
            )}
            <button
              onClick={() => handleLogout()}
              className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[12px] text-[14px] text-primary transition-colors duration-150 hover:bg-gray-50"
            >
              <FiLogOut className="h-[16px] w-[16px]" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
