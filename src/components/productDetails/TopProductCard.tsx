import { IProduct } from "@/types/product";
import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";

const TopProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex h-[120px] w-full items-center gap-[20px] rounded-[5px] bg-white p-[12px] shadow-xs transition-all duration-400 ease-in-out hover:shadow-lg">
      <div className="relative aspect-square h-20 w-20 rounded bg-tertiary">
        <Image
          src={product?.images?.[0]}
          alt="Product-image"
          fill
          className="rounded object-contain"
          priority
        />
      </div>
      <div>
        <h1 className="line-clamp-1 text-[13px] font-bold">{product?.name}</h1>
        <p className="text-14px font-semibold text-strong">TK: {product?.price}</p>

        <div className="mt-[10px] flex items-center gap-[8px]">
          <button className="flex h-[26px] w-[75px] items-center justify-center rounded-[5px] bg-primary text-[12px] font-semibold text-white">
            Add to Cart
          </button>

          <button className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-tertiary text-info">
            <FiRefreshCw />
          </button>

          <button className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-tertiary text-info">
            <BsEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopProductCard;
