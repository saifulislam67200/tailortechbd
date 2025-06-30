"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
// import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { IColor, IProduct, ISize } from "@/types/product";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";
import ProcutCheckout from "../ui/Card/ProductCard/ProcutCheckout";
import RestockRequestModal from "./RestockRequestModal";

interface IProps {
  product: IProduct;
  onColorChange: (color: IColor | undefined) => void;
}

const DetailsInfoActions: React.FC<IProps> = ({ product, onColorChange }) => {
  const [activeColor, setActiveColor] = useState<IColor | undefined>(product?.colors?.[0]);
  const [activeSize, setActiveSize] = useState<ISize | undefined>(activeColor?.sizes?.[0]);
  const [activeQuantity, setActiveQuantity] = useState(1);

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

  const handleAddToCart = () => {
    if (!activeColor || !activeSize) {
      toast.error("Please select a color and size.");
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
    setActiveSize(color.sizes?.[0]);
  };

  // const wishlistItems = useAppSelector((state) => state.wishlist.items);
  // const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  // const handleToggleWishlist = () => {
  //   if (!isInWishlist) {
  //     dispatch(addToWishlist(product));
  //     toast.success("Added to wishlist");
  //   }
  // };

  return (
    <div>
      <div className="mt-[15px] flex flex-col gap-[10px] sm:flex-row sm:items-end-safe">
        <div>
          {/* colors  */}
          <h1 className="text-[16px]">Colors:</h1>
          <div className="mt-[5px] flex items-center gap-[10px]">
            {product?.colors?.map((color) => {
              return (
                <button
                  key={color._id}
                  type="button"
                  aria-label={`Select color ${color.color}`}
                  className={`flex h-[30px] w-fit cursor-pointer items-center rounded-full border-[1px] border-primary px-[8px] text-[12px] transition-all duration-200 ${
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
        </div>
        <div>
          {/* // sizes  */}
          <h1 className="text-[16px]">Sizes:</h1>
          <div className="mt-[5px] flex items-center gap-[10px]">
            {activeColor?.sizes?.map((size) => (
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
            ))}
          </div>
        </div>
        <div>
          {/* // quantity update  */}
          <h1 className="text-[16px]">Quantity:</h1>

          <div className="flex h-[30px] w-[80px] items-center border border-quaternary px-[7px]">
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
        </div>
      </div>

      {activeSize && !activeSize.stock ? (
        <p className="mt-[10px] mb-[5px] text-[15px] font-[600] text-danger">
          Sorry this size is currently out of stock
        </p>
      ) : (
        ""
      )}
      {/* // add to cart button  */}
      {activeSize && !activeSize.stock ? (
        <RestockRequestModal
          color={activeColor?.color ?? ""}
          size={activeSize.size}
          productId={product?._id}
        />
      ) : (
        <div className="mt-[20px] flex flex-col items-center gap-[10px] sm:max-w-[330px] sm:flex-row">
          <button
            disabled={!activeColor || !activeSize || !activeSize.stock}
            onClick={handleAddToCart}
            className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info disabled:cursor-not-allowed disabled:opacity-[50]"
          >
            Add to cart
          </button>
          {/* <button
            onClick={handleToggleWishlist}
            disabled={isInWishlist}
            className={`h-[40px] w-full transition-all duration-300 ${
              isInWishlist
                ? "cursor-not-allowed bg-gray-400 text-white"
                : "cursor-pointer bg-quaternary hover:bg-strong hover:text-white"
            }`}
          >
            {isInWishlist ? "Already in Wishlist" : "Add To Wishlist"}
          </button> */}
          <ProcutCheckout
            disabled={activeSize && !activeSize.stock}
            product={product}
            btnStyle="h-[42px]  mt-[0px]"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsInfoActions;
