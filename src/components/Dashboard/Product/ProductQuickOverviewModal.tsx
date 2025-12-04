"use client";

import ProductDetailsSlider from "@/components/productDetails/ProductDetailSlider";
import ProductSizeChart from "@/components/productDetails/ProductSizeChart";
import RestockRequestModal from "@/components/productDetails/RestockRequestModal";
import AddToCartErrorMessage from "@/components/Shared/AddToCartErrorMessage";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetProductByProductSlugQuery } from "@/redux/features/product/product.api";
import { useGetAllReviewByProductIdQuery } from "@/redux/features/review/review.api";
import { IColor, IProduct, ISize } from "@/types/product";
import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useState } from "react";
import { FaEye, FaSpinner } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { LuX } from "react-icons/lu";
import ProcutCheckout from "@/components/ui/Card/ProductCard/ProcutCheckout";

interface Props {
  children?: ReactNode;
  product: Pick<IProduct, "_id" | "colors" | "images" | "name" | "price" | "discount" | "slug">;
  isAllStockOut?: boolean;
}

const ProductQuickOverviewModal = ({ children, product: clickedProduct, isAllStockOut }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
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

  const [activeColor, setActiveColor] = useState<IColor | undefined>();
  const [activeSize, setActiveSize] = useState<ISize | undefined>();
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();

  // Check if all stock is out
  const isAllStockOutFunctional = (colors: IColor[]): boolean => {
    try {
      if (!Array.isArray(colors) || colors.length === 0) {
        return true;
      }

      return !colors.some((color) => {
        if (!color || !Array.isArray(color.sizes)) {
          return false;
        }

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

  const isAllStockOutCalculated = isAllStockOutFunctional(product?.colors || []);

  // Filter colors to only show those with available sizes
  const availableColors = product?.colors?.filter((color) =>
    isAllStockOutCalculated ? true : color.sizes?.some((size) => size.stock > 0)
  ) || [];

  useEffect(() => {
    if (availableColors.length > 0 && !activeColor) {
      setActiveColor(availableColors[0]);
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, activeColor]);

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
    setActiveColor(color);
    setSelectedColor(color);
    // Reset activeSize if it's not available in the selected color
    if (activeSize && !color.sizes?.some((s) => s.size === activeSize.size)) {
      setActiveSize(undefined);
      setActiveQuantity(1);
    }
  };

  // Reset quantity when size changes
  const handleSizeChange = (size: ISize) => {
    setActiveSize(size);
    const quantity = size.stock >= activeQuantity ? activeQuantity : size.stock;
    setActiveQuantity(quantity);
  };

  useEffect(() => {
    if (activeColor && !activeSize) {
      setErrorMessage("Please select a size.");
    }
    if (activeColor && activeSize) {
      setErrorMessage("");
    }
  }, [activeColor, activeSize]);

  const handleAddToCart = () => {
    if (!activeColor && !activeSize) {
      setErrorMessage("Please select a color and size.");
      return;
    }

    if (!activeColor) {
      setErrorMessage("Please select a color.");
      return;
    }

    if (!activeSize) {
      setErrorMessage("Please select a size.");
      return;
    }

    const payload = {
      discount: product?.discount,
      id: `${product._id}-${activeColor!.color.trim()}-${activeSize!.size.trim()}`,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      size: activeSize?.size || "",
      stock: activeSize?.stock || 0,
      color: activeColor?.color || "",
      image: getColorVariantImage(activeColor?.color || ""),
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
      ) : isAllStockOut ? (
        <button
          onClick={handleClick}
          className="checkoutBtn mt-1 w-full cursor-pointer border border-border-muted py-[8px] text-[14px] font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-[50]"
        >
          Request Restock
        </button>
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
        className="w-[95%] max-w-[800px] md:w-full"
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
              <div className="relative aspect-square w-full max-w-[200px] shrink-0 md:max-w-[380px]">
                {activeColor &&
                  activeSize &&
                  activeColor?.sizes?.find((s) => s.size === activeSize.size)?.stock === 0 && (
                    <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                      Out of Stock
                    </span>
                  )}
                {/* <Image
                  src={
                    selectedColor?.images?.[0] || product?.images[0] || "/images/category_blank.png"
                  }
                  alt={product?.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                /> */}

                <ProductDetailsSlider
                  product={product}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                />
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <h3 className="line-clamp-2 text-[20px] font-[700]">{product?.name}</h3>
                <span>
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
                  <span className="text-[12px]">Product Code: {product?.sku}</span>
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

                <div>
                  {/* colors  */}
                  <h1 className="text-[16px]">Colors:</h1>
                  <div className="mt-[5px] flex items-center gap-[10px]">
                    {availableColors?.map((color) => {
                      return (
                        <button
                          key={color._id}
                          type="button"
                          aria-label={`Select color ${color.color}`}
                          className={`flex h-[20px] w-fit cursor-pointer items-center rounded-full border-[1px] border-primary px-[8px] text-[12px] transition-all duration-200 ${
                            activeColor?.color === color.color
                              ? "bg-primary text-white"
                              : "bg-white text-primary"
                          }`}
                          onClick={() => handleColorChange(color)}
                        >
                          {color.color}
                        </button>
                      );
                    })}
                  </div>

                  {/* // sizes  */}
                  <h1 className="mt-[10px] text-[16px]">Sizes:</h1>
                  <div className="mt-[5px] flex items-center gap-[10px]">
                    {activeColor
                      ? // If color is selected, show sizes from that color with stock >0 unless all stock out
                        (isAllStockOutCalculated
                          ? activeColor.sizes
                          : activeColor.sizes?.filter((size) => size.stock > 0)
                        )?.map((size) => (
                          <button
                            key={size._id}
                            type="button"
                            aria-label={`Select size ${size.size}`}
                            className={`h-[30px] w-fit cursor-pointer px-[8px] text-[12px] font-medium transition-all duration-200 ${
                              activeSize?.size === size.size
                                ? "bg-primary text-white shadow-none"
                                : "bg-white text-black shadow"
                            } border border-gray-200 hover:bg-primary hover:text-white`}
                            onClick={() => handleSizeChange(size)}
                          >
                            {size.size}
                          </button>
                        ))
                      : // If no color is selected, show all sizes from available colors
                        availableColors?.map((color) =>
                          (isAllStockOutCalculated ? color.sizes : color.sizes?.filter((size) => size.stock > 0))?.map(
                            (size) => (
                              <button
                                key={size._id}
                                type="button"
                                aria-label={`Select size ${size.size}`}
                                className={`h-[30px] w-fit cursor-pointer px-[8px] text-[12px] font-medium transition-all duration-200 ${
                                  activeSize?.size === size.size
                                    ? "bg-primary text-white shadow-none"
                                    : "bg-white text-black shadow"
                                } border border-gray-200 hover:bg-primary hover:text-white`}
                                onClick={() => handleSizeChange(size)}
                              >
                                {size.size}
                              </button>
                            )
                          )
                        )}
                  </div>
                </div>

                {errorMessage && (
                  <AddToCartErrorMessage className="mt-[10px]" errorMessage={errorMessage} />
                )}

                {activeSize && !activeSize.stock ? (
                  <p className="mt-[10px] mb-[5px] text-[15px] font-[600] text-danger">
                    Sorry this size is currently out of stock
                  </p>
                ) : (
                  ""
                )}

                {activeColor && activeSize && !activeSize.stock ? (
                  <RestockRequestModal
                    color={activeColor?.color ?? ""}
                    size={activeSize.size}
                    productId={product?._id}
                  />
                ) : (
                  <div className="mt-[10px] flex items-center gap-[10px]">
                    <Button
                      disabled={
                        selectedColor?.sizes?.find((s) => s?.size === activeSize?.size)?.stock === 0
                      }
                      onClick={handleAddToCart}
                      className="flex-1 h-[27px] p-0 text-[14px]"
                    >
                      Add To Cart
                    </Button>
                    <ProcutCheckout
                      product={product}
                      quantity={activeQuantity}
                      onQuantityChange={setActiveQuantity}
                      btnStyle="flex-1 h-[27px] p-0 text-[14px] rounded -mt-2"
                      activeColor={activeColor}
                      activeSize={activeSize}
                      skipModal={true}
                      // onError={handleCheckoutError}
                    />
                  </div>
                )}
                {/* <div
                  className="mt-[20px] line-clamp-[10] line"
                  dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                ></div> */}
                <div
                  className="quick-overview text-primary"
                  dangerouslySetInnerHTML={{ __html: product?.quickOverview || "" }}
                />
                <p className="text-primary">
                  <strong>Fabric Composition:</strong> {product?.fabric}
                </p>
              </div>
            </div>
            <div className="-mt-[20px]">
              <ProductSizeChart chart={product?.chart} />
            </div>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default ProductQuickOverviewModal;
