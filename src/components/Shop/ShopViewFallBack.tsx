import Breadcrumb from "../ui/BreadCrumbs";
import ProductPrimaryCardSkeleton from "../ui/Skeleton/ProductPrimaryCardSkeleton";
import FilterCountDisplay from "./FilterCountDisplay";
import ShopProductFiltering from "./ShopProductFiltering";

const ShopViewFallBack = () => {
  return (
    <div className="main_container py-[20px]">
      <Breadcrumb />
      <div className="my-[20px] flex flex-wrap items-center justify-between gap-[10px] border-[1px] border-border-muted bg-white p-[16px]">
        <p className="font-bold">
          Total <span className="font-[700] text-primary">00</span> Products Found
        </p>

        <ShopProductFiltering />
      </div>
      <FilterCountDisplay />

      <div className="mt-4 grid w-full grid-cols-1 justify-center gap-[16px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductPrimaryCardSkeleton key={index + "product_fallback_skeleton"} />
        ))}
      </div>
    </div>
  );
};

export default ShopViewFallBack;
