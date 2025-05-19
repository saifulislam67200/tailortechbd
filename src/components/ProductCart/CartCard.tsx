"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeFromCart, TCartItem, toggleCheckItem, updateQuantity } from "@/redux/features/cart/cartSlice";
import Image from "next/image"
import { RiDeleteBin6Line } from "react-icons/ri"


const CartCard = ({ item }: { item: TCartItem }) => {
    const { items: cartItems, checkedItems } = useAppSelector((state) => state?.cart) ?? [];
    const dispatch = useAppDispatch();

    const handleQuantity = (type: "inc" | "dec", id: string) => {
        if (type === "inc") {
            dispatch(updateQuantity({ id, quantity: item?.quantity + 1 }));
        } else {
            dispatch(updateQuantity({ id, quantity: item?.quantity - 1 }));
        }
    }

    const handleRemoveProduct = (id: string) => {
        dispatch(removeFromCart(id))
    };

    const toggleCheckUncheckHandler = (item: TCartItem) => {
        dispatch(toggleCheckItem(item))
    };


    return (
        <div className="pt-[20px] pb-[14px] border-b-[1px] border-quaternary mx-[10px]">
            <div className="flex items-center pl-[10px] md:pl-[25px]">
                <input
                    checked={cartItems?.length === checkedItems?.length || checkedItems.some((checkedItem) => checkedItem.id === item.id)}
                    type="checkbox"
                    name=""
                    id=""
                    className="cursor-pointer"
                    onChange={() => toggleCheckUncheckHandler(item)}
                />

                <div className="max-w-[70px] min-w-[70px] h-[70px] ml-[22px] md:ml-[53px] mr-[16px] md:mr-[35px]">
                    <Image
                        src={item?.image || ""}
                        width={300}
                        height={300}
                        alt="product-image"
                        className="object-cover object-center w-full h-full"
                    />
                </div>
                <h1 className="text-black text-[12px] sm:text-[14px] font-bold">
                    {item?.name}
                </h1>
            </div>


            <div className="flex justify-end pr-[10px] mt-[10px] md:mt-[0px] ">
                <div className="flex items-center h-[18px] relative">
                    <button
                        className="cursor-pointer px-[5px] flex items-center border"
                        onClick={() => handleQuantity("dec", item?.id)}
                        disabled={item?.quantity <= 1}
                    >-</button>
                    <div className="w-[64px] px-[12px] border-t border-b border-quaternary flex items-start justify-center">
                        {item?.quantity}
                    </div>
                    <button
                        className="cursor-pointer px-[5px] flex items-center border"
                        onClick={() => handleQuantity("inc", item?.id)}
                        disabled={item?.stock === item?.quantity}
                    >+</button>
                    <div className="absolute right-0 -top-[20px]">
                        {
                            item?.stock === item?.quantity && <p className="text-red-500 text-[8px] ml-4">You {`can't`} add more</p>
                        }
                    </div>
                </div>

                <p className="text-[13px] ml-[20px] mr-[50px]">Tk <span className="font-semibold">{item?.price} </span>  X <span className="w-[30px] inline-flex items-center text-black">{item?.quantity}</span></p>

                <button onClick={() => handleRemoveProduct(item?.id)} className="cursor-pointer w-[25px] h-[25px] bg-quaternary flex justify-center items-center">
                    <RiDeleteBin6Line />
                </button>

            </div>

        </div>
    )
}

export default CartCard