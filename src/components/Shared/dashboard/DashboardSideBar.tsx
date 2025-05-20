"use client";
import { IDashboardNavLinks } from "@/utils/dashboardNavLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import LogoutButton from "../../ui/LogoutButton";
import Logo from "../Logo";

const NavBox = ({ navlink, depth = 0 }: { navlink: IDashboardNavLinks; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = navlink.icon;
  const hasChildren = navlink.children && navlink.children.length > 0;
  const path = usePathname();

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="py-2">
      {hasChildren ? (
        <div
          className="flex cursor-pointer items-center justify-between gap-[8px] text-sm font-medium text-strong hover:text-primary"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-[8px]">
            <Icon className="h-4 w-4" />
            <span className="select-none">{navlink.label}</span>
          </div>

          <BiChevronDown className={`h-4 w-4 ${isOpen ? "rotate-180" : ""} duration-[0.3s]`} />
        </div>
      ) : (
        <Link
          href={navlink.path || "#"}
          className={`flex cursor-pointer items-center gap-2 text-sm font-medium hover:text-primary ${
            path === navlink.path ? "text-primary" : "text-strong"
          }`}
          onClick={handleToggle}
        >
          <Icon className="h-4 w-4" />
          <span className="select-none">{navlink.label}</span>
        </Link>
      )}

      {hasChildren && isOpen && (
        <div className="mt-1 ml-4 border-l border-border-muted pl-2">
          {navlink.children?.map((child, index) => (
            <NavBox key={index} navlink={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardSideBar = ({ navlinks }: { navlinks: IDashboardNavLinks[] }) => {
  return (
    <div className="flex h-full w-[256px] shrink-0 flex-col justify-between border-r-[1px] border-border-muted bg-white p-4">
      <div className="flex flex-col">
        <Logo className="text-strong" />
        <span className="my-[20px] h-[1px] w-full bg-border-muted" />
        <div className="gap-[] flex flex-col">
          {navlinks?.map((link, index) => (
            <NavBox navlink={link} key={index + (link.path || "parent")} />
          ))}
        </div>
      </div>
      <LogoutButton className="w-full bg-danger" />
    </div>
  );
};

export default DashboardSideBar;
