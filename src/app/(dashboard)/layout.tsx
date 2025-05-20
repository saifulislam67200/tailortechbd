"use client";
import DashboardHeader from "@/components/Shared/dashboard/DashboardHeader";
import DashboardSideBar from "@/components/Shared/dashboard/DashboardSideBar";
import dashboardNavLinks from "@/utils/dashboardNavLinks";
import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-ful flex h-[100dvh] items-start justify-start gap-0">
      <DashboardSideBar navlinks={dashboardNavLinks.admin} />

      <div className="flex h-full w-full flex-col gap-[0px] overflow-auto">
        <DashboardHeader />
        <div className="px-[16px] py-[8px]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
