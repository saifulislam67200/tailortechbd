"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
const DashboardHeader = () => {
  return (
    <div className="sticky top-0 z-[10] flex w-full items-center justify-end border-b-[1px] border-border-muted bg-white px-[16px] py-[8px]">
      <div className="item-center flex justify-center gap-[16px]">
        <Link href={"/"} className="center gap-[5px] text-strong">
          <FaHome /> Home
        </Link>
        {/* <UserDropdown /> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
