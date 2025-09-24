"use server";

import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";
import ProductClientProvier from "./ProductClientProvier";

interface IProps {
  params: Promise<{ slug: string }>;
}

const ProductDetails: React.FC<IProps> = async ({ params }) => {
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
      <ProductClientProvier product={product} slug={slug}>
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
        <h5 className="tex-info text-[12px] font-light">Product Code: {product?.sku}</h5>
      </ProductClientProvier>
    </>
  );
};

export default ProductDetails;
