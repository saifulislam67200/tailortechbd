import React from "react";
import Title from "../ui/Title";
import { products } from "@/mock/FakeProducts";
import TopProductCard from "./TopProductCard";

const DetailsPageTOPProduct = () => {
  return (
    <div className="w-full md:max-w-[432px]">
      <Title title="TOP PRODUCTS" className="!text-[14px]" />
      <div className="mt-[10px] w-full space-y-[10px]">
        {products?.map((product, index) => <TopProductCard key={index} {...product} />)}
      </div>
    </div>
  );
};

export default DetailsPageTOPProduct;
