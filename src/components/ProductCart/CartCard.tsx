"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  removeFromCart,
  TCartItem,
  toggleCheckItem,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartCard = ({ item }: { item: TCartItem }) => {
  const { items: cartItems, checkedItems } = useAppSelector((state) => state?.cart) ?? [];
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
      <div className="flex items-center pl-[10px] md:pl-[25px]">
        <input
          checked={
            cartItems?.length === checkedItems?.length ||
            checkedItems.some((checkedItem) => checkedItem.id === item.id)
          }
          type="checkbox"
          name=""
          id=""
          className="cursor-pointer"
          onChange={() => toggleCheckUncheckHandler(item)}
        />

        <div className="mr-[16px] ml-[22px] h-[70px] max-w-[70px] min-w-[70px] md:mr-[35px] md:ml-[53px]">
          <Image
            src={item?.image || ""}
            width={300}
            height={300}
            alt="product-image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div>
          <h1 className="text-[12px] font-bold text-black sm:text-[14px]">{item?.name}</h1>
          <p className="text-sm">Size: {item?.size}</p>
          <p className="text-sm">Color: {item?.color}</p>
        </div>
      </div>

      <div className="mt-[10px] flex justify-end pr-[10px] md:mt-[0px]">
        <div className="relative flex h-[18px] items-center">
          <button
            className="flex cursor-pointer items-center border px-[5px]"
            onClick={() => handleQuantity("dec", item?.id)}
            disabled={item?.quantity <= 1}
            onChange={() => {}}
          >
            -
          </button>
          <div className="flex w-[64px] items-start justify-center border-t border-b border-quaternary px-[12px]">
            {item?.quantity}
          </div>
          <button
            className="flex cursor-pointer items-center border px-[5px]"
            onClick={() => handleQuantity("inc", item?.id)}
            disabled={item?.stock === item?.quantity}
            onChange={() => {}}
          >
            +
          </button>
          <div className="absolute -top-[20px] -left-[16px]">
            {item?.stock === item?.quantity && (
              <p className="ml-4 text-[12px] text-primary">Riced max stock</p>
            )}
          </div>
        </div>

        <p className="mr-[50px] ml-[20px] text-[13px]">
          Tk <span className="font-semibold">{item?.price} </span> X{" "}
          <span className="inline-flex w-[30px] items-center text-black">{item?.quantity}</span>
        </p>

        <button
          onClick={() => handleRemoveProduct(item.id, item.color!, item.size)}
          className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center bg-quaternary"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
