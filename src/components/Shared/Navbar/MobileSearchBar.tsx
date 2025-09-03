"use client";

import SearchBar from "./SearchBar";

interface MobileSearchBarProps {
  setIsSearchOpen: (isOpen: boolean) => void;
}

export default function MobileSearchBar({ setIsSearchOpen }: MobileSearchBarProps) {
  return (
    <div className="z-50 mt-4 w-full lg:hidden">
      <SearchBar onSearch={() => setIsSearchOpen(false)} />
    </div>
  );
}
