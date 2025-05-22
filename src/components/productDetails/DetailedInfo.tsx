"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const DetailedInfo = () => {
  const [activeColor, setActiveColor] = useState("red");
  const [activeSize, setActiveSize] = useState("M");

  return (
    <section className="w-full bg-white px-[10px] py-[10] md:px-[20px]">
      <h1 className="text-[14px] font-semibold md:text-[18px]">Royal Silk Saree</h1>

      <div className="mt-[15px] flex items-center gap-[10px]">
        <h1 className="text-[20px] font-semibold">Price: TK 500</h1>
        <h2 className="mt-[8px] text-[20px] line-through">550</h2>
        <p className="mt-[8px] rounded-full bg-primary px-2 text-[12px] text-white">10% Off</p>
      </div>

      {/* colors  */}
      <h1 className="mt-[30px] text-[20px]">Colors:</h1>
      <div className="mt-[5px] flex items-center gap-[20px]">
        {["red", "green", "yellow"].map((color, index) => {
          return (
            <button
              key={index}
              type="button"
              aria-label={`Select color ${color}`}
              className={`h-[25px] w-[25px] cursor-pointer rounded-full border-2 transition-all duration-200 ${
                activeColor === color ? "border-black" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
            />
          );
        })}
      </div>

      {/* // sizes  */}
      <h1 className="mt-[30px] text-[20px]">Sizes:</h1>
      <div className="mt-[5px] flex items-center gap-[20px]">
        {["S", "M", "L", "XL"].map((size, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Select size ${size}`}
            className={`h-[35px] w-[35px] cursor-pointer text-[18px] font-medium transition-all duration-200 ${activeSize === size ? "bg-primary text-white shadow-none" : "bg-white text-black shadow"} border border-gray-200 hover:bg-primary`}
            onClick={() => setActiveSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* // quantity update  */}
      <div className="mt-[40px] flex h-[40px] w-[120px] items-center border border-quaternary px-[10px]">
        <button className="cursor-pointer text-info">
          <AiOutlineMinus />
        </button>
        <p className="w-full text-center">{1}</p>
        <button className="cursor-pointer text-info">
          <AiOutlinePlus />
        </button>
      </div>

      {/* // add to cart button  */}
      <div className="mt-[50px] flex flex-col items-center gap-[20px] sm:max-w-[400px] sm:flex-row">
        <button className="h-[40px] w-full cursor-pointer rounded-md bg-primary text-white transition-all duration-300 hover:bg-info">
          Add to cart
        </button>
        <button className="h-[40px] w-full cursor-pointer rounded-md bg-quaternary transition-all duration-300">
          Add To Wishlist
        </button>
      </div>

      {/* // banner area  */}

      <div className="mt-[50px] w-full">
        {["/banner-details-page.png", "/banner-details-page.png"]?.map((item, index) => (
          <div key={index} className="flex aspect-[10/2] w-full items-center justify-center">
            <Image
              src={item}
              alt="banner"
              width={1000}
              height={300}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedInfo;
