"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IColor, IProduct, ISize } from "@/types/product";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";

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

  const handleAddToCart = () => {
    if (!activeColor || !activeSize) {
      toast.error("Please select a color and size.");
      return;
    }

    const payload = {
      discount: product.discount,
      id: `${product._id}-${activeColor.color}-${activeSize.size}`,
      name: product.name,
      price: product.price,
      quantity: activeQuantity,
      size: activeSize.size,
      stock: activeSize.stock,
      color: activeColor.color,
      image: product?.images[0],
    };

    dispatch(addToCart(payload));
    toast.success("Added to cart!");
  };

  const handleColorChange = (color: IColor) => {
    setActiveColor(color);
    onColorChange(color);
    setActiveSize(color.sizes?.[0]);
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
      {/* // quantity update  */}
      <div className="mt-[15px] flex h-[30px] w-[80px] items-center border border-quaternary px-[7px]">
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
        <button onClick={() => handleQuantityChange("inc")} className="cursor-pointer text-info">
          <AiOutlinePlus size={14} />
        </button>
      </div>

      {activeSize && !activeSize.stock ? (
        <p className="mt-[30px] text-[15px] font-[600] text-danger">
          Sorry this size is currently out of stock
        </p>
      ) : (
        ""
      )}
      {/* // add to cart button  */}
      <div className="mt-[10px] flex flex-col items-center gap-[10px] sm:max-w-[350px] sm:flex-row">
        <button
          disabled={!activeColor || !activeSize || !activeSize.stock}
          onClick={handleAddToCart}
          className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info disabled:cursor-not-allowed disabled:opacity-[50]"
        >
          Add to cart
        </button>
        <button className="h-[40px] w-full cursor-pointer bg-quaternary transition-all duration-300 hover:bg-strong hover:text-white">
          Add To Wishlist
        </button>
      </div>
    </div>
  );
};

export default DetailsInfoActions;
