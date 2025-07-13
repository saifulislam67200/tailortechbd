"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import type { IOrder, IOrderItem, IOrderStatus } from "@/types/order";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";
import TableSkeleton from "../../ui/TableSkeleton";
import OrderStatusDropDown from "./OrderStatusDropDown";
import OrderTimelineDropDown from "./OrderTimelineDropDown";
import ViewOrder from "./ViewOrder";
import dateUtils from "@/utils/date";

const tableHead = [
  { label: "Customer Info", field: "name" },
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
  const [query, setQuery] = useState<Record<string, string | number>>({
    status: "",
    day_count: "",
  });
  // const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isViewOrder, setIsViewOrder] = useState(false);
  // const [orderItemView, setOrderItemView] = useState({});
  const [orderItemView, setOrderItemView] = useState<IOrder | null>(null);

  const { data, isLoading } = useGetAllOrdersQuery({ searchTerm, page, limit: 10, ...query });
  const orders = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-purple-100 text-purple-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "on-delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "exchange":
        return "bg-blue-100 text-blue-800";
      case "returned":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return `৳${Math.round(price)}`;
  };

  const getCurrentStatus = (statusArray: IOrderStatus[]) => {
    return statusArray[statusArray.length - 1]?.status || "pending";
  };

  const getTotalItems = (orderItems: IOrderItem[]) => {
    return orderItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const handleOrderView = (order: IOrder) => {
    setOrderItemView(order);
    setIsViewOrder(true);
    history.pushState({ viewOrder: true }, "", location.href);
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsViewOrder(false);
      setOrderItemView(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {!isViewOrder ? (
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[15px] bg-white p-[16px]">
            <div className="flex flex-col gap-[5px]">
              <div>
                <h1 className="text-[16px] font-[600]">Order List</h1>
              </div>
              <p className="text-[12px] text-muted md:text-[14px]">
                Displaying All the available orders in your store. There is total{" "}
                <span className="font-bold text-dashboard">{metaData.totalDoc}</span> orders. Data
                is Devided into{" "}
                <span className="font-bold text-dashboard">
                  {Math.ceil(metaData.totalDoc / 10)} pages
                </span>{" "}
                & currently showing page{" "}
                <span className="font-bold text-dashboard">{metaData.page}.</span>
              </p>
            </div>
            <HorizontalLine className="my-[10px]" />

            <div className="flex flex-col justify-between gap-[16] md:flex-row md:items-center md:gap-[8px]">
              {/* Search */}
              <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
                <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  placeholder="Search Order"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
                <RxMagnifyingGlass />
              </div>
              <div className="mb-0 flex items-center justify-start gap-[10px] sm:mb-[20px] xl:mb-0">
                <OrderTimelineDropDown
                  onSelect={({ value }) => {
                    setQuery({ ...query, day_count: value });
                    setPage(1);
                  }}
                />
                <OrderStatusDropDown
                  onSelect={({ value }) => {
                    setQuery({ ...query, status: value });
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white shadow">
              <table className="min-w-full divide-y divide-dashboard/20">
                <thead className="bg-dashboard/10">
                  <tr>
                    {tableHead.map((heading) => (
                      <th
                        key={heading.field || heading.label}
                        className="px-[24px] py-[12px] text-left text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]"
                      >
                        {heading?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <TableSkeleton columns={tableHead.length} />
                  ) : (
                    orders?.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        {/* Customer Info */}
                        <td className="w-[180px] px-[24px] py-[16px]">
                          <span className="flex max-w-[150px] flex-col">
                            <span
                              className="line-clamp-1 truncate text-[14px] capitalize"
                              title={order.shippingAddress.name}
                            >
                              {order.shippingAddress.name}
                            </span>
                            <span
                              className="line-clamp-1 truncate text-[12px] text-gray-500"
                              title={order.shippingAddress.phoneNumber}
                            >
                              {order.shippingAddress.phoneNumber}
                            </span>
                          </span>
                        </td>

                        {/* Product */}
                        <td className="px-[24px] py-[16px]">
                          <span className="flex max-w-[200px] items-center space-x-3">
                            <span className="h-12 w-12 flex-shrink-0">
                              <Image
                                className="h-12 w-12 rounded-lg object-cover"
                                src={order.orderItems[0]?.product?.image || "/images/avatar.jpg"}
                                alt={order.orderItems[0]?.product?.name || "Product"}
                                width={48}
                                height={48}
                              />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate text-[14px]">
                                {order.orderItems[0]?.product?.name || "Product"}
                              </span>
                              <span className="text-[12px] text-gray-500">
                                {order.orderItems[0]?.color && order.orderItems[0]?.size
                                  ? `${order.orderItems[0].color} - ${order.orderItems[0].size}`
                                  : "N/A"}
                              </span>
                            </span>
                          </span>
                        </td>

                        {/* Total Items */}
                        <td className="px-[24px] py-[16px] whitespace-nowrap">
                          <span className="text-[14px]">
                            {getTotalItems(order?.orderItems)} items
                          </span>
                        </td>

                        {/* Total Amount */}
                        <td className="px-[24px] py-[16px] whitespace-nowrap">
                          <span className="text-[14px]">
                            {formatPrice(order.totalProductAmount + (order?.deliveryFee || 0))}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-[24px] py-[16px] whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-[13px] capitalize ${getStatusBadgeColor(getCurrentStatus(order.status))}`}
                          >
                            {getCurrentStatus(order.status)}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-[24px] py-[16px] text-[14px] whitespace-nowrap">
                          {/* {formatDate(order?.createdAt || "")} */}
                          {dateUtils.formateCreateOrUpdateDate(order?.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="px-[24px] py-[16px] text-[14px] font-medium whitespace-nowrap">
                          <span className="flex justify-center">
                            <button
                              onClick={() => handleOrderView(order)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-dashboard/20 text-dashboard transition-all duration-200 hover:border-dashboard/40 hover:bg-dashboard/10 hover:text-dashboard/80"
                              title="View Details"
                            >
                              <FiEye className="h-4 w-4" />
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
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
          <Pagination
            setPage={setPage}
            page={page}
            totalDocs={metaData.totalDoc || 0}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      ) : orderItemView ? (
        <ViewOrder setIsViewOrder={setIsViewOrder} orderItem={orderItemView} />
      ) : (
        ""
      )}
    </>
  );
};

export default AllOrderTable;
