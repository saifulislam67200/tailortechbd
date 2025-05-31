"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }: { onSearch?: (value: string) => void }) {
  const query = useSearchParams();
  const searchValue = query.get("searchTerm");
  const [debounceValue, setDebounceValue] = useState(searchValue);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data } = useGetAllProductsQuery(
    { searchTerm: debounceValue || "", fields: "name,price,images,colors,slug" },
    {
      skip: !debounceValue,
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const search = form.search?.value || "";
    if (search && search !== searchValue) {
      onSearch?.(search);
      router.push(`/shop?searchTerm=${search}`);
    }

    (form.search as HTMLInputElement)?.blur();
    // Implement search functionality here
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex h-[38px] items-center justify-start gap-[0px] overflow-hidden rounded-[10px] border-[1px] border-border-main bg-white"
      >
        <input
          type="text"
          name="search"
          defaultValue={searchValue || ""}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
          }}
          placeholder="Enter Your Keyword..."
          className="h-full w-full border-none px-[10px] outline-none"
          onChange={(e) => {
            setDebounceValue(e.target.value);
          }}
        />
        <button
          type="submit"
          className="flex h-full cursor-pointer items-center justify-center bg-primary px-[30px] text-white"
        >
          <FaSearch size={18} />
        </button>
      </form>
      {isOpen && data?.data?.length && debounceValue ? (
        <div className="absolute top-[100%] left-0 max-h-[70vh] w-full overflow-auto border-[1px] border-border-muted bg-white">
          {data?.data?.map((product) => (
            <Link
              href={`/product/${product.slug}`}
              key={product._id}
              className="flex items-center justify-start gap-[10px] border-b-[1px] border-border-muted px-[16px] py-[8px] hover:bg-solid-slab/30"
            >
              <span className="aspect-square w-[70px]">
                <Image
                  src={product.images[0] || "/"}
                  alt={product.name}
                  width={70}
                  height={70}
                  className="mx-auto h-full w-auto max-w-full object-contain"
                />
              </span>

              <span className="flex flex-col gap-[5px]">
                <span className="line-clamp-1 text-[14px] font-[700]">{product.name}</span>
                {product.colors?.length && (
                  <span className="flex items-center justify-start gap-[3px] text-[12px] text-muted">
                    <span className="font-[600]">Color :</span>
                    <span>{product.colors.map((color) => color.color).join(" - ")}</span>
                  </span>
                )}
                <span className="text-[12px] font-[600] text-primary">BDT. {product.price}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
