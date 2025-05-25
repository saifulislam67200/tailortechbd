"use client";
import { useGetTopProuctsQuery } from "@/redux/features/product/product.api";
import TopProductCard from "../ui/Card/ProductCard/TopProductCard";
import Title from "../ui/Title";

const DetailsPageTOPProduct = () => {
  const { data } = useGetTopProuctsQuery({
    limit: 6,
    fields: "name,slug,images,price,discount,colors",
  });
  const products = data?.data || [];

  return (
    <div className="w-full md:max-w-[432px]">
      <Title title="TOP PRODUCTS" className="!text-[14px]" />
      <div className="mt-[10px] w-full space-y-[10px]">
        {products?.map((product) => <TopProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default DetailsPageTOPProduct;
