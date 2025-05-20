import React from "react";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  href?: string;
  linkText?: string;
  className?: string;
}

const Title: React.FC<SectionTitleProps> = ({ title, href, linkText, className }) => {
  return (
    <div className="flex w-full justify-between border-b-[2px]">
      <h2
        className={`clip-path relative -mb-[2px] inline-block bg-black py-[2px] pr-[40px] pl-[8px] text-[14px] font-bold text-white md:text-[20px] ${className}`}
      >
        {title}
      </h2>

      <Link href={`${href}`} className="text-[14px] font-bold text-primary">
        {linkText}
      </Link>
    </div>
  );
};

export default Title;
