import React from "react";
import Title from "../ui/Title";
import SimilarProductCard from "./SimilarProductCard";
import { products } from "@/mock/FakeProducts";

const DetailsPageSimilarProduct = () => {
  return (
    <div className="w-full md:max-w-[432px]">
      <Title title="RELATED PRODUCTS" className="!text-[14px]" />
      <div className="mt-[10px] w-full space-y-[10px]">
        {products.map((product, index) => (
          <SimilarProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default DetailsPageSimilarProduct;
