import { IProduct } from "@/types/product";
import { getProductDiscountPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import ProductAddToCartModal from "../../ProductAddToCartModal";
import ProcutCheckout from "./ProcutCheckout";
import ProductHoverIcons from "./ProductHoverIcons";
import ProductQuickOverviewModal from "@/components/Dashboard/Product/ProductQuickOverviewModal";

const ProductPrimaryCard = ({ product, className }: { product: IProduct; className?: string }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const isAllStockOutFunctional = (colors): boolean => {
    try {
      if (!Array.isArray(colors) || colors.length === 0) {
        return true;
      }

      return !colors.some((color) => {
        if (!color || !Array.isArray(color.sizes)) {
          return false;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return color.sizes.some((size) => {
          if (!size || typeof size.stock === "undefined") {
            return false;
          }

          const stock = parseInt(size.stock.toString(), 10);

          return !isNaN(stock) && stock > 0;
        });
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Error checking stock status:", errorMessage);

      return true;
    }
  };

  const isAllStockOut = isAllStockOutFunctional(product?.colors || []);

  return (
    <div
      className={twMerge(
        "group relative flex h-full flex-col justify-between overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]",
        className
      )}
    >
      {product.discount ? (
        <span className="absolute top-0 right-0 z-[3] line-clamp-1 bg-secondary px-[4px] py-[2px] text-[10px] text-white sm:text-[12px]">
          {/* Save {Math.ceil(getProductDiscountPrice(product.price, product.discount))} ৳ */}
          Save {product?.discount}% Off
        </span>
      ) : (
        ""
      )}

      {/* Image */}
      <Link
        href={`/product/${product?.slug}`}
        className="relative flex aspect-square h-[120px] w-full shrink-0 items-center justify-start overflow-hidden bg-white sm:h-[227px]"
      >
        {isAllStockOut && (
          <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
            Out of Stock
          </span>
        )}

        {product.images[1] ? (
          <>
            <Image
              src={product.images?.[0] || "/images/category_blank.png"}
              alt={product.name}
              width={200}
              height={200}
              className="relative z-[1] mx-auto h-full w-auto max-w-full object-contain transition-transform duration-300"
            />
            <Image
              src={product.images?.[1] || "//images/category_blank.png"}
              alt={product.name}
              width={200}
              height={200}
              className="absolute top-0 left-[50%] z-[2] mx-auto h-full w-auto max-w-full translate-x-[-50%] object-contain opacity-[0] duration-[0.4s] group-hover:opacity-[1]"
            />
          </>
        ) : (
          <Image
            src={product.images?.[0] || "/images/category_blank.png"}
            alt={product.name}
            width={200}
            height={200}
            className="mx-auto h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      {/* Icons */}
      <ProductHoverIcons product={product} />

      {/* Content section */}
      <div className="flex h-full flex-col justify-between p-[8px]">
        <Link href={`/product/${product?.slug}`} className="line-clamp-1 hover:text-secondary">
          <span className="text-[14px] font-bold">{product.name}</span>
        </Link>
        <span className="text-[12px] font-light text-info"> {product?.sku}</span>

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
          <div className="flex w-full flex-col items-center justify-center gap-[10px] md:flex-row">
            <ProductAddToCartModal product={product} isAllStockOut={isAllStockOut} />

            {isAllStockOut ? (
              <ProductQuickOverviewModal product={product} isAllStockOut={isAllStockOut} />
            ) : (
              <ProcutCheckout product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrimaryCard;
