import ProductAddToCartModal from "@/components/ui/ProductAddToCartModal";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import ProductHoverIcons from "./ProductHoverIcons";

interface ProductCardProps {
  product: IProduct;
  className?: string;
}

const ProductSecondaryCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <div className={twMerge("group relative", className)}>
      <div className="group relative h-full overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]">
        {/* Image */}
        <Link href={`/product/${product?.slug}`}>
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
        <Link href={`/product/${product?.slug}`}>
          <div className="p-[8px]">
            <h3 className="line-clamp-1 text-center text-[14px] font-bold hover:text-primary">
              {product.name}
            </h3>
            <h5 className="text-light text-center text-[12px] text-info">
              Product Id: {product.sku}
            </h5>
            <p
              className="mt-1 line-clamp-2 text-center text-[13px]"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            ></p>
            <p className="mt-2 text-center text-[14px] font-bold text-strong">৳ {product.price}</p>
          </div>
        </Link>
      </div>

      <ProductHoverIcons product={product} className="top-[30%]">
        <ProductAddToCartModal product={product}>
          <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
            <FaCartArrowDown className="text-[15px]" />
          </button>
        </ProductAddToCartModal>
      </ProductHoverIcons>
    </div>
  );
};

export default ProductSecondaryCard;
