"use client";
import Image from "next/image";

import dashboardNavLinks from "@/utils/dashboardNavLinks";
import UserDropdown from "../Navbar/UserDropdown";
import DashboardPathSearchBar from "./DashboardPathSearchBar";

const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between border-b border-border-muted bg-white px-4">
      <div className="w-[300px] shrink-0">
        <Image src="/images/logos/logo-text.png" alt="logo" width={150} height={150} />
      </div>
      <div className="flex w-full items-center justify-between">
        <DashboardPathSearchBar navLinks={dashboardNavLinks.admin} />
        <UserDropdown />
      </div>
    </div>
  );
};

export default DashboardHeader;
