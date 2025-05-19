"use client";
import { BiSupport } from "react-icons/bi"
import CartCard from "./CartCard"
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { deleteCheckedItems, toggleSelectAll } from "@/redux/features/cart/cartSlice";

const ProductList = () => {
    const { items: cartItems, checkedItems } = useAppSelector((state) => state?.cart) ?? [];
    const dispatch = useDispatch();

    const handleDeleteCheckedProducts = () => {
        dispatch(deleteCheckedItems())
    }

    const handleSelectAll = () => {
        dispatch(toggleSelectAll());
    }


    return (
        <div className="w-full  bg-white p-[5px]">
            <div className="h-[40px] bg-tertiary flex items-center justify-between px-[8px]  sm:px-[16px] py-[8px]">
                <p className="text-[12px] sm:text-[16px] font-bold text-black">You have ({cartItems?.length}) items in your cart</p>
                <p className="text-[12px] sm:text-[15px] font-bold text-primary flex items-center gap-[3px] underline">
                    <BiSupport />
                    Need Help?
                </p>
            </div>
            <div className="flex justify-between items-center mt-[27px] pl-[20px]  md:pl-[35px] pr-[12px]">
                <div className="flex items-center gap-[35px]">
                    <input checked={cartItems?.length === checkedItems?.length} onClick={() => handleSelectAll()} type="checkbox" name="" id="select-all" className="cursor-pointer" />
                    <label htmlFor="select-all" className="text-[16px] cursor-pointer">Check All</label>
                </div>
                <button onClick={handleDeleteCheckedProducts} className="bg-quaternary px-[10px] rounded-full font-bold text-info">Delete</button>
            </div>
            {
                (cartItems?.length > 0) ? (
                    cartItems?.map((item) => <CartCard key={item?.id} item={item} />)
                ) :
                    (<h3 className="text-info text-[16px] mt-[30px] text-center">Cart Empty, No Product Added</h3>)
            }
        </div>
    )
}

export default ProductList;