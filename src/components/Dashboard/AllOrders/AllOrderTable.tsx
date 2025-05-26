"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { IOrderStatus } from "@/types/order";
import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import Pagination from "@/components/ui/Pagination";
import useDebounce from "@/hooks/useDebounce";
import { RxMagnifyingGlass } from "react-icons/rx";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Image from "next/image";

const tableHead = [
  { label: "Name", field: "name" },
  { label: "Product", field: "product" },
  { label: "Total Items", field: "price" },
  { label: "Total Amount", field: "discount" },
  { label: "Status", field: "" },
  { label: "Date", field: "createdAt" },
  { label: "View Details", field: "" },
];
const AllOrderTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [page, setPage] = useState<number>(1);
  const { data } = useGetAllOrdersQuery({ searchTerm, page, limit: 10 });
  const orders = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "on-delivery":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return `৳${Math.round(price)}`;
  };

  const getCurrentStatus = (statusArray: IOrderStatus[]) => {
    return statusArray[statusArray.length - 1]?.status || "pending";
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Order List</h1>
          <p className="text-[14px] text-muted">
            Displaying All the available orders in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> orders. Data is
            Devided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center sm:gap-2">
          {/* Search */}
          <div className="flex w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Order"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          {/* Filters */}
          {/* <div className="flex flex-col gap-4 sm:flex-row">
            <select
              className="rounded-[5px] border-[1px] border-dashboard/20 p-[5px] focus:border-dashboard/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">On Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div> */}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white shadow">
          <table className="min-w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-[24px] py-[12px] text-left text-[14px] font-semibold tracking-wider text-dashboard capitalize"
                  >
                    {heading?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders?.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  {/* <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <span className="text-[14px] capitalize">{order.shippingAddress.name}</span>
                  </td> */}
                  <td className="px-[24px] py-[16px] whitespace-nowrap w-[150px]">
                    <span
                      className="text-[14px] capitalize block truncate max-w-[120px]"
                      title={order.shippingAddress.name}
                    >
                      {order.shippingAddress.name}
                    </span>
                  </td>
                  <td className="px-[24px] py-[16px]">
                    <div className="h-12 w-12 flex-shrink-0">
                      <Image
                        className="h-12 w-12 rounded-lg object-cover"
                        src={
                          order.orderItems[0]?.product?.image ||"avatar.png"
                        }
                        alt={order.orderItems[0]?.product?.name || "Product"}
                        width={48}
                        height={48}
                      />
                    </div>
                  </td>

                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <span className="text-[14px]">{order?.orderItems.length || 0} items</span>
                  </td>
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <span className="text-[14px]">
                      {formatPrice(order.totalProductAmount + (order?.deliveryFee || 0))}
                    </span>
                  </td>
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[13px] capitalize ${getStatusBadgeColor(getCurrentStatus(order.status))}`}
                    >
                      {getCurrentStatus(order.status)}
                    </span>
                  </td>
                  <td className="px-[24px] py-[16px] text-[14px] whitespace-nowrap">
                    {formatDate(order?.createdAt || "")}
                  </td>
                  <td className="px-[24px] py-[16px] text-[14px] font-medium whitespace-nowrap">
                    <Link
                      href={`/dashboard/all-orders/${order._id}/edit`}
                      className="rounded-full text-dashboard"
                      title="Update Order"
                    >
                      <FiEdit className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders?.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">No orders found</div>
              <p className="mt-2 text-gray-400">Try changing your search criteria</p>
            </div>
          )}
        </div>
      </div>
      <Pagination totalDocs={metaData.totalDoc || 0} onPageChange={(page) => setPage(page)} />
    </div>
  );
};

export default AllOrderTable;
