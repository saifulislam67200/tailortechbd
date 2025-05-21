"use client";

import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IProduct } from "@/types/product";
import Image from "next/image";
import React from "react";
import { FaCartArrowDown, FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleAddCart = (product: IProduct) => {
    const cartData = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      discount: product?.discount,
      quantity: 1,
      image: product?.images?.[0] || "",
      color: product?.colors?.[0]?.color || "",
      size: product?.colors?.[0]?.sizes?.[0]?.size || "",
      stock: product?.colors?.[0]?.sizes?.[0]?.stock || 0,
    };

    dispatch(addToCart(cartData));
    toast.success(`${product.name} added to cart`);
  };

  const handleProductDetails = (slug: string) => {
    router.push(`/product-details/${slug}`)
  };


  return (
    <div className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.colors?.[0]?.images?.[0] || "/"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          onClick={() => handleProductDetails(product?.slug)}
        />
      </div>

      {/* Icons */}
      <div className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col gap-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => handleAddCart(product)}
          className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white"
        >
          <FaCartArrowDown className="text-[15px]" />
        </button>
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
      <div
        onClick={() => handleProductDetails(product?.slug)}
      >
        <div className="p-[8px]">
          <h3 className="line-clamp-1 text-center text-[14px] font-bold hover:text-[#0d6efd] cursor-pointer">
            {product.name}
          </h3>
          <p
            className="mt-1 line-clamp-2 text-center text-[13px]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></p>
          <p className="mt-2 text-center text-[14px] font-bold text-strong">Tk {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;