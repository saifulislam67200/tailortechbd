"use client";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

interface NavIconsProps {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: (isOpen: boolean) => void;
}

export default function NavIcons({ setIsSearchOpen, setIsCartOpen }: NavIconsProps) {
  const cartItems = useAppSelector((state) => state?.cart?.items);
  const wishlistItems = useAppSelector((state) => state?.wishlist?.items);
  const [isMouseOver, setIsMouseOver] = useState({ cartItems: false, wishlistItems: false });

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
        className="relative cursor-pointer text-primary"
        aria-label="Cart"
        onMouseOver={() => setIsMouseOver((prev) => ({ ...prev, cartItems: true }))}
        onMouseLeave={() => setIsMouseOver((prev) => ({ ...prev, cartItems: false }))}
      >
        <FaCartArrowDown size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[12px] text-white">
          {cartItems?.length}
        </span>
        {isMouseOver.cartItems && (
          <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
            View Cart
          </div>
        )}
      </button>

      <Link
        href="/wishlist"
        className="relative text-primary"
        aria-label="wishlist"
        onMouseOver={() => setIsMouseOver((prev) => ({ ...prev, wishlistItems: true }))}
        onMouseLeave={() => setIsMouseOver((prev) => ({ ...prev, wishlistItems: false }))}
      >
        <FaHeart size={22} />
        <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-secondary text-[12px] text-white">
          {wishlistItems?.length || 0}
        </span>

        {isMouseOver.wishlistItems && (
          <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
            Wishlist
          </div>
        )}
      </Link>
    </>
  );
}
