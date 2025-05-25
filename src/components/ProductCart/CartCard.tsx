"use client";
import { useAppDispatch } from "@/hooks/redux";
import {
  removeFromCart,
  TCartItem,
  toggleCheckItem,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { getProductDiscountPrice } from "@/utils";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartCard = ({ item }: { item: TCartItem }) => {
  const dispatch = useAppDispatch();

  const handleQuantity = (type: "inc" | "dec", id: string) => {
    if (type === "inc") {
      dispatch(
        updateQuantity({ id, color: item.color, size: item.size, quantity: item?.quantity + 1 })
      );
    } else {
      dispatch(
        updateQuantity({ id, color: item.color, size: item.size, quantity: item?.quantity - 1 })
      );
    }
  };

  const handleRemoveProduct = (id: string, color: string, size: string) => {
    dispatch(removeFromCart({ id, color, size }));
  };

  const toggleCheckUncheckHandler = (item: TCartItem) => {
    dispatch(toggleCheckItem(item));
  };

  return (
    <div className="mx-[10px] border-b-[1px] border-quaternary pt-[20px] pb-[14px]">
      <div className="flex items-center gap-[10px] pl-[10px] md:pl-[25px]">
        <input
          checked={item?.isChecked || false}
          type="checkbox"
          name=""
          id=""
          className="cursor-pointer"
          onChange={() => toggleCheckUncheckHandler(item)}
        />

        <div className="h-[70px] w-[70px] shrink-0">
          <Image
            src={item?.image || ""}
            width={300}
            height={300}
            alt="product-image"
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div>
          <h1 className="line-clamp-1 text-[14px] font-bold text-black sm:text-[14px]">
            {item?.name}
          </h1>
          <p className="text-[12px]">Size: {item?.size}</p>
          <p className="text-[12px]">Color: {item?.color}</p>
          {item.discount ? <p className="text-[12px]">Discount: {item?.discount}%</p> : ""}
        </div>
      </div>

      <div className="mt-[10px] flex items-center justify-end pr-[10px] md:mt-[0px]">
        <div className="relative flex h-[18px] items-center">
          <button
            className="flex cursor-pointer items-center border-[1px] border-primary px-[5px] hover:bg-primary hover:text-white"
            onClick={() => handleQuantity("dec", item?.id)}
            disabled={item?.quantity <= 1}
            onChange={() => {}}
          >
            -
          </button>
          <span className="flex w-[64px] items-start justify-center border-t border-b border-quaternary px-[12px]">
            {item?.quantity}
          </span>
          <button
            className="flex cursor-pointer items-center border-[1px] border-primary px-[5px] hover:bg-primary hover:text-white"
            onClick={() => handleQuantity("inc", item?.id)}
            disabled={item?.stock === item?.quantity}
            onChange={() => {}}
          >
            +
          </button>
          <div className="absolute -top-[20px] -left-[16px]">
            {item?.stock === item?.quantity && (
              <p className="ml-4 text-[12px] text-primary">Max stock reached</p>
            )}
          </div>
        </div>

        <p className="center mr-[50px] ml-[20px] text-[13px]">
          <span className="font-semibold">
            {item.discount ? (
              <>Tk {getProductDiscountPrice(item?.price, item?.discount)}</>
            ) : (
              <>Tk {item?.price}</>
            )}{" "}
          </span>
          X <span className="inline-flex w-[30px] items-center text-black">{item?.quantity}</span>
        </p>

        <button
          onClick={() => handleRemoveProduct(item.id, item.color!, item.size)}
          className="flex aspect-square w-[30px] cursor-pointer items-center justify-center bg-danger/10 text-danger"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
