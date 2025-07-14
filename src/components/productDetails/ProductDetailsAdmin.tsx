"use server";

import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";
import ProductClientProviderAdmin from "./ProductClientProviderAdmin";
import DashboardPageHeadingTitle from "../Dashboard/DashboardPageHeadingTitle";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";

interface IProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsAdmin: React.FC<IProps> = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";

  const res = await fetch(`${baseUrl}/product/get/${slug}`, {
    cache: "no-store",
  });

  const data = (await res.json()) as { data: IProduct };
  const product = data?.data;

  if (!product || Object.keys(product).length === 0) {
    return notFound();
  }

  return (
    <>
      <DashboardPageHeadingTitle title="Product Details" />

      <div className="relative mt-[10px] w-full bg-white pt-5">
        <Link
          href="/dashboard/products"
          className="ml-7 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
        >
          <BsArrowLeft size={14} />
        </Link>

        <ProductClientProviderAdmin product={product} slug={slug}>
          <h1 className="line-clamp-1 text-[14px] font-semibold text-strong sm:text-[25px]">
            {product?.name}
          </h1>
          {product.discount ? (
            <div className="flex items-center gap-[10px]">
              <span className="text-[18px] font-semibold">
                ৳ {Math.round(product?.price - product.price * (product.discount / 100) || 0)}
              </span>
              <span className="mt-[8px] text-[15px] font-bold text-info line-through">
                ৳ {product?.price}
              </span>
              <span className="mt-[6px] rounded-full bg-primary px-2 text-[12px] font-bold text-white">
                {product?.discount}% Off
              </span>
            </div>
          ) : (
            <span className="text-[18px] font-semibold">৳ {product?.price}</span>
          )}
          <h5 className="tex-info text-[12px] font-light">Product Id: {product?.sku}</h5>
          <h5 className="tex-info text-[12px] font-light">Color: {product?.sku}</h5>
        </ProductClientProviderAdmin>
      </div>
    </>
  );
};

export default ProductDetailsAdmin;
