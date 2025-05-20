import React from "react";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { BsDot } from "react-icons/bs";

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
            src={product.colors?.[0]?.images?.[0] || ""}
            alt={product.name}
            fill
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
      <div className="flex flex-col justify-between p-[8px] h-full">
        <Link href={`products/${product?._id}`} className="flex-grow">
          <h3 className="line-clamp-1 text-[14px] font-bold">
            {product.name}
          </h3>

          {/* Specifications list */}
          <ul className="mt-2 space-y-1 text-[13px] text-left min-h-[90px]">
            {product.specifications?.slice(0, 4).map((spec, index) => (
              <li key={index} className="flex items-start gap-1">
                <BsDot className="text-[20px]" />
                <span className="line-clamp-1">{spec.label}: {spec.value}</span>
              </li>
            ))}
          </ul>
        </Link>

        <div className="mt-auto pt-2 text-center">
          <p className="text-[15px] font-semibold text-black">Tk {product.price}</p>
          <button className="mt-1 w-full bg-secondary py-[6px] text-sm font-bold border border-[#c5c5c5] cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
