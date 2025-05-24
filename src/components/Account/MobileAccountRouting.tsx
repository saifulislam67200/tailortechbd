"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { routes } from "./AccountRouting";

const MobileAccountRouting = () => {
  const pathname = usePathname();
  return (
    <div className="scrollbar-hide w-full overflow-x-auto border-b border-border-main whitespace-nowrap lg:hidden">
      <div className="flex gap-[8px] px-[16px] py-[12px]">
        {routes.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 rounded-lg border border-border-main px-[12px] py-[6px] text-[14px] transition-all ${
                isActive ? "bg-primary font-semibold text-white" : "hover:bg-gray-100"
              }`}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAccountRouting;
