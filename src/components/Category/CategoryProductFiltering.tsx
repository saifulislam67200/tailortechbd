"use client";

import useSetSearchParams from "@/hooks/useSetSearchParams";
import { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import Input from "../ui/Input";
import SelectionBox from "../ui/SelectionBox";
const sortingOptions = [
  {
    label: "Display Latest First",
    value: "-createdAt",
  },
  {
    label: "Display Oldest First",
    value: "createdAt",
  },
  {
    label: "Price: High to Low",
    value: "-price",
  },
  {
    label: "Price: Low to High",
    value: "price",
  },
  {
    label: "Most Popular",
    value: "-avgRating",
  },
];

const CategoryProductFiltering = () => {
  const { updateSearchParams, searchParams } = useSetSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = inputRef.current?.value || "";
    updateSearchParams({ searchTerm, page: "1" });
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.value = searchParams.get("searchTerm") || "";
    }
  }, [searchParams]);
  return (
    <div className="flex flex-wrap items-center justify-start gap-[15px]">
      <form
        onSubmit={handleSearchTermSubmit}
        className="flex h-[40px] w-full shrink-0 items-center justify-between border-[1px] border-border-muted sm:w-[300px]"
      >
        <Input
          ref={inputRef}
          name="searchTerm"
          className="h-full border-none"
          placeholder="Search"
        />
        <button className="flex h-full w-[50px] cursor-pointer items-center justify-center bg-primary text-[20px] text-white">
          <IoIosSearch />
        </button>
      </form>
      <div className="flex flex-col items-start justify-start gap-[5px] sm:flex-row sm:items-center">
        <span className="text-[14px] font-[600] text-strong">Sort By:</span>
        <SelectionBox
          className="w-[200px]"
          showSearch={false}
          data={sortingOptions}
          onSelect={(data) => {
            updateSearchParams({ sort: data.value });
          }}
        />
      </div>
    </div>
  );
};

export default CategoryProductFiltering;
