"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetProductByProductSlugQuery } from "@/redux/features/product/product.api";
import { IColor, IProduct, ISize } from "@/types/product";
import Image from "next/image";
import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Button from "./Button";
import DialogProvider from "./DialogProvider";
import HorizontalLine from "./HorizontalLine";
import RestockRequestModal from "../productDetails/RestockRequestModal";

interface Props {
  children?: ReactNode;
  product: Pick<IProduct, "_id" | "colors" | "images" | "name" | "price" | "discount" | "slug">;
  isAllStockOut?: boolean;
}

const ProductAddToCartModal = ({ children, product: clickedProduct, isAllStockOut }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const slug = clickedProduct?.slug || "";

  const {
    data: clickedProductData,
    isLoading,
    isError,
  } = useGetProductByProductSlugQuery(slug, {
    skip: !slug || !isOpen,
  });

  const product = clickedProductData?.data as IProduct;

  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  const [selectedSize, setSelectedSize] = useState<ISize | undefined>();

  const getColorVariantImage = (colorName: string): string => {
    if (!product?.colors || !Array.isArray(product.colors)) {
      return product?.images?.[0] || "";
    }

    const colorVariant = product.colors.find(
      (color) => color?.color?.toLowerCase() === colorName.toLowerCase().trim()
    );

    return colorVariant?.images?.[0] || product?.images?.[0] || "";
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleColorChange = (color: IColor) => {
    setSelectedColor(color);
    // Reset selectedSize if it's not available in the selected color or if it's out of stock
    const isSizeAvailable =
      selectedSize && color.sizes?.some((s) => s.size === selectedSize.size && s.stock > 0);
    if (!isSizeAvailable) {
      setSelectedSize(undefined);
    }
  };

  const handleSizeChange = (size: ISize) => {
    setSelectedSize(size);
  };

  // Reset selections when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedColor(undefined);
      setSelectedSize(undefined);
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!selectedColor && !selectedSize) {
      toast.error("Please select a color and size.");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    const payload = {
      discount: product?.discount,
      id: `${product._id}-${selectedColor!.color.trim()}-${selectedSize!.size.trim()}`,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      size: selectedSize?.size || "",
      stock: selectedSize?.stock || 0,
      color: selectedColor?.color || "",
      image: getColorVariantImage(selectedColor?.color || ""),
      slug: product?.slug,
      sku: product?.sku,
    };
    dispatch(addToCart(payload));
    setIsOpen(false);
  };

  return (
    <>
      {children && isValidElement(children) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, { onClick: handleClick })
      ) : (
        <button
          onClick={handleClick}
          disabled={isAllStockOut}
          className={`specialBtn mt-1 w-full border border-[#c5c5c5] bg-transparent py-[8px] text-sm font-bold ${isAllStockOut ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"}`}
        >
          Add to Cart
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
              <h5 className="text-[20px] font-[700] text-strong">Add To Cart</h5>
              <button onClick={() => setIsOpen(false)} className="cursor-pointer">
                <LuX />
              </button>
            </div>
            <HorizontalLine className="my-[20px]" />

            <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
              <div className="relative aspect-square w-full max-w-[200px] shrink-0 md:w-[300px]">
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
                <span className="font-bold text-primary">
                  {" "}
                  ৳ {Math.round(product?.price - product.price * (product.discount / 100) || 0)}
                </span>
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[700]">Select color:</span>
                  <div className="flex flex-wrap items-center justify-start gap-[8px]">
                    {product?.colors
                      ?.filter((color) => color.sizes?.some((size) => size.stock > 0))
                      ?.map((color, i) => (
                        <button
                          onClick={() => handleColorChange(color)}
                          key={color?.color + i}
                          className={`cursor-pointer border-[1px] border-border-muted px-[8px] py-[4px] text-[12px] ${selectedColor?.color === color.color ? "bg-primary-foreground text-white" : ""}`}
                        >
                          {color?.color}
                        </button>
                      ))}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-[5px]">
                  <span className="font-[700]">Select Size:</span>
                  <div className="flex flex-wrap items-center justify-start gap-[8px]">
                    {selectedColor
                      ? // If color is selected, show only sizes from that color with stock > 0
                        selectedColor.sizes
                          ?.filter((size) => size.stock > 0)
                          ?.map((size) => (
                            <button
                              key={size._id}
                              type="button"
                              aria-label={`Select size ${size.size}`}
                              className={`h-[30px] w-fit cursor-pointer px-[8px] text-[12px] font-medium transition-all duration-200 ${
                                selectedSize?.size === size.size
                                  ? "bg-primary text-white shadow-none"
                                  : "bg-white text-black shadow"
                              } border border-gray-200 hover:bg-primary hover:text-white`}
                              onClick={() => handleSizeChange(size)}
                            >
                              {size.size}
                            </button>
                          ))
                      : // If no color is selected, show all sizes from all colors with stock > 0
                        product.colors?.map((color) =>
                          color.sizes
                            ?.filter((size) => size.stock > 0)
                            ?.map((size) => (
                              <button
                                key={size._id}
                                type="button"
                                aria-label={`Select size ${size.size}`}
                                className={`h-[30px] w-fit cursor-pointer px-[8px] text-[12px] font-medium transition-all duration-200 ${
                                  selectedSize?.size === size.size
                                    ? "bg-primary text-white shadow-none"
                                    : "bg-white text-black shadow"
                                } border border-gray-200 hover:bg-primary hover:text-white`}
                                onClick={() => handleSizeChange(size)}
                              >
                                {size.size}
                              </button>
                            ))
                        )}
                  </div>
                </div>

                {selectedColor && selectedSize && !selectedSize?.stock ? (
                  <RestockRequestModal
                    color={selectedColor?.color ?? ""}
                    size={selectedSize?.size as string}
                    productId={product?._id}
                  />
                ) : (
                  <Button
                    disabled={
                      selectedColor?.sizes?.find((s) => s?.size === selectedSize?.size)?.stock === 0
                    }
                    onClick={handleAddToCart}
                    className="mt-[20px]"
                  >
                    Add To Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default ProductAddToCartModal;
