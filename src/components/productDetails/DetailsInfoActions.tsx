"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
// import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { IColor, IProduct, ISize } from "@/types/product";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";
import ProcutCheckout from "../ui/Card/ProductCard/ProcutCheckout";
import RestockRequestModal from "./RestockRequestModal";
import AddToCartErrorMessage from "../Shared/AddToCartErrorMessage";

interface IProps {
  product: IProduct;
  onColorChange: (color: IColor | undefined) => void;
}

const DetailsInfoActions: React.FC<IProps> = ({ product, onColorChange }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeColor, setActiveColor] = useState<IColor | undefined>();
  const [activeSize, setActiveSize] = useState<ISize | undefined>();
  const [activeQuantity, setActiveQuantity] = useState(1);

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

  // Reset quantity when size changes
  const handleSizeChange = (size: ISize) => {
    setActiveSize(size);
    const quantity = size.stock >= activeQuantity ? activeQuantity : size.stock;
    setActiveQuantity(quantity);
  };
  const dispatch = useAppDispatch();

  const handleQuantityChange = (type: "inc" | "dec") => {
    setActiveQuantity((prev) => {
      const stock = activeSize?.stock;
      if (!stock) return prev;
      if (type === "inc") {
        if (prev < stock) {
          return prev + 1;
        } else {
          toast.error("You have reached the maximum stock available.", {
            id: "productStockToastId",
          });
          return prev;
        }
      }
      if (type === "dec" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const getColorVariantImage = (colorName: string): string => {
    if (!product?.colors || !Array.isArray(product.colors)) {
      return product?.images?.[0] || "";
    }

    const colorVariant = product.colors.find(
      (color) => color?.color?.toLowerCase() === colorName.toLowerCase().trim()
    );

    return colorVariant?.images?.[0] || product?.images?.[0] || "";
  };

  useEffect(() => {
    if (activeColor && !activeSize) {
      setErrorMessage("Please select a size.");
    }
    if (activeColor && activeSize) {
      setErrorMessage("");
    }
  }, [activeColor, activeSize]);

  const handleCheckoutError = (error: string) => {
    setErrorMessage(error);
  };

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
      discount: product.discount,
      id: `${product._id}-${activeColor.color.trim()}-${activeSize.size.trim()}`,
      name: product.name,
      price: product.price,
      quantity: activeQuantity,
      size: activeSize.size,
      stock: activeSize.stock,
      color: activeColor.color,
      image: getColorVariantImage(activeColor.color),
      slug: product.slug,
      sku: product?.sku,
    };

    dispatch(addToCart(payload));
    toast.success("Added to cart!");
  };

  const handleColorChange = (color: IColor) => {
    setActiveColor(color);
    onColorChange(color);
    // Reset activeSize if it's not available in the selected color
    // If all stock is out, just check if size exists; otherwise check stock > 0
    if (activeSize) {
      const sizeExists = color.sizes?.some((s) => s.size === activeSize.size);
      const hasStock = isAllStockOut
        ? true
        : color.sizes?.some((s) => s.size === activeSize.size && s.stock > 0);

      if (!sizeExists || !hasStock) {
        setActiveSize(undefined);
        setActiveQuantity(1);
      }
    }
  };

  return (
    <div>
      {/* colors  */}
      <h1 className="mt-[10px] text-[16px]">Colors:</h1>
      <div className="mt-[5px] flex items-center gap-[10px]">
        {product?.colors?.map((color) => {
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
      <h1 className="mt-[15px] text-[16px]">Sizes:</h1>
      <div className="mt-[5px] flex items-center gap-[10px]">
        {activeColor
          ? // If color is selected, show sizes from that color
            // If all stock is out, show all sizes; otherwise filter by stock > 0
            (isAllStockOut
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
          : // If no color is selected, show sizes from all colors
            // If all stock is out, show all sizes; otherwise filter by stock > 0
            product.colors?.map((color) =>
              (isAllStockOut ? color.sizes : color.sizes?.filter((size) => size.stock > 0))?.map(
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

      {errorMessage && <AddToCartErrorMessage className="mt-[10px]" errorMessage={errorMessage} />}
      {/* // quantity update  */}
      <div className="mt-[15px] mb-[15px] flex h-[30px] w-[80px] items-center border border-quaternary px-[7px]">
        <button
          disabled={activeQuantity <= 1}
          onClick={() => handleQuantityChange("dec")}
          className={`cursor-pointer text-info ${activeQuantity <= 1 ? "cursor-event-none" : ""}`}
        >
          {activeQuantity > 1 ? (
            <AiOutlineMinus size={14} />
          ) : (
            <AiOutlineMinus size={14} className="text-gray-300" />
          )}
        </button>
        <p className="w-full text-center text-[14px]">{activeQuantity}</p>
        <button
          disabled={activeSize?.stock === 0 || activeSize?.stock === activeQuantity}
          onClick={() => handleQuantityChange("inc")}
          className="cursor-pointer text-info disabled:cursor-not-allowed disabled:opacity-[0.5]"
        >
          <AiOutlinePlus size={14} />
        </button>
      </div>

      {activeSize && !activeSize.stock ? (
        <p className="mt-[10px] mb-[5px] text-[15px] font-[600] text-danger">
          Sorry this size is currently out of stock
        </p>
      ) : (
        ""
      )}

      {product?.quickOverview && (
        <div
          className="quick-overview mt-[10px] mb-[15px] text-primary"
          dangerouslySetInnerHTML={{ __html: product?.quickOverview || "" }}
        />
      )}
      <p className="text-primary">
        <strong>Fabric Composition:</strong> {product?.fabric}
      </p>

      {/* // add to cart button  */}
      <div className="mt-[10px] flex flex-col items-center gap-[10px] sm:max-w-[330px] sm:flex-row">
        <button
          disabled={
            isAllStockOut ||
            !activeColor ||
            !activeSize ||
            activeColor?.sizes?.find((s) => s?.size === activeSize?.size)?.stock === 0
          }
          onClick={handleAddToCart}
          className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info disabled:cursor-not-allowed disabled:opacity-[50]"
        >
          Add to cart
        </button>
        {isAllStockOut || (activeColor && activeSize && !activeSize.stock) ? (
          activeColor && activeSize ? (
            <RestockRequestModal
              color={activeColor?.color ?? ""}
              size={activeSize.size}
              productId={product?._id}
            />
          ) : (
            <button
              disabled
              className="checkoutBtn center mt-1 h-[42px] w-full cursor-not-allowed gap-[3px] border border-[#c5c5c5] py-[8px] text-sm font-bold opacity-50"
            >
              Request Restock
            </button>
          )
        ) : (
          <ProcutCheckout
            product={product}
            quantity={activeQuantity}
            onQuantityChange={setActiveQuantity}
            btnStyle="h-[42px] mt-[0px]"
            activeColor={activeColor}
            activeSize={activeSize}
            skipModal={true}
            onError={handleCheckoutError}
          />
        )}
      </div>
    </div>
  );
};

export default DetailsInfoActions;
