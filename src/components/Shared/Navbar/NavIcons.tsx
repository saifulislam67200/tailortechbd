"use client";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiRefreshCw, FiSearch } from "react-icons/fi";

interface NavIconsProps {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function NavIcons({ setIsSearchOpen, setIsCartOpen }: NavIconsProps) {
  const cartItems = useAppSelector((state) => state?.cart?.items);
  const wishlistItems = useAppSelector((state) => state?.wishlist?.items);

  return (
    <>
      <button
        className="text-black lg:hidden"
        onClick={() => setIsSearchOpen((prev) => !prev)}
        aria-label="Search"
      >
        <FiSearch size={22} />
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative hidden cursor-pointer text-primary lg:flex"
        aria-label="Cart"
      >
        <FaCartArrowDown size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[12px] text-white">
          {cartItems?.length}
        </span>
      </button>

      <Link href="/wishlist" className="relative text-primary" aria-label="wishlist">
        <FaHeart size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[12px] text-white">
          {wishlistItems?.length || 0}
        </span>
      </Link>

      <Link href="/compare" className="relative hidden text-primary lg:block" aria-label="compare">
        <FiRefreshCw size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[12px] text-white">
          0
        </span>
      </Link>
    </>
  );
}
