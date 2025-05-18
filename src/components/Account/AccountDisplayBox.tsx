"use client";

import { useAppSelector } from "@/hooks/redux";
import { FaUser } from "react-icons/fa6";

const AccountDisplayBox = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="/20 flex w-full items-center justify-start gap-[20px] border-[1px] border-border-muted bg-white p-[16px]">
      {user?.avatar ? "" : <FaUser className="text-[50px] text-strong" />}
      <div className="flex flex-col gap-[5px]">
        <span className="fot-[600] line-clamp-1 text-[16px] font-[700] text-strong">
          {user?.fullName || "N/A"}
        </span>
        <span className="fot-[600] line-clamp-1 text-[13px] font-[600] text-muted">
          {user?.phoneNumber || "N/A"}
        </span>
        <span className="fot-[600] line-clamp-1 text-[13px] font-[600] text-muted">
          {user?.email || "N/A"}
        </span>
      </div>
    </div>
  );
};

export default AccountDisplayBox;
