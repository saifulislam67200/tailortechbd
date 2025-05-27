"use client";
import DashboardHeader from "@/components/Shared/dashboard/DashboardHeader";
import DashboardSideBar from "@/components/Shared/dashboard/DashboardSideBar";
import Protectedroute from "@/provider/Protectedroute";
import dashboardNavLinks from "@/utils/dashboardNavLinks";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Protectedroute role="admin">
      <div
        className={`w-ful flex h-[100dvh] flex-col items-start justify-start gap-0 ${openSans.className}`}
      >
        <DashboardHeader />
        <div className="flex h-[calc(100%-60px)] w-full gap-[0px]">
          <DashboardSideBar navlinks={dashboardNavLinks.admin} />
          <div className="h-full w-full overflow-auto p-[30px]">{children}</div>
        </div>
      </div>
    </Protectedroute>
  );
};

export default layout;
