"use client";
import Image from "next/image";
import { useState } from "react";
import AnalyticsOverviewFilter from "./AnalyticsOverviewFilter";
import { useGetTopSellingProductsQuery } from "@/redux/features/statistics/statistics.api";
import Pagination from "@/components/ui/Pagination";
import TopSellingTableSkeleton from "@/components/ui/Skeleton/TopSellingTableSekleton";

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
];

interface IProduct {
  _id: number;
  productId: string;
  name: string;
  image: string;
  price: string;
  sold: number;
  earning: string;
}

const TopSellingTable = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[2]);
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const { data: getTopSellingProducts, isLoading } = useGetTopSellingProductsQuery({
    period: selectedFilter.value,
    page,
    limit,
  });

  const topSellingProducts = getTopSellingProducts?.data || [];
  const metaData = getTopSellingProducts?.meta || { totalDoc: 0, page: 1 };

  if (isLoading) {
    return <TopSellingTableSkeleton />;
  }

  return (
    <div className="bg-white p-[16px]">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-[5px]">
          <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Top Selling</h3> |{" "}
          <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter.label}</p>
        </div>

        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-info">
              <th className="px-4 py-[20px]">Preview</th>
              <th className="px-4 py-[20px]">Product</th>
              <th className="px-4 py-[20px]">Price</th>
              <th className="px-4 py-[20px]">Sold</th>
              <th className="px-4 py-[20px]">Earning</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts?.map((product: IProduct) => (
              <tr
                key={product?._id}
                className="border-t border-t-quaternary hover:bg-quaternary/20"
              >
                <td className="px-4 py-3">
                  {product?.image ? (
                    <Image
                      width={200}
                      height={200}
                      src={product.image}
                      alt={product?.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                </td>
                <td className="cursor-pointer px-4 py-3 font-medium text-primary hover:underline">
                  {product?.name}
                </td>
                <td className="px-4 py-3">{product?.price}</td>
                <td className="px-4 py-3 font-bold">{product?.sold}</td>
                <td className="px-4 py-3">{product?.earning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalDocs={metaData.totalDoc} limit={5} onPageChange={(page) => setPage(page)} />
    </div>
  );
};

export default TopSellingTable;
