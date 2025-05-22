import ProductSizeChart from "./ProductSizeChart";
import { IProduct } from "@/types/product";
import DetailsInfoActions from "./DetailsInfoActions";

const DetailedInfo = ({ product }: { product: IProduct }) => {
  return (
    <section className="w-full bg-white px-[10px] py-[10] md:px-[20px]">
      <h1 className="line-clamp-1 text-[14px] font-semibold text-strong sm:text-[25px]">
        {product?.name}
      </h1>

      <div className="flex items-center gap-[10px]">
        <h1 className="text-[18px] font-semibold">Price: TK {product?.price}</h1>
        <h2 className="mt-[8px] text-[15px] font-bold text-info line-through">
          {(product?.price + (product?.price * (product?.discount || 0)) / 100)?.toFixed(2)}
        </h2>
        <p className="mt-[6px] rounded-full bg-primary px-2 text-[12px] font-bold text-white">
          {product?.discount}% Off
        </p>
      </div>

      <DetailsInfoActions product={product} />

      {/* // sizes area  */}
      <ProductSizeChart chart={product?.chart} />
    </section>
  );
};

export default DetailedInfo;
