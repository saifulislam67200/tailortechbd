import Image from "next/image"
import { RiDeleteBin6Line } from "react-icons/ri"

const CartCard = () => {
    return (
        <div className="pt-[20px] pb-[14px] border-b-[1px] border-quaternary mx-[10px]">
            <div className="flex items-center pl-[10px] md:pl-[25px]">
                <input type="checkbox" name="" id="" />

                <div className="max-w-[70px] min-w-[70px] h-[70px] ml-[22px] md:ml-[53px] mr-[16px] md:mr-[35px]">
                    <Image
                        src="/macbook.jpeg"
                        width={300}
                        height={300}
                        alt="product-image"
                        className="object-cover object-center w-full h-full"
                    />
                </div>
                <h1 className="text-black text-[12px] sm:text-[14px] font-bold">
                    Lenovo IdeaPad Gaming 3 15ACH6 AMD Ryzen 5 5500H 8GB RAM 512GB SSD 15.6 Inch FHD Display Shadow Black Gaming Laptop
                </h1>
            </div>

            <div className="flex justify-end pr-[10px] mt-[10px] md:mt-[0px]">
                <div className="flex items-center h-[18px]">
                    <button className="cursor-pointer px-[5px] flex items-center border">-</button>
                    <div className="w-[64px] px-[12px] border-t border-b border-quaternary flex items-start">
                        1
                    </div>
                    <button className="cursor-pointer px-[5px] flex items-center border">+</button>
                </div>

                <p className="text-[13px] ml-[20px] mr-[50px]">Tk <span className="font-semibold">700</span></p>

                <button className="cursor-pointer w-[25px] h-[25px] bg-quaternary flex justify-center items-center">
                    <RiDeleteBin6Line />
                </button>
            </div>

        </div>
    )
}

export default CartCard