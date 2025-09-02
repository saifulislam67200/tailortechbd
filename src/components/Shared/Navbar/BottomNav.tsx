"use client";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { RiHome2Line } from "react-icons/ri";

const BottomNav = () => {
  const cartItems = useAppSelector((state) => state?.cart?.items);
  const wishlistItems = useAppSelector((state) => state?.wishlist?.items);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <>
      <nav className="tex fixed right-0 bottom-0 left-0 z-45 flex h-[50px] w-full max-w-screen bg-black text-white lg:hidden">
        <ul className="flex w-full items-center justify-between px-4">
          <li>
            <Link href="/" className="text-white" aria-label="wishlist">
              <RiHome2Line size={20} />
            </Link>
          </li>
          <li>
            <Link href="/wishlist" className="relative text-white" aria-label="wishlist">
              <FaRegHeart size={20} />
              <span className="absolute -top-[9px] -right-[9px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-secondary text-[10px] text-white">
                {wishlistItems?.length || 0}
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer text-white"
              aria-label="Cart"
            >
              <IoCartOutline size={22} />
              <span className="absolute -top-[5px] -right-[9px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-secondary text-[10px] text-white">
                {cartItems?.length}
              </span>
            </button>
          </li>
        </ul>

        <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} cartItems={cartItems} />
      </nav>
    </>
  );
};

export default BottomNav;
