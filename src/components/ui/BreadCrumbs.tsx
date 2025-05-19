"use client";
import { truncateChars, truncateWords } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="flex w-full flex-wrap items-center justify-start gap-[7px] bg-white px-[16px] py-[6.4px] text-[10px] leading-[150%] font-medium">
      {pathSegments.length === 0 ? (
        <span className="text-[14px] text-primary-foreground">Home</span>
      ) : (
        <>
          <Link
            href="/"
            className="flex w-fit items-center justify-start gap-[6px] text-[14px] text-primary-foreground hover:text-primary"
          >
            <IoIosHome /> Home
          </Link>

          <FaLongArrowAltRight className="h-[16px] w-[14px]" />

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

                    <FaLongArrowAltRight className="h-[16px] w-[14px]" />
                  </>
                ) : (
                  <span className="text-[14px] text-primary capitalize">
                    {truncateWords(segment.replace(/-/g, " ") as string, 10)}
                  </span>
                )}
              </Fragment>
            );
          })}
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
