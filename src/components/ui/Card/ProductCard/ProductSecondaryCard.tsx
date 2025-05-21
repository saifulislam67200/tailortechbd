import ProductAddToCartModal from "@/components/ui/ProductAddToCartModal";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import ProductHoverIcons from "./ProductHoverIcons";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative">
      <div className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]">
        {/* Image */}
        <Link href={`products/${product?._id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images?.[0] || "/"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Content section */}
        <Link href={`products/${product?._id}`}>
          <div className="p-[8px]">
            <h3 className="line-clamp-1 text-center text-[14px] font-bold hover:text-[#0d6efd]">
              {product.name}
            </h3>
            <p
              className="mt-1 line-clamp-2 text-center text-[13px]"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
            <p className="mt-2 text-center text-[14px] font-bold text-strong">Tk {product.price}</p>
          </div>
        </Link>
      </div>

      <ProductHoverIcons className="top-[30%]">
        <ProductAddToCartModal product={product}>
          <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
            <FaCartArrowDown className="text-[15px]" />
          </button>
        </ProductAddToCartModal>
      </ProductHoverIcons>
    </div>
  );
};

export default ProductCard;
