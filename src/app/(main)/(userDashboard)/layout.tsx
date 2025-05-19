import AccountDisplayBox from "@/components/Account/AccountDisplayBox";
import AccountRouting from "@/components/Account/AccountRouting";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="main_container flex min-h-[100dvh] flex-col gap-[8px] py-[20px]">
      <Breadcrumb />
      <div className="flex w-full items-start justify-start gap-[8px]">
        <div className="flex w-[25%] shrink-0 flex-col gap-[8px]">
          <AccountDisplayBox />
          <AccountRouting />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
