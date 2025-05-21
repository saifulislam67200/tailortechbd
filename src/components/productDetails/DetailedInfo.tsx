import { Minus, Plus } from "lucide-react";
import Image from "next/image";

const DetailedInfo = () => {
    return (
        <section className="w-full bg-white px-[10px] py-[10] md:px-[20px]">
            <h1 className="text-[14px] md:text-[18px] font-semibold">Royal Silk Saree</h1>

            <div className="flex items-center mt-[15px] gap-[10px]">
                <h1 className="text-[20px] font-semibold">Price: TK 500</h1>
                <h2 className="text-[20px] line-through mt-[8px]">550</h2>
                <p className="bg-primary text-[12px] px-2 rounded-full mt-[8px] text-white">10% Off</p>
            </div>

            {/* colors  */}
            <h1 className=" mt-[30px] text-[20px]">Colors:</h1>
            <div className="flex items-center gap-[20px] mt-[5px]">
                {[1, 2, 3, 4]?.map((item, index) => (
                    <div key={index} >
                        <button className="cursor-pointer w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] bg-red-500 rounded-full border-2 border-info "></button>
                        <p className="text-[12px] text-info text-center leading-[8px]">Red</p>
                    </div>
                ))}
            </div>

            {/* // sizes  */}
            <h1 className=" mt-[30px] text-[20px]">Sizes:</h1>
            <div className="flex items-center gap-[20px] mt-[5px]">
                {["S", "M", "L", "XL"]?.map((item, index) => (
                    <button key={index} className="w-[35px] h-[35px] bg-quaternary text-[18px] cursor-pointer">{item}</button>
                ))}
            </div>

            {/* // quantity update  */}
            <div className="flex items-center border px-[10px] border-quaternary w-[120px] h-[40px] mt-[40px]">
                <button className="cursor-pointer   text-info">
                    <Minus />
                </button>
                <p className="w-full text-center">{1}</p>
                <button className="cursor-pointer  text-info">
                    <Plus />
                </button>
            </div>

            {/* // add to cart button  */}
            <div className="flex flex-col sm:flex-row gap-[20px] items-center mt-[50px] sm:max-w-[400px]">
                <button className="cursor-pointer bg-primary text-white w-full h-[40px]  rounded-md hover:bg-info transition-all duration-300">
                    Add to cart
                </button>
                <button className="cursor-pointer w-full h-[40px] rounded-md bg-quaternary transition-all duration-300">
                    Add To Wishlist
                </button>
            </div>


            {/* // banner area  */}

            <div className="w-full mt-[50px]">
                {
                    ["/banner-details-page.png", "/banner-details-page.png"]?.map((item, index) => (
                        <div key={index} className="w-full aspect-[10/2] flex items-center justify-center">
                            <Image
                                src={item}
                                alt="banner"
                                width={1000}
                                height={300}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default DetailedInfo;