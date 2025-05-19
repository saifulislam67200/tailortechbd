"use client";

import useCountries, { ICountry } from "@/hooks/useCountries";
import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

const defaultCountry = {
  name: "Bangladesh",
  dial_code: "+880",
  code: "BD",
};
const CountrySelector = ({ onCountrySelect }: { onCountrySelect: (country: ICountry) => void }) => {
  const countries = useCountries();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ICountry>(defaultCountry);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries by search input
  const filtered = countries.data?.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial_code.includes(search)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    onCountrySelect(defaultCountry);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="relative w-full cursor-pointer rounded border border-border-main bg-white px-[12px] py-[6px] text-start text-base text-[12px] font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected?.name || "Select a country"}
        <FaCaretDown
          className={`text-strong absolute top-1/2 right-2 -translate-y-1/2 duration-[0.4s] ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-b border-gray-200 px-3 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filtered?.length > 0 ? (
            filtered.map((country) => (
              <div
                key={country.name}
                className="border-strong/5 cursor-pointer border-b-[1px] px-3 py-2 hover:bg-blue-100"
                onClick={() => {
                  onCountrySelect(country);
                  setSelected(country);
                  setSearch("");
                  setIsOpen(false);
                }}
              >
                ({country.dial_code}) {country.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
