import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  title: string;
  href?: string;
  linkText?: string;
  className?: string;
}

const Title: React.FC<SectionTitleProps> = ({ title, href, linkText, className }) => {
  return (
    <div className="flex w-full justify-between border-b-[2px] border-primary">
      <h2
        className={twMerge(
          "clip-path relative -mb-[2px] inline-block bg-primary py-[2px] pr-[40px] pl-[8px] text-[14px] font-bold text-white md:text-[14px]",
          className
        )}
      >
        {title}
      </h2>

      {href && linkText && (
        <Link
          href={href}
          className="clip-path relative -mb-[2px] inline-block bg-primary py-[2px] pr-[8px] pl-[40px] text-[14px] font-bold text-white md:text-[14px]"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default Title;
