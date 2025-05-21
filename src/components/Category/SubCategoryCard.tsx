import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";

interface ProductCardProps {
  product: IProduct;
}

const SubCategoryCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]">
      {/* Image */}
      <Link href={`products/${product?._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images?.[0] || "/"}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Icons */}
      <div className="absolute top-[20%] right-2 flex -translate-y-1/2 flex-col gap-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
          <FiRefreshCw className="text-[15px]" />
        </button>
        <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
          <FaHeart className="text-[15px]" />
        </button>
        <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
          <FaEye className="text-[15px]" />
        </button>
      </div>

      {/* Content section */}
      <div className="flex h-full flex-col justify-between p-[8px]">
        <Link href={`products/${product?._id}`} className="flex-grow">
          <h3 className="line-clamp-1 text-[14px] font-bold">{product.name}</h3>
        </Link>

        <div className="mt-auto pt-2 text-center">
          <p className="text-[15px] font-semibold text-black">Tk {product.price}</p>
          <button className="mt-1 w-full cursor-pointer border border-[#c5c5c5] bg-secondary py-[6px] text-sm font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
