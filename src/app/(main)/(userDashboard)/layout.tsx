import AccountDisplayBox from "@/components/Account/AccountDisplayBox";
import AccountRouting from "@/components/Account/AccountRouting";
import MobileAccountRouting from "@/components/Account/MobileAccountRouting";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import Protectedroute from "@/provider/Protectedroute";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Protectedroute role="*" checkVerification={true}>
      <div className="main_container flex min-h-[100dvh] flex-col gap-[8px] py-[20px]">
        <Breadcrumb />
        <div className="w-full items-start justify-start gap-[8px] lg:flex">
          <div className="hidden w-[25%] shrink-0 flex-col gap-[8px] lg:flex">
            <AccountDisplayBox />
            <AccountRouting />
          </div>
          <MobileAccountRouting />

          <div className="w-full">{children}</div>
        </div>
      </div>
    </Protectedroute>
  );
}
