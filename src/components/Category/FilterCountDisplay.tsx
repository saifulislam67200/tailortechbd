"use client";

import useSetSearchParams from "@/hooks/useSetSearchParams";
import { LuX } from "react-icons/lu";

const queryFields = [
  {
    value: "sort",
    label: "Sort By",
  },
  {
    value: "searchTerm",
    label: "Search",
  },
];
const FilterCountDisplay = () => {
  const { searchParams, clearSearchParams, updateSearchParams } = useSetSearchParams();

  const paramsNames = queryFields
    .filter((field) => searchParams.get(field.value))
    .map((field) => field);

  return (
    <>
      {paramsNames.length > 0 && (
        <div className="flex items-center gap-[5px]">
          {paramsNames.map(({ label, value }, i) => (
            <span
              key={i}
              onClick={() => {
                updateSearchParams({ [value]: undefined });
              }}
              className="flex cursor-pointer items-center gap-[5px] border-[1px] border-border-muted bg-primary px-[4px] py-[2px] text-[13px] font-bold text-white"
            >
              {label} <LuX />
            </span>
          ))}
          <button
            onClick={() => {
              clearSearchParams();
            }}
            className="cursor-pointer text-[14px] font-bold text-primary"
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
};

export default FilterCountDisplay;
