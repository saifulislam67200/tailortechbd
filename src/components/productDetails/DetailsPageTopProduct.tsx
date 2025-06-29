"use client";
import { useGetTopProuctsQuery } from "@/redux/features/product/product.api";
import Title from "../ui/Title";
import ProductSecondaryCard from "../ui/Card/ProductCard/ProductSecondaryCard";

const DetailsPageTOPProduct = () => {
  const { data } = useGetTopProuctsQuery({
    limit: 6,
    fields: "name,slug,images,price,discount,colors",
  });
  const products = data?.data || [];

  return (
    <div className="mt-[15px] w-full">
      <Title title="TOP PRODUCTS" className="!text-[14px]" />

      <div className="my-[15px] grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products?.map((product) => <ProductSecondaryCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default DetailsPageTOPProduct;
