import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import TopProductCardActions from "./TopProductCardActions";

const TopProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex h-[120px] w-full items-center gap-[20px] rounded-[5px] bg-white p-[12px] shadow-xs transition-all duration-400 ease-in-out hover:shadow-lg">
      <Link
        href={`/product/${product?.slug}`}
        className="relative aspect-square h-20 w-20 rounded bg-tertiary"
      >
        <Image
          src={product?.images?.[0]}
          alt="Product-image"
          fill
          className="rounded object-contain"
          priority
        />
      </Link>
      <div>
        <Link href={`/product/${product?.slug}`}>
          <h1 className="line-clamp-1 text-[13px] font-bold">{product?.name}</h1>
          <p className="text-14px font-semibold text-strong">TK: {product?.price}</p>
        </Link>
        <TopProductCardActions product={product} />
      </div>
    </div>
  );
};

export default TopProductCard;
