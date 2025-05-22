"use client";

import type React from "react";

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
import TopBar from "./TopBar";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const cartItems = useAppSelector((state) => state?.cart?.items);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    setIsSearchOpen(false);
  };

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
      <TopBar />
      <nav className="sticky top-0 z-10 bg-black px-[16px] py-[10px]">
        <div className="main_container mx-auto flex items-center justify-between">
          {/* Hamburger Menu - Mobile only */}
          <div className="mr-[0px] sm:mr-[10px] lg:mr-[0px] lg:hidden">
            <button className="text-white" onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>

          {/* Logo */}
          <Logo />

          {/* Search Bar - Desktop only */}
          <div className="mx-4 hidden max-w-[704px] flex-grow lg:block xl:-mr-[42px]">
            <SearchBar />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <NavIcons setIsSearchOpen={setIsSearchOpen} setIsCartOpen={setIsCartOpen} />

            {user ? (
              <UserDropdown />
            ) : (
              <Link href={"/login"} className="text-white">
                <FaCircleUser size={22} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Toggled by search icon */}
        {isSearchOpen && (
          <MobileSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            setIsSearchOpen={setIsSearchOpen}
          />
        )}
      </nav>

      <CategoryMenu />
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} cartItems={cartItems} />

      {/* Mobile Menu Drawer */}
      <MenuDrawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
