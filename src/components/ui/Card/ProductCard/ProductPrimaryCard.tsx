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
      {/* Image */}
      <Link
        href={`/product/${product?.slug}`}
        className="flex aspect-square max-h-[279px] w-full items-center justify-start bg-white"
      >
        <Image
          src={product.images?.[0] || "/"}
          alt={product.name}
          width={200}
          height={200}
          className="mx-auto h-full w-auto max-w-full object-contain"
        />
      </Link>

      {/* Icons */}
      <ProductHoverIcons product={product} />

      {/* Content section */}
      <div className="flex h-full flex-col justify-between p-[8px]">
        <Link href={`/product/${product?.slug}`} className="line-clamp-2 hover:text-secondary">
          <span className="text-[14px] font-bold">{product.name}</span>
        </Link>

        <div className="mt-[10px] flex flex-col gap-[5px]">
          <p className="text-[12px] font-semibold text-black">
            Color: {product.colors?.map((color) => color.color).join(", ")}
          </p>
          <p className="text-[12px] font-semibold text-black">
            Size: {product.colors?.[0]?.sizes?.map((color) => color.size?.toUpperCase()).join(", ")}
          </p>
        </div>
        <div className="mt-auto flex flex-col gap-[20px] pt-2 text-start">
          {product.discount ? (
            <span className="flex flex-col justify-start gap-[5px] sm:flex-row sm:items-center">
              <p className="text-[15px] font-[700] text-primary/50 line-through">
                Tk {product.price}
              </p>
              <p className="text-[15px] font-[700] text-primary">
                Tk {getProductDiscountPrice(product.price, product.discount)}
              </p>
            </span>
          ) : (
            <p className="text-[15px] font-[700] text-black">Tk {product.price}</p>
          )}
          <ProductAddToCartModal product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPrimaryCard;
