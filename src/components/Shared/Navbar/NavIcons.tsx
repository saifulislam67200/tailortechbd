"use client";

import Link from "next/link";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

interface NavIconsProps {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItemsCount: number;
}

export default function NavIcons({
  setIsSearchOpen,
  setIsCartOpen,
  cartItemsCount,
}: NavIconsProps) {
  return (
    <>
      <button
        className="text-white lg:hidden"
        onClick={() => setIsSearchOpen((prev) => !prev)}
        aria-label="Search"
      >
        <FiSearch size={22} />
      </button>

      <button onClick={() => setIsCartOpen(true)} className="cursor-pointer relative hidden lg:flex text-white" aria-label="Cart">
        <FaCartArrowDown size={22} />
        {cartItemsCount > 0 && (
          <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-danger text-[12px] text-white">
            {cartItemsCount}
          </span>
        )}
      </button>

      <Link href="/wishlist" className="relative  text-white" aria-label="wishlist">
        <FaHeart size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-danger text-[12px] text-white">
          0
        </span>
      </Link>

      <Link href="/compare" className="relative hidden text-white lg:block" aria-label="compare">
        <FiRefreshCw size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-danger text-[12px] text-white">
          0
        </span>
      </Link>
    </>
  );
}
