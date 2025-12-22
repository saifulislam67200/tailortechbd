"use server";

import FilterCountDisplay from "@/components/Shop/FilterCountDisplay";
import ShopProductFiltering from "@/components/Shop/ShopProductFiltering";
import ShopProductPagination from "@/components/Shop/ShopProductPagination";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import ProductPrimaryCard from "@/components/ui/Card/ProductCard/ProductPrimaryCard";
import DataNotFound from "@/components/ui/DataNotFound";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import Image from "next/image";

interface IProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const CategoryShopProductView: React.FC<IProps> = async ({ searchParams, params }) => {
  const search = await searchParams;
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";
  console.log(slug);

  const searchTerm = search.searchTerm || "";
  const page = search.page || "1";
  const sort = search.sort || "";

  const res = await fetch(
    `${baseUrl}/product/get?page=${page}&searchTerm=${searchTerm}&limit=12&category=${slug}&sort=${sort}`,
    {
      cache: "no-cache",
    }
  );

  const categoryRes = await fetch(`${baseUrl}/category/get/${slug}`, {
    cache: "no-cache",
  });

  const categoryData = (await categoryRes.json()) || [];

  const data = (await res.json()) as {
    data: IProduct[];
    meta: { limit: number; page: number; totalDoc: number };
  };
  const formatData = () => {
    if (!sort) {
      return data.data || [];
    }
    if (sort.includes("-price")) {
      return data.data.sort((a: IProduct, b: IProduct) => {
        const A_DiscountedPrice = a.price - (a.price * a.discount) / 100;
        const B_DiscountedPrice = b.price - (b.price * b.discount) / 100;
        return B_DiscountedPrice - A_DiscountedPrice;
      });
    } else if (sort.includes("price")) {
      return data.data.sort((a: IProduct, b: IProduct) => {
        const A_DiscountedPrice = a.price - (a.price * a.discount) / 100;
        const B_DiscountedPrice = b.price - (b.price * b.discount) / 100;
        return A_DiscountedPrice - B_DiscountedPrice;
      });
    } else {
      return data.data || [];
    }
  };

  return (
    <div className="main_container py-[20px]">
      <Breadcrumb />
      {categoryData?.data?.banner && categoryData?.data?.bannerDisplay && (
        <div className="relative mt-[10px] aspect-[16/6] w-full overflow-hidden sm:mt-0">
          <Image
            src={categoryData.data.banner}
            alt={categoryData.data.label || "Category banner"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
            quality={85}
            priority
          />
        </div>
      )}
      <div className="my-[20px] flex flex-wrap items-center justify-between gap-[10px] border-[1px] border-border-muted bg-white p-[16px]">
        <p className="font-bold">
          Total <span className="font-[700] text-primary">{data.meta.totalDoc}</span> Products Found
        </p>

        <ShopProductFiltering />
      </div>
      <FilterCountDisplay />
      {data.data.length ? (
        <>
          <div className="mt-4 grid w-full grid-cols-2 justify-center gap-[16px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {formatData()?.map((data) => <ProductPrimaryCard key={data._id} product={data} />)}
          </div>
          <ShopProductPagination totalDoc={data.meta.totalDoc} />
        </>
      ) : (
        <DataNotFound title="No Product Found" className="h-[60vh]" />
      )}
    </div>
  );
};

export default CategoryShopProductView;
