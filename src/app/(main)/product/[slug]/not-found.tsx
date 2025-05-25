"use client";

import ProductPrimaryCard from "@/components/ui/Card/ProductCard/ProductPrimaryCard";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useGetTopProuctsQuery } from "@/redux/features/product/product.api";
import Link from "next/link";
import { useEffect } from "react";
import { TbFaceIdError } from "react-icons/tb";

const NotFound = () => {
  const { data } = useGetTopProuctsQuery({
    limit: 20,
    fields: "name,slug,images,price,discount,colors",
  });
  const products = data?.data || [];

  useEffect(() => {
    document.title = "PRODUCT NOT FOUND | TailorTech";
  }, []);

  return (
    <div className="w-full bg-white/80 py-[50px]">
      <div className="main_container flex min-h-screen w-full flex-col items-center justify-center py-[50px]">
        <TbFaceIdError className="text-[100px] text-primary" />
        <h3 className="text-[100px] leading-[100%] font-bold text-primary">404</h3>
        <p className="mt-[10px] text-center text-[20px] font-[600]">
          Sorry we couldn&apos;t find this item <br /> you were looking for
        </p>
        <p className="mt-[15px] text-center text-[14px]">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          href="/"
          className="mt-[20px] border-[1px] border-primary bg-primary px-[16px] py-[8px] text-white duration-[0.3s] hover:bg-transparent hover:text-primary"
        >
          Back To Home
        </Link>
        <HorizontalLine className="my-[20px]" />

        <div className="gridResponsive w-full gap-[10px]">
          {products.map((product) => (
            <ProductPrimaryCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
