import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import ProductAddToCartModal from "../../ProductAddToCartModal";
import ProductQuickOverviewModal from "@/components/Dashboard/Product/ProductQuickOverviewModal";

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
          <h5 className="text-light text-[12px] text-info">Product Code: {product.sku}</h5>
          <p className="text-14px font-semibold text-strong">TK: {product?.price}</p>
        </Link>
        <div className="mt-[10px] flex items-center gap-[8px]">
          <ProductAddToCartModal product={product}>
            <button className="flex h-[26px] w-[75px] cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[12px] font-semibold text-white">
              Add to Cart
            </button>
          </ProductAddToCartModal>

          <ProductQuickOverviewModal product={product}>
            <button
              title="Quick overview"
              className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[5px] bg-tertiary text-info"
            >
              <BsEye />
            </button>
          </ProductQuickOverviewModal>
        </div>
      </div>
    </div>
  );
};

export default TopProductCard;
