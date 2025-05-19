"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const routes = [
  {
    name: "Orders",
    path: "/account/orders",
  },
  {
    name: "Profile",
    path: "/account/profile",
  },
  {
    name: "Favourite",
    path: "/account/favourite",
  },
];
const AccountRouting = () => {
  const path = usePathname();
  return (
    <div className="w-full border-[1px] border-border-muted bg-white p-[4px]">
      <div className="flex w-full flex-col border-[1px] border-border-main">
        {routes.map((route) => (
          <Link
            href={route.path}
            key={route.path}
            className={`center w-full border-b-[1px] border-border-main px-[20px] py-[5px] font-[700] ${route.path === path ? "bg-primary-foreground text-white" : ""}`}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountRouting;
