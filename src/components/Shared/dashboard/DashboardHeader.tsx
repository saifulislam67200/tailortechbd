"use client";

import dashboardNavLinks from "@/utils/dashboardNavLinks";
import Link from "next/link";
import UserDropdown from "../Navbar/UserDropdown";
import DashboardPathSearchBar from "./DashboardPathSearchBar";
import Logo from "../Logo";

const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-[10] flex h-[60px] w-full items-center justify-between border-b border-border-muted bg-white px-4">
      <Link href={"/"} className="mr-[20px] w-[100px] shrink-0 sm:mr-[0px] lg:w-[284px]">
        {/* <Image
          src="/images/logos/logo-text.png"
          alt="logo"
          width={150}
          height={150}
          className="w-full lg:w-[150px]"
        /> */}
        <Logo />
      </Link>
      <div className="flex w-[200px] items-center justify-between lg:w-full">
        <DashboardPathSearchBar navLinks={dashboardNavLinks.admin} />
        <UserDropdown displayName={true} />
      </div>
    </div>
  );
};

export default DashboardHeader;
