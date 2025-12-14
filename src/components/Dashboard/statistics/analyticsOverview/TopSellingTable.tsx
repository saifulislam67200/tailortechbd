"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetTopSellingProductsQuery } from "@/redux/features/statistics/statistics.api";
import Pagination from "@/components/ui/Pagination";
import TopSellingTableSkeleton from "@/components/ui/Skeleton/TopSellingTableSekleton";
import dateUtils from "@/utils/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

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
  const selectedFilter = { value: "custom", label: "Select Range" };
  const [dateRange, setDateRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined }>({ startDate: undefined, endDate: undefined });
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  
  const queryParams: Record<string, string | number> = { page, limit };
  if (dateRange.startDate) queryParams.startDate = dateUtils.formatDateLocal(dateRange.startDate);
  if (dateRange.endDate) queryParams.endDate = dateUtils.formatDateLocal(dateRange.endDate);
  const { data: getTopSellingProducts, isLoading, refetch } = useGetTopSellingProductsQuery(queryParams);

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      refetch();
    }
  }, [dateRange.startDate, dateRange.endDate, refetch]);

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

        <div className="flex items-center justify-start gap-2">
          <DatePicker
            selected={dateRange.startDate}
            dateFormat={"dd MMM yyyy"}
            placeholderText="Start Date"
            icon={<IoCalendarNumberOutline />}
            className="max-w-[150px] cursor-pointer border border-quaternary px-[12px] py-[6px] text-sm focus:outline-none"
            onChange={(date) => setDateRange({ ...dateRange, startDate: date || undefined })}
          />
          -
          <DatePicker
            selected={dateRange.endDate}
            dateFormat={"dd MMM yyyy"}
            placeholderText="End Date"
            icon={<IoCalendarNumberOutline />}
            className="max-w-[150px] cursor-pointer border border-quaternary px-[12px] py-[6px] text-sm focus:outline-none"
            onChange={(date) => setDateRange({ ...dateRange, endDate: date || undefined })}
          />
          <button
            onClick={() => setDateRange({ startDate: undefined, endDate: undefined })}
            className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
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
