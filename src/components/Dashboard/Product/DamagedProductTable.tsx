"use client";
import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductStockQuery } from "@/redux/features/product/product.api";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import "./index.css";

const stockTableHeaders = [
  { label: "SL", field: "" },
  { label: "Product Code", field: "" },
  { label: "Category", field: "" },
  { label: "Sub Category", field: "" },
  { label: "Product Name", field: "" },
  { label: "Size", field: "" },
  { label: "Color", field: "" },
  { label: "Price", field: "" },
  { label: "Product Status", field: "" },
  { label: "Damaged Qty", field: "" },
  { label: "Cause of Damaged", field: "" },
];

const DamagedProductTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");

  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const router = useRouter();

  const tableRef = useRef<HTMLDivElement>(null);

  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,category,size,createdAt,stock,status",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    timeframe: "all",
    status: "",
  });

  const { data: stockData, isLoading: isStockLoading } = useGetProductStockQuery({
    ...stockQuery,
    search: searchTerm,
    limit: 10,
  });
  const productStocks = stockData?.data || [];
  console.log(productStocks);
  const stockMetaData = stockData?.meta || { totalDoc: 0, page: 1 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setStockQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const viewProductDetails = (slug: string) => {
    router.push(`/dashboard/product-details/${slug}`);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Damaged Products</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all damaged products in your store. Total{" "}
            <span className="font-bold text-dashboard">{stockMetaData.totalDoc}</span> products.
            Divided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(stockMetaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{stockMetaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="mb-3 flex">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search damaged products"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <div className="flex w-full items-center justify-end gap-0">
            <Button>Show Report</Button>
          </div>
        </div>

        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {stockTableHeaders.map((header) => (
                  <th
                    key={header.field || header.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard"
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
              {isStockLoading ? (
                <TableSkeleton columns={stockTableHeaders.length} />
              ) : productStocks.length ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                productStocks.map((product, index) => (
                  <tr key={product?._id + index} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{index + 1}</span>
                    </td>

                    {/* product code */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product?.productCode || "N/A"}</span>
                    </td>

                    {/* category */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product?.category || "N/A"}</span>
                    </td>

                    {/* sub category */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product?.subCategory || "N/A"}</span>
                    </td>

                    {/* product name */}
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => viewProductDetails(product.slug)}
                    >
                      <span className="flex flex-col gap-[5px]">
                        <span className="line-clamp-1 text-[14px] font-[700]">
                          {product.productName}
                        </span>
                      </span>
                    </td>

                    {/* size */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.size || "N/A"}</span>
                    </td>

                    {/* color */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.color || "N/A"}</span>
                    </td>

                    {/* price */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.price}</span>
                    </td>

                    {/* status */}
                    <td className="px-6 py-4">
                      <span className="text-red-400">Damaged</span>
                    </td>

                    {/* damaged qty */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.damagedQty || "N/A"}</span>
                    </td>

                    {/* cause of damaged */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">N/A</span>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound
                  span={stockTableHeaders.length}
                  message="No In-Stock Products Found"
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        limit={stockMetaData.limit || 10}
        totalDocs={stockMetaData.totalDoc}
        page={stockMetaData.page}
        onPageChange={(page) => setStockQuery({ ...stockQuery, page })}
      />
    </div>
  );
};

export default DamagedProductTable;
