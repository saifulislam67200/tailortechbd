"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
const PrimaryProductCardImages = ({
  product,
  isAllStockOut,
}: {
  product: IProduct;
  isAllStockOut?: boolean;
}) => {
  return (
    <Link
      href={`/product/${product?.slug}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("#product-video")) {
          e.preventDefault();
        }
      }}
      className="relative flex aspect-[360/450] w-full shrink-0 items-center justify-start overflow-hidden bg-white"
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
            width={1000}
            height={1000}
            className="relative z-[1] mx-auto h-full w-auto max-w-full object-cover transition-transform duration-300"
          />
          <Image
            src={product.images?.[1] || "/images/category_blank.png"}
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
  );
};

export default PrimaryProductCardImages;
