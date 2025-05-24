"use client";

import { truncateChars, truncateWords } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
const DashboardPageHeadingTitle = ({ title }: { title: string }) => {
  const path = usePathname();
  const pathSegments = path.split("/").filter((segment) => segment);
  return (
    <div className="flex flex-col gap-[5px]">
      <h3 className="text-[25px] font-[700] text-dashboard">{title}</h3>
      {pathSegments.length === 0 ? (
        <span className="text-[14px] text-primary-foreground">Dashboard</span>
      ) : (
        <div className="flex items-center justify-start gap-[8px]">
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            return (
              <Fragment key={href}>
                {!isLast ? (
                  <>
                    <Link href={href} className="text-[14px] capitalize hover:text-primary">
                      {truncateChars(segment.replace(/-/g, " ") as string, 10)}
                    </Link>

                    <span>/</span>
                  </>
                ) : (
                  <span className="text-[14px] font-[600] text-primary capitalize">
                    {truncateWords(segment.replace(/-/g, " ") as string, 10)}
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPageHeadingTitle;
