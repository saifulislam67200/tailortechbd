"use client";
import { useAppSelector } from "@/hooks/redux";
import Link from "next/link";

const DetailsAndPrice = () => {
    const cartItems = useAppSelector((state) => state?.cart?.items) ?? [];

    const { subtotal, totalDiscount } = cartItems?.reduce(
        (acc, item) => {
            acc.subtotal += item?.price * item?.quantity;
            acc.totalDiscount += item?.discount * item?.quantity;
            return acc;
        },
        { subtotal: 0, totalDiscount: 0 }
    );

    const total = subtotal - totalDiscount;

    return (
        <div className="w-full lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[578px] h-[246px]">
            <div className=" bg-white p-[5px] mb-[16px]">
                <div className="h-[40px] bg-tertiary">
                    <p className="text-[16px] font-bold capitalize text-black px-[16px] py-[8px]">Price details</p>
                </div>

                <ul className="px-[13px] pt-[20px] pb-[23px]">
                    <li className="flex justify-between items-center mb-[8px]">
                        <p className="text-[14px] font-bold">Subtotal</p>
                        <p className="text-[14px] font-bold">TK {subtotal}</p>
                    </li>
                    <li className="flex justify-between items-center mb-[8px]">
                        <p className="text-[14px] font-bold">Ecom Discount</p>
                        <p className="text-[14px] font-bold">TK {totalDiscount}</p>
                    </li>
                    <li className="flex justify-between items-center">
                        <p className="text-[14px] font-bold">Total</p>
                        <p className="text-[14px] font-bold">TK {total}</p>
                    </li>
                </ul>
            </div>

            <button className="w-full h-[26px] bg-black mb-[8px] flex justify-center items-center text-[12px] font-bold text-white">Continue Shopping</button>
            <Link href="/checkout" className="w-full h-[26px] bg-primary  flex justify-center items-center text-[12px] font-bold text-white">Checkout</Link>
        </div>
    );
};

export default DetailsAndPrice;