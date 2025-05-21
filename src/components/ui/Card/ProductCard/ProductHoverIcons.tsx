"use client";

import { FaEye, FaHeart } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const ProductHoverIcons = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "absolute top-[20%] right-2 flex -translate-y-1/2 flex-col gap-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
    >
      {children}
      <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
        <FiRefreshCw className="text-[15px]" />
      </button>
      <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
        <FaHeart className="text-[15px]" />
      </button>
      <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
        <FaEye className="text-[15px]" />
      </button>
    </div>
  );
};

export default ProductHoverIcons;
