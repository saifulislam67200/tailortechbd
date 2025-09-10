"use client";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const routes = [
  {
    name: "Orders",
    path: "/account/orders",
    role: "user",
  },
  {
    name: "Profile",
    path: "/account/profile",
    role: "*",
  },
  {
    name: "Favorite",
    path: "/account/favorite",
    role: "user",
  },
  {
    name: "Complain & Suggestion Box",
    path: "/account/complain-suggestion",
    role: "user",
  }
];
const AccountRouting = () => {
  const path = usePathname();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="w-full border-[1px] border-border-muted bg-white p-[4px]">
      <div className="flex w-full flex-col border-[1px] border-border-main">
        {routes.map((route) => (
          <>
            {route.role === "*" || route.role == user?.role ? (
              <Link
                href={route.path}
                key={route.path}
                className={`center w-full border-b-[1px] border-border-main px-[20px] py-[5px] font-[700] ${route.path === path ? "bg-primary-foreground text-white" : ""}`}
              >
                {route.name}
              </Link>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default AccountRouting;
