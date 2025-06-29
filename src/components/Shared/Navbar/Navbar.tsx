"use client";

import { MenuIcon } from "@/components/icons/MenuIcon";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import Logo from "../Logo";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import MobileSearchBar from "./MobileSearchBar";
import CategoryMenu from "./NavCategory/CategoryMenu";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
// import TopBar from "./TopBar";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const cartItems = useAppSelector((state) => state?.cart?.items);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen, isMenuOpen]);

  return (
    <>
      {/* <TopBar /> */}
      <nav className="sticky top-0 z-10 border-b-[1px] border-border-muted bg-white py-[10px]">
        <div className="main_container mx-auto flex items-center justify-between">
          {/* Hamburger Menu - Mobile only */}
          <div className="flex items-center justify-between gap-[10px]">
            <button
              className="mr-[0px] text-black sm:mr-[10px] lg:mr-[0px] lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>

            {/* Logo */}
            <Logo />
          </div>

          {/* Search Bar - Desktop only */}
          <div className="hidden lg:-ml-[102px] lg:block">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <NavIcons setIsSearchOpen={setIsSearchOpen} setIsCartOpen={setIsCartOpen} />

            {user ? (
              <UserDropdown />
            ) : (
              <Link
                href={"/login"}
                className="hidden text-primary lg:block"
                onMouseOver={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
              >
                <div className="relative">
                  <FaCircleUser size={22} />

                  {isMouseOver && (
                    <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
                      Profile
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Toggled by search icon */}
        {isSearchOpen && <MobileSearchBar setIsSearchOpen={setIsSearchOpen} />}
      </nav>

      <CategoryMenu />
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} cartItems={cartItems} />

      {/* Mobile Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
