"use client";

import dashboardNavLinks from "@/utils/dashboardNavLinks";
import UserDropdown from "../Navbar/UserDropdown";
import DashboardPathSearchBar from "./DashboardPathSearchBar";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const DashboardHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-[10] flex w-full flex-col items-center border-b border-border-muted bg-white px-4 py-[11px]">
        <nav className="flex w-full items-center justify-between gap-4">
          <Link href={"/"} className={twMerge("text-[28px] font-bold text-white")}>
            <Image
              src="/images/logos/logo.svg"
              alt="logo"
              width={230}
              height={60}
              className="w-[130px] sm:w-[230px]"
            />
          </Link>
          <div className="hidden w-full justify-center lg:flex">
            <DashboardPathSearchBar navLinks={dashboardNavLinks.admin} />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="text-black lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <FiSearch size={22} />
            </button>

            <UserDropdown />
          </div>
        </nav>
        {/* Mobile Search Bar - Toggled by search icon */}
        {isSearchOpen && <DashboardPathSearchBar className="max-w-full mt-4" navLinks={dashboardNavLinks.admin} />}
      </div>
    </>
  );
};

export default DashboardHeader;
