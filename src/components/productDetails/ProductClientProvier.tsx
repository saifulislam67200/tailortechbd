"use client";

import { IColor, IProduct } from "@/types/product";
import { useState } from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import DetailsAndInformation from "./DetailsAndInformation";
import DetailsInfoActions from "./DetailsInfoActions";
import ProductDetailsSlider from "./ProductDetailSlider";
import ProductSizeChart from "./ProductSizeChart";

const ProductClientProvier = ({
  product,
  children,
  slug,
}: {
  children: React.ReactNode;
  product: IProduct;
  slug: string;
}) => {
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  console.log("", slug);

  return (
    <div className="mx-auto max-w-[1756px] px-[16px] py-[10px] transition-all sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px]">
      <Breadcrumb />
      <div className="mt-[10px] grid grid-cols-1 gap-[10px] lg:grid-cols-2">
        <ProductDetailsSlider product={product} selectedColor={selectedColor} />
        <section className="w-full bg-white px-[10px] py-[10] md:px-[20px]">
          {children} {/*  content thta needs to render on server side*/}
          <DetailsInfoActions product={product} onColorChange={setSelectedColor} />
          <ProductSizeChart chart={product?.chart} />
        </section>
      </div>
      <DetailsAndInformation product={product} />

      {/* <RelatedProducts slug={slug} /> */}
    </div>
  );
};

export default ProductClientProvier;
