"use client";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ProductSizeChart from "./ProductSizeChart";
import { IProduct } from "@/types/product";

const DetailedInfo = ({ product }: { product: IProduct }) => {
  const [activeColor, setActiveColor] = useState("red");
  const [activeSize, setActiveSize] = useState("M");

  return (
    <section className="w-full bg-white px-[10px] py-[10] md:px-[20px]">
      <h1 className="line-clamp-1 text-[14px] font-semibold text-strong sm:text-[25px]">
        {product?.name}
      </h1>

      <div className="flex items-center gap-[10px]">
        <h1 className="text-[18px] font-semibold">Price: TK 500</h1>
        <h2 className="mt-[8px] text-[15px] font-bold text-info line-through">550</h2>
        <p className="mt-[6px] rounded-full bg-primary px-2 text-[12px] font-bold text-white">
          10% Off
        </p>
      </div>

      {/* colors  */}
      <h1 className="mt-[10px] text-[16px]">Colors:</h1>
      <div className="mt-[5px] flex items-center gap-[10px]">
        {["red", "green", "yellow"].map((color, index) => {
          return (
            <button
              key={index}
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
        {["S", "M", "L", "XL"].map((size, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Select size ${size}`}
            className={`h-[30px] w-[30px] cursor-pointer text-[12px] font-medium transition-all duration-200 ${activeSize === size ? "bg-primary text-white shadow-none" : "bg-white text-black shadow"} border border-gray-200 hover:bg-primary`}
            onClick={() => setActiveSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* // quantity update  */}
      <div className="mt-[15px] flex h-[30px] w-[80px] items-center border border-quaternary px-[7px]">
        <button className="cursor-pointer text-info">
          <AiOutlineMinus size={14} />
        </button>
        <p className="w-full text-center text-[14px]">{1}</p>
        <button className="cursor-pointer text-info">
          <AiOutlinePlus size={14} />
        </button>
      </div>

      {/* // add to cart button  */}
      <div className="mt-[30px] flex flex-col items-center gap-[10px] sm:max-w-[350px] sm:flex-row">
        <button className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info">
          Add to cart
        </button>
        <button className="h-[40px] w-full cursor-pointer bg-quaternary transition-all duration-300 hover:bg-strong hover:text-white">
          Add To Wishlist
        </button>
      </div>

      {/* // sizes area  */}
      <ProductSizeChart chart={product?.chart} />
    </section>
  );
};

export default DetailedInfo;
