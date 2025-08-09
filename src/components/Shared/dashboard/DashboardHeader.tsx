"use client";

import dashboardNavLinks from "@/utils/dashboardNavLinks";
import Logo from "../Logo";
import UserDropdown from "../Navbar/UserDropdown";
import DashboardPathSearchBar from "./DashboardPathSearchBar";

const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between border-b border-border-muted bg-white px-4">
      <Logo />
      <div className="flex w-[200px] items-center justify-between lg:w-full">
        <DashboardPathSearchBar navLinks={dashboardNavLinks.admin} />
        <UserDropdown displayName={true} />
      </div>
    </div>
  );
};

export default DashboardHeader;
