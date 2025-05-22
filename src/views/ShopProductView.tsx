import CategoryProductFiltering from "@/components/Category/CategoryProductFiltering";
import CategoryProductPagination from "@/components/Category/CategoryProductPagination";
import FilterCountDisplay from "@/components/Category/FilterCountDisplay";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import ProductPrimaryCard from "@/components/ui/Card/ProductCard/ProductPrimaryCard";
import DataNotFound from "@/components/ui/DataNotFound";
import { baseUrl } from "@/redux/api/api";
import { TSearchParams } from "@/types";
import { IProduct } from "@/types/product";

const ShopProductView = async ({ searchParams }: TSearchParams) => {
  const search = await searchParams;

  const searchTerm = search.searchTerm || "";
  const page = search.page || "1";
  const sort = search.sort || "";

  const res = await fetch(
    `${baseUrl}/product/get?page=${page}&searchTerm=${searchTerm}&limit=12&sort=${sort}`,
    {
      cache: "no-cache",
    }
  );

  const data = (await res.json()) as {
    data: IProduct[];
    meta: { limit: number; page: number; totalDoc: number };
  };

  return (
    <div className="main_container py-[20px]">
      <Breadcrumb />
      <div className="my-[20px] flex flex-wrap items-center justify-between gap-[10px] border-[1px] border-border-muted bg-white p-[16px]">
        <p className="font-bold">
          Total <span className="font-[700] text-primary">{data.meta.totalDoc}</span> Products Found
        </p>

        <CategoryProductFiltering />
      </div>
      <FilterCountDisplay />
      {data.data.length ? (
        <>
          <div className="mt-4 grid w-full grid-cols-1 justify-center gap-[16px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {data.data?.map((data) => <ProductPrimaryCard key={data._id} product={data} />)}
          </div>
          <CategoryProductPagination totalDoc={data.meta.totalDoc} />
        </>
      ) : (
        <DataNotFound title="No Product Found" className="h-[200px]" />
      )}
    </div>
  );
};

export default ShopProductView;
