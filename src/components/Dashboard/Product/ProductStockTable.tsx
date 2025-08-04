"use client";
import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductStockQuery } from "@/redux/features/product/product.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoCalendarNumberOutline, IoPrintSharp } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useReactToPrint } from "react-to-print";
import CategorySelector from "./CategorySelector";
import "./index.css";
const stockTableHeaders = [
  { label: "SL", field: "" },
  { label: "Product Name", field: "" },
  { label: "Category", field: "" },
  { label: "Sub Category", field: "" },
  { label: "SKU", field: "" },
  { label: "Stock", field: "" },
  { label: "Unit Price", field: "" },
  { label: "Total Value", field: "" },
  { label: "Status", field: "" },
  { label: "Actions", field: "" },
];

// "in-stock", "low-stock", "out-of-stock"

const ProductStockTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");

  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const router = useRouter();

  const tableRef = useRef<HTMLDivElement>(null);

  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,category,createdAt,stock,status",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    timeframe: "all",
    status: "",
  });

  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const { data: stockData, isLoading: isStockLoading } = useGetProductStockQuery({
    ...stockQuery,
    search: searchTerm,
    limit: 10,
    // category: "men",
    ...dateRange,
  });
  const inStockProducts = stockData?.data || [];
  const stockMetaData = stockData?.meta || { totalDoc: 0, page: 1 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setStockQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
  });
  const viewProductDetails = (slug: string) => {
    router.push(`/dashboard/product-details/${slug}`);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">In-Stock Products</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all in-stock products in your store. Total{" "}
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
        <div className="flex items-center justify-start gap-[10px]">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search in-stock products"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
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
          </div>

          <select
            value={stockQuery.status}
            onChange={(e) => setStockQuery({ ...stockQuery, status: e.target.value })}
            className="h-[33px] border border-quaternary px-2 text-sm focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>{" "}
        <HorizontalLine className="mt-[10px]" />
        <div className="flex w-full flex-col gap-[10px]">
          <span>Select Category</span>
          <div className="max-w-[290px]">
            <CategorySelector
              onSelect={(category) => {
                setStockQuery({ ...stockQuery, categoryId: category.value || "" });
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-0">
          <Button onClick={handlePrint}>
            <IoPrintSharp />
            print
          </Button>
        </div>
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {stockTableHeaders.map((header) => (
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
              {isStockLoading ? (
                <TableSkeleton columns={stockTableHeaders.length} />
              ) : inStockProducts.length ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                inStockProducts.map((product, index) => (
                  <tr key={product?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{index + 1}</span>
                    </td>
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => viewProductDetails(product.slug)}
                    >
                      <span className="line-clamp-1 text-[14px]">{product.productName}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.category || "N/A"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.subCategory || "N/A"}</span>
                    </td>
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => viewProductDetails(product.slug)}
                    >
                      <span className="text-[14px]">{product?.productCode || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{product.stock || "0"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.price}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.value || "0"}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-[14px] ${
                          product.status === "In Stock"
                            ? "text-green-500"
                            : product.status === "Low Stock"
                              ? "text-yellow-500"
                              : product.status === "Out of Stock"
                                ? "text-red-500"
                                : ""
                        }`}
                      >
                        {product.status || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[8px]">
                        <Link
                          href={`/dashboard/products/${product.slug}`}
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
                  span={stockTableHeaders.length}
                  message="No In-Stock Products Found"
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={stockMetaData.totalDoc}
        page={stockMetaData.page}
        onPageChange={(page) => setStockQuery({ ...stockQuery, page })}
      />
    </div>
  );
};

export default ProductStockTable;
