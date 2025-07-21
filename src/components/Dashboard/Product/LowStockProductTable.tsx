"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductStockQuery } from "@/redux/features/product/product.api";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useRouter } from "next/navigation";

const lowStockTableHeaders = [
  { label: "SL", field: "" },
  { label: "Product Code", field: "" },
  { label: "Name", field: "" },
  { label: "Price", field: "" },
  { label: "Category", field: "" },
  { label: "Stock", field: "" },
  { label: "Value", field: "" },
  { label: "Status", field: "" },
  { label: "Sub Category", field: "" },
  { label: "Actions", field: "" },
];

const LowStockProductTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [timeFrameFilter, setTimeFrameFilter] = useState<
    "all" | "today" | "this-week" | "this-month"
  >("all");
  const router = useRouter();

  const [lowStockQuery, setLowStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,category,createdAt,stock,status",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    timeframe: "all",
  });

  const { data: lowStockData, isLoading: isLowStockLoading } = useGetProductStockQuery({
    ...lowStockQuery,
    searchTerm,
    status: "low-stock",
    limit: 100,
    timeframe: timeFrameFilter,
  });
  const lowStockProducts = lowStockData?.data || [];
  const lowStockMetaData = lowStockData?.meta || { totalDoc: 0, page: 1 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setLowStockQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const viewProductDetails = (productId: string) => {
    router.push(`/dashboard/product-details/${productId}`);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Low Stock Products</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all low stock products in your store. Total{" "}
            <span className="font-bold text-dashboard">{lowStockMetaData.totalDoc}</span> products.
            Divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(lowStockMetaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{lowStockMetaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex items-center justify-between">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search low stock products"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Filter:</label>
            <select
              value={timeFrameFilter}
              onChange={(e) => setTimeFrameFilter(e.target.value as "all")}
              className="h-[33px] border border-quaternary px-2 text-sm focus:outline-none"
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {lowStockTableHeaders.map((header) => (
                  <th
                    key={header.field || header.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard uppercase"
                  >
                    {header.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(header.field)}
                      >
                        <span>{header.label}</span>
                        <span className="flex flex-col text-[10px] leading-[10px]">
                          <FaChevronUp
                            className={`${
                              sort.field === header.field && sort.order === "asc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === header.field && sort.order === "desc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      header.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-dashboard/20">
              {isLowStockLoading ? (
                <TableSkeleton columns={lowStockTableHeaders.length} />
              ) : lowStockProducts.length ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                lowStockProducts.map((product, index) => (
                  <tr key={product?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{index + 1}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product?.productCode || "N/A"}</span>
                    </td>

                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => viewProductDetails(product._id)}
                    >
                      <span className="line-clamp-1 text-[14px]">{product.productName}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.price}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.category || "N/A"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.stock || "N/A"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.value || "N/A"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px] text-yellow-500">
                        {product.status || "Low Stock"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.subCategory || "N/A"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[8px]">
                        <Link
                          href={`/dashboard/products/${product._id}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                        >
                          <GoPencil />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound
                  span={lowStockTableHeaders.length}
                  message="No Low Stock Products Found"
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={lowStockMetaData.totalDoc}
        page={lowStockMetaData.page}
        onPageChange={(page) => setLowStockQuery({ ...lowStockQuery, page })}
      />
    </div>
  );
};

export default LowStockProductTable;
