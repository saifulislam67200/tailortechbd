import Title from "../ui/Title";
import TopProductCard from "./TopProductCard";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";

const DetailsPageTOPProduct = async () => {
  const res = await fetch(`${baseUrl}/product/top-ordered`, {
    cache: "no-store",
  });
  const result = await res.json();
  const products: IProduct[] = result?.data || [];

  return (
    <div className="w-full md:max-w-[432px]">
      <Title title="TOP PRODUCTS" className="!text-[14px]" />
      <div className="mt-[10px] w-full space-y-[10px]">
        {products.map((product) => (
          <TopProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DetailsPageTOPProduct;
