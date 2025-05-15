"use client";

import type React from "react";

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import UserDropdown from "./UserDropdown";
import MobileSearchBar from "./MobileSearchBar";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import Link from "next/link";
import TopBar from "./TopBar";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import CategoryMenu from "./NavCategory/CategoryMenu";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
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

  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <header>
      <TopBar />
      <nav className="relative z-10 bg-black px-[16px] py-[16px]">
        <div className="container mx-auto flex items-center justify-between">
          {/* Hamburger Menu - Mobile only */}
          <div className="md:hidden">
            <button className="text-white" onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center md:flex-none md:justify-start">
            <Link href={"/"} className="text-[28px] font-bold text-white">
              Bd<span className="text-primary">Shop</span>
            </Link>
          </div>

          {/* Search Bar - Desktop only */}
          <div className="mx-4 hidden max-w-[502px] flex-grow md:block">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <NavIcons
              setIsSearchOpen={setIsSearchOpen}
              setIsCartOpen={setIsCartOpen}
              cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
            />

            <UserDropdown isOpen={isUserDropdownOpen} setIsOpen={setIsUserDropdownOpen} />
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
    </header>
  );
}
