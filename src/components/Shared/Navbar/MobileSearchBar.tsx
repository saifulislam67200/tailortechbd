"use client";

import type React from "react";
import { FaSearch } from "react-icons/fa";

interface MobileSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export default function MobileSearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: MobileSearchBarProps) {
  return (
    <div className="mt-4 lg:hidden">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          placeholder="Enter Your Keyword..."
          className="w-full rounded-[10px] border border-border-main bg-white px-[12px] py-[6px] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 flex h-full cursor-pointer items-center justify-center rounded-r-[10px] bg-primary px-[30px] text-white"
        >
          <FaSearch size={18} />
        </button>
      </form>
    </div>
  );
}
