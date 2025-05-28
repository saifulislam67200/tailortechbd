"use client";
import Image from "next/image";

import dashboardNavLinks from "@/utils/dashboardNavLinks";
import Link from "next/link";
import UserDropdown from "../Navbar/UserDropdown";
import DashboardPathSearchBar from "./DashboardPathSearchBar";

const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between border-b border-border-muted bg-white px-4">
      <Link href={"/"} className="shrink-0 md:w-[300px]">
        <Image src="/images/logos/logo-text.png" alt="logo" width={150} height={150} />
      </Link>
      <div className="flex w-full items-center justify-between">
        <DashboardPathSearchBar navLinks={dashboardNavLinks.admin} />
        <UserDropdown displayName={true} />
      </div>
    </div>
  );
};

export default DashboardHeader;
