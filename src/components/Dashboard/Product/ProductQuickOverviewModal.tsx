"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
// import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetProductByProductSlugQuery } from "@/redux/features/product/product.api";
import { useGetAllReviewByProductIdQuery } from "@/redux/features/review/review.api";
import { IColor, IProduct, ISize } from "@/types/product";
import Image from "next/image";
import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { LuX } from "react-icons/lu";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";

interface Props {
  children?: ReactNode;
  product: Pick<IProduct, "_id" | "colors" | "images" | "name" | "price" | "discount" | "slug">;
}

const ProductQuickOverviewModal = ({ children, product: clickedProduct }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  //   const dispatch = useDispatch();
  const slug = clickedProduct?.slug || "";

  const {
    data: clickedProductData,
    isLoading,
    isError,
  } = useGetProductByProductSlugQuery(slug, {
    skip: !slug || !isOpen,
  });

  const product = clickedProductData?.data as IProduct;
  const { data: productReviews } = useGetAllReviewByProductIdQuery(product?._id, {
    skip: !slug || !isOpen,
  });

  console.log(product, "product");
  console.log(productReviews, "productReviews");

  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  const [selectedSize, setSelectedSize] = useState<ISize | undefined>();

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.colors[0]?.sizes?.[0]);
    }
  }, [product]);

  //   const getColorVariantImage = (colorName: string): string => {
  //     if (!product?.colors || !Array.isArray(product.colors)) {
  //       return product?.images?.[0] || "";
  //     }

  //     const colorVariant = product.colors.find(
  //       (color) => color?.color?.toLowerCase() === colorName.toLowerCase().trim()
  //     );

  //     return colorVariant?.images?.[0] || product?.images?.[0] || "";
  //   };

  const handleClick = () => {
    setIsOpen(true);
  };

  //   const handleAddToCart = () => {
  //     if (!selectedColor || !selectedSize) {
  //       return toast.error("Please select a color and size.", {
  //         id: "productSelectionToastId",
  //       });
  //     }
  //     const payload = {
  //       discount: product?.discount,
  //       id: `${product._id}-${selectedColor!.color.trim()}-${selectedSize!.size.trim()}`,
  //       name: product?.name,
  //       price: product?.price,
  //       quantity: 1,
  //       size: selectedSize?.size || "",
  //       stock: selectedSize?.stock || 0,
  //       color: selectedColor?.color || "",
  //       image: getColorVariantImage(selectedColor?.color || ""),
  //       slug: product?.slug,
  //     };
  //     dispatch(addToCart(payload));
  //     setIsOpen(false);
  //   };

  return (
    <>
      {children && isValidElement(children) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, { onClick: handleClick })
      ) : (
        <button
          onClick={handleClick}
          title="Quick overview"
          className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white"
        >
          <FaEye className="text-[15px]" />
        </button>
      )}

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        {isLoading ? (
          <span className="center h-[500px] w-full bg-gray-100">
            <FaSpinner className="animate-spin text-[27px]" />
          </span>
        ) : isError || !product ? (
          <div className="flex h-[300px] w-[300px] flex-col items-center justify-center gap-2 bg-white text-center md:w-[400px]">
            <h2 className="text-lg font-semibold text-red-500">Failed to load product details.</h2>
            <p className="text-sm text-info">Something went wrong. Please try again.</p>
            <Button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => setIsOpen(true), 100);
              }}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="w-full bg-white p-[16px]">
            <div className="flex items-center justify-between">
              <h5 className="text-[20px] font-[700] text-strong">Quick Overview</h5>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <LuX />
              </button>
            </div>
            <HorizontalLine className="my-[20px]" />

            <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
              <div className="relative aspect-square w-full max-w-[200px] shrink-0 md:max-w-[300px]">
                {selectedColor &&
                  selectedSize &&
                  selectedColor?.sizes?.find((s) => s.size === selectedSize.size)?.stock === 0 && (
                    <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                      Out of Stock
                    </span>
                  )}
                <Image
                  src={
                    selectedColor?.images?.[0] || product?.images[0] || "/images/category_blank.png"
                  }
                  alt={product?.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <h3 className="line-clamp-2 text-[20px] font-[700]">{product?.name}</h3>
                <span className="flex items-center gap-[5px]">
                  <div className="flex items-center gap-[5px] text-[12px] text-primary">
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                  </div>
                  <span className="text-[12px]">reviews({productReviews?.data?.length})</span>
                </span>
                <span className="h-[55px] w-[150px] bg-quaternary/30 px-[8px] py-[5px] font-bold text-primary">
                  <span className="block text-[12px] font-normal text-primary-foreground">
                    {product?.discount ? "Special Price" : "Price"}
                  </span>{" "}
                  ৳ {Math.round(product?.price - product.price * (product.discount / 100) || 0)}
                </span>

                {product?.discount ? (
                  <span className="px-[8px]">
                    <span className="block text-[12px] font-normal text-primary-foreground">
                      Regular Price
                    </span>{" "}
                    ৳ {Math.round(product?.price || 0)}
                  </span>
                ) : (
                  ""
                )}

                <div
                  className="line-clamp-6"
                  dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                ></div>

                {/* <Button
                  disabled={
                    selectedColor?.sizes?.find((s) => s?.size === selectedSize?.size)?.stock === 0
                  }
                  onClick={handleAddToCart}
                  className="h-[27px] w-[100px] p-0 text-[14px]"
                >
                  Add To Cart
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default ProductQuickOverviewModal;
