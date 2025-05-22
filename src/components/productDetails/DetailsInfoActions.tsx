"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IProduct } from "@/types/product";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";

const DetailsInfoActions = ({ product }: { product: IProduct }) => {
  const [activeColor, setActiveColor] = useState("red");
  const [activeSize, setActiveSize] = useState("M");
  const [activeQuantity, setActiveQuantity] = useState(1);
  const dispatch = useAppDispatch();
  // Find the current selected color and size stock
  const getCurrentStock = () => {
    const colorObj = product.colors.find((c) => c.color === activeColor);
    const sizeObj = colorObj?.sizes.find((s) => s.size === activeSize);
    return sizeObj?.stock ?? 1;
  };

  const handleQuantityChange = (type: "inc" | "dec") => {
    setActiveQuantity((prev) => {
      const stock = getCurrentStock();
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
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: activeQuantity,
      size: activeSize,
      stock: getCurrentStock(),
      color: activeColor,
      image: product?.images[0],
    };

    dispatch(addToCart(payload));
    toast.success("Added to cart!");
  };

  return (
    <div>
      {/* colors  */}
      <h1 className="mt-[10px] text-[16px]">Colors:</h1>
      <div className="mt-[5px] flex items-center gap-[10px]">
        {product?.colors?.map(({ color, _id }) => {
          return (
            <button
              key={_id}
              type="button"
              aria-label={`Select color ${color}`}
              className={`h-[20px] w-[20px] cursor-pointer rounded-full border-2 transition-all duration-200 ${
                activeColor === color ? "border-info" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
            />
          );
        })}
      </div>

      {/* // sizes  */}
      <h1 className="mt-[15px] text-[16px]">Sizes:</h1>
      <div className="mt-[5px] flex items-center gap-[10px]">
        {product?.colors
          ?.find((c) => c.color === activeColor)
          ?.sizes?.map(({ size, _id }) => (
            <button
              key={_id}
              type="button"
              aria-label={`Select size ${size}`}
              className={`h-[30px] w-[30px] cursor-pointer text-[12px] font-medium transition-all duration-200 ${
                activeSize === size
                  ? "bg-primary text-white shadow-none"
                  : "bg-white text-black shadow"
              } border border-gray-200 hover:bg-primary`}
              onClick={() => setActiveSize(size)}
            >
              {size}
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

      {/* // add to cart button  */}
      <div className="mt-[30px] flex flex-col items-center gap-[10px] sm:max-w-[350px] sm:flex-row">
        <button
          onClick={handleAddToCart}
          className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info"
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
