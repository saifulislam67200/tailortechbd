import { IProduct } from "@/types/product";
import { getProductDiscountPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import ProductAddToCartModal from "../../ProductAddToCartModal";
import ProductHoverIcons from "./ProductHoverIcons";
const ProductPrimaryCard = ({ product, className }: { product: IProduct; className?: string }) => {
  return (
    <div
      className={twMerge(
        "group relative flex h-full flex-col justify-between overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]",
        className
      )}
    >
      {product.discount ? (
        <span className="absolute top-0 right-0 z-[3] line-clamp-1 bg-secondary px-[4px] py-[2px] text-[12px] text-white">
          {/* Save {Math.ceil(getProductDiscountPrice(product.price, product.discount))} ৳ */}
          Save {product?.discount}% Off
        </span>
      ) : (
        ""
      )}

      {/* Image */}
      <Link
        href={`/product/${product?.slug}`}
        className="flex h-[227px] w-full shrink-0 items-center justify-start overflow-hidden bg-white"
      >
        <Image
          src={product.images?.[0] || "/"}
          alt={product.name}
          width={200}
          height={200}
          className="mx-auto h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Icons */}
      <ProductHoverIcons product={product} />

      {/* Content section */}
      <div className="flex h-full flex-col justify-between p-[8px]">
        <Link href={`/product/${product?.slug}`} className="line-clamp-1 hover:text-secondary">
          <span className="text-[14px] font-bold">{product.name}</span>
        </Link>

        <div className="mt-[10px] flex flex-col gap-[5px]">
          <p className="line-clamp-1 text-[12px] font-semibold text-black">
            Color: {product.colors?.map((color) => color.color).join(", ")}
          </p>
          <p className="line-clamp-1 text-[12px] font-semibold text-black">
            Size: {product.colors?.[0]?.sizes?.map((color) => color.size?.toUpperCase()).join(", ")}
          </p>
        </div>
        <div className="flex flex-col gap-[20px] pt-2 text-start">
          {product.discount ? (
            <span className="flex flex-col justify-start gap-[5px] sm:flex-row sm:items-center">
              <p className="text-[15px] font-[700]">
                ৳ {getProductDiscountPrice(product.price, product.discount)}
              </p>
              <p className="text-[13px] font-[700] text-info line-through">৳ {product.price}</p>
            </span>
          ) : (
            <p className="text-[15px] font-[700] text-black">৳ {product.price}</p>
          )}
          <ProductAddToCartModal product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPrimaryCard;
