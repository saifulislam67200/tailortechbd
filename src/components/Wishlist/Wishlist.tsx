"use client";

import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import ProductPrimaryCard from "../ui/Card/ProductCard/ProductPrimaryCard";
// import CategoryProductPagination from "../Category/CategoryProductPagination";
import DataNotFound from "../ui/DataNotFound";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toast } from "sonner";
import { clearWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { LuX } from "react-icons/lu";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state?.wishlist?.items ?? []);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared");
  };

  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <div className="flex flex-wrap items-center justify-between gap-[10px] border-[1px] border-border-muted bg-white p-[16px]">
        <p className="font-bold">
          Favorites <span className="font-[700] text-primary">{wishlistItems?.length || 0}</span>{" "}
          Products Found
        </p>
        {wishlistItems?.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="flex cursor-pointer items-center gap-[5px]"
          >
            <span className="flex cursor-pointer items-center gap-[5px] border-[1px] border-border-muted bg-primary px-[4px] py-[2px] text-[13px] font-bold text-white">
              <LuX />
            </span>
            <span className="text-[14px] font-bold text-primary">Clear All</span>
          </button>
        )}
      </div>

      {wishlistItems.length ? (
        <>
          <div className="mt-4 grid w-full grid-cols-1 justify-center gap-[16px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {wishlistItems?.map((data) => <ProductPrimaryCard key={data._id} product={data} />)}
          </div>
          {/* <CategoryProductPagination totalDoc={wishlistItems?.length} /> */}
        </>
      ) : (
        <DataNotFound title="No Product Found" className="h-[200px]" />
      )}
    </div>
  );
};

export default Wishlist;
