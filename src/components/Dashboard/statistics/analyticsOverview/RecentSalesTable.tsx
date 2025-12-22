"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import { useGetRecentSalesQuery } from "@/redux/features/statistics/statistics.api";
import { IOrderStatus } from "@/types/order";
import RecentSalesTableSkeleton from "@/components/ui/Skeleton/RecentSalesTableSkeleton";
import dateUtils from "@/utils/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "on-delivery":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCurrentStatus = (statusArray: IOrderStatus[]) => {
  return statusArray[statusArray.length - 1]?.status || "pending";
};

export interface IUser {
  _id: string;
  fullName: string;
  role: "user" | "admin"; // Extend with more roles if needed
  email: string;
  phoneNumber: string;
}

interface ProductColor {
  color: string;
  sizes: {
    size: string;
    stock: number;
    _id: string;
  }[];
  images: string[];
  _id: string;
}

export interface IProduct {
  _id: string;
  image: string;
  name: string;
  price: number;
  colors?: ProductColor[];
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  product_id: string;
  product: IProduct;
  color: string;
  size: string;
  quantity: number;
}

export interface ISale {
  _id: string;
  user: IUser;
  orderItems: IOrderItem[];
  totalProductAmount: number;
  deliveryFee: number;
  status: IOrderStatus[];
  createdAt: string;
}

const RecentSalesTable = () => {
  const selectedFilter = { value: "custom", label: "Select Range" };
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({ startDate: undefined, endDate: undefined });
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const queryParams: Record<string, string | number> = { page, limit };
  if (dateRange.startDate) queryParams.startDate = dateUtils.formatDateLocal(dateRange.startDate);
  if (dateRange.endDate) queryParams.endDate = dateUtils.formatDateLocal(dateRange.endDate);
  const { data: getRecentSales, isLoading, refetch } = useGetRecentSalesQuery(queryParams);

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      refetch();
    }
  }, [dateRange.startDate, dateRange.endDate, refetch]);

  const recentSales = getRecentSales?.data || [];

  const metaData = getRecentSales?.meta || { totalDoc: 0, page: 1 };

  if (isLoading) {
    return <RecentSalesTableSkeleton />;
  }

  return (
    <div className="bg-white p-[16px]">
      <div className="flex flex-col justify-between gap-2 pb-4 md:flex-row md:items-center">
        <div className="flex items-center gap-[5px]">
          <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Recent Sales</h3> |{" "}
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
            className="ml-2 rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="0 text-left">
              <th className="px-4 py-[20px]">Product</th>
              <th className="px-4 py-[20px]">Customer</th>
              <th className="px-4 py-[20px]">Total Items</th>
              <th className="px-4 py-[20px]">Price</th>
              <th className="px-4 py-[20px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales?.map((sale: ISale) => (
              <tr key={sale?._id} className="border-t border-quaternary hover:bg-quaternary/20">
                <td className="flex max-w-[200px] cursor-pointer items-center gap-1 px-4 py-[20px]">
                  <Image
                    width={200}
                    height={200}
                    src={sale?.orderItems?.[0]?.product?.image}
                    alt={sale?.orderItems?.[0]?.product?.name.split(" ").join("-")}
                    className="h-12 w-full max-w-12 rounded border border-quaternary/30 object-cover"
                  />
                  <span className="line-clamp-1"> {sale?.orderItems?.[0]?.product?.name}</span>
                </td>
                <td className="px-4 py-[20px]">
                  <span className="line-clamp-1 block capitalize"> {sale?.user?.fullName}</span>
                  <span className="block">{sale?.user?.phoneNumber}</span>
                </td>

                <td className="cursor-pointer px-4 py-[20px]">{sale?.orderItems?.length}</td>
                <td className="px-4 py-[20px]">{Math.floor(sale?.totalProductAmount)}</td>
                <td className="px-4 py-[20px]">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${getStatusBadgeColor(getCurrentStatus(sale?.status))}`}
                  >
                    {getCurrentStatus(sale?.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination limit={5} totalDocs={metaData.totalDoc} onPageChange={(page) => setPage(page)} />
    </div>
  );
};

export default RecentSalesTable;
