"use client";
import useSetSearchParams from "@/hooks/useSetSearchParams";
import Pagination from "../ui/Pagination";

const ShopProductPagination = ({ totalDoc }: { totalDoc: number }) => {
  const { updateSearchParams } = useSetSearchParams();
  return (
    <div className="mt-[20px] pb-[20px]">
      <Pagination
        totalDocs={totalDoc}
        onPageChange={(page) => updateSearchParams({ page: String(page) })}
      />
    </div>
  );
};

export default ShopProductPagination;
