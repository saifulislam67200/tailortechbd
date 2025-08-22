"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
const PrimaryProductCardImages = ({
  product,
  isAllStockOut,
}: {
  product: IProduct;
  isAllStockOut?: boolean;
}) => {
  const [isVideoNeedToShow, setIsVideoNeedToShow] = useState(false);
  return (
    <Link
      href={`/product/${product?.slug}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("#product-video")) {
          e.preventDefault();
        }
      }}
      className="relative flex aspect-square h-[120px] w-full shrink-0 items-center justify-start overflow-hidden bg-white sm:h-[227px]"
    >
      {isAllStockOut && (
        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
          Out of Stock
        </span>
      )}
      {product.video ? (
        <div
          id="product-video"
          onClick={() => setIsVideoNeedToShow(true)}
          className="relative z-[1] mx-auto h-full w-auto max-w-full"
        >
          {isVideoNeedToShow ? (
            <video src={product.video} className="h-full w-full object-contain" controls />
          ) : (
            <>
              <Image
                src={product.videoThumbnail || product.images[0]}
                alt={product.name}
                width={200}
                height={200}
                className="mx-auto h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <FaPlay className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[30px] text-white" />
            </>
          )}
        </div>
      ) : product.images[1] ? (
        <>
          <Image
            src={product.images?.[0] || "/images/category_blank.png"}
            alt={product.name}
            width={200}
            height={200}
            className="relative z-[1] mx-auto h-full w-auto max-w-full object-contain transition-transform duration-300"
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
