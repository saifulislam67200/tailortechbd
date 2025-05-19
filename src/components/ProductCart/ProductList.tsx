import { BiSupport } from "react-icons/bi"
import CartCard from "./CartCard"

const ProductList = () => {
    return (
        <div className="w-full  bg-white p-[5px]">
            <div className="h-[40px] bg-tertiary flex items-center justify-between  px-[16px] py-[8px]">
                <p className="text-[16px] font-bold text-black">You have (1) items in your cart</p>

                <p className="text-[15px] font-bold text-primary flex items-center gap-[3px] underline">
                    <BiSupport />
                    Need Help?
                </p>
            </div>

            <div className="flex justify-between items-center mt-[27px] pl-[20px]  md:pl-[35px] pr-[12px]">
                <div className="flex items-center gap-[35px]">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className="text-[16px]">Check All</label>
                </div>
                <button className="bg-quaternary px-[10px] rounded-full font-bold text-info">Delete</button>
            </div>

            <div>
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
                <CartCard />
            </div>

        </div>
    )
}

export default ProductList