"use server";

import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";
import DashboardPageHeadingTitle from "../Dashboard/DashboardPageHeadingTitle";
import ProductClientProviderAdmin from "./ProductClientProviderAdmin";

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
          <span className="mt-2 block w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            Product Id: {product.sku}
          </span>
          <span className="text-sm text-gray-500">
            Last Updated: {new Date(product.updatedAt || 0).toLocaleString()}
          </span>
        </ProductClientProviderAdmin>
      </div>
    </>
  );
};

export default ProductDetailsAdmin;
