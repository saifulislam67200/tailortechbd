"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { IProduct } from "@/types/product";
import { FaEye, FaHeart } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

const ProductHoverIcons = ({
  children,
  className,
  product,
}: {
  children?: React.ReactNode;
  className?: string;
  product: IProduct;
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from wishlist!");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist!");
    }
  };

  return (
    <div
      className={twMerge(
        "absolute top-[20%] right-2 flex -translate-y-1/2 flex-col gap-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
    >
      {children}
      <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
        <FiRefreshCw className="text-[15px]" />
      </button>
      <button
        onClick={handleToggleWishlist}
        className={`cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md ${
          isInWishlist ? "text-red-500" : "hover:bg-[#404040] hover:text-white"
        } `}
      >
        <FaHeart className="text-[15px]" />
      </button>
      <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
        <FaEye className="text-[15px]" />
      </button>
    </div>
  );
};

export default ProductHoverIcons;
