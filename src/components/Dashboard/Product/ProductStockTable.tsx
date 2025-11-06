"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import SelectionBox from "@/components/ui/SelectionBox";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductStockQuery } from "@/redux/features/product/product.api";
import { IProductStock } from "@/types/product";
import { useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import CategorySelector from "./CategorySelector";
import DownloadStockReport from "./DownloadStockReport";
import "./index.css";

const stockTableHeaders = [
  { label: "SL", field: "", rowSpan: 2 },
  { label: "Product Code", field: "", rowSpan: 2 },
  { label: "Category", field: "", rowSpan: 2 },
  { label: "Sub Category", field: "", rowSpan: 2 },
  { label: "Product Name  ", field: "", rowSpan: 2 },
  { label: "Size", field: "", rowSpan: 2 },
  { label: "Color", field: "", rowSpan: 2 },
  { label: "Opening Stock", field: "", rowSpan: 2 },
  { label: "Sales Qty", field: "", rowSpan: 2 },
  { label: "Damaged Qty", field: "", rowSpan: 2 },
  { label: "Current Stock", field: "", rowSpan: 2 },
  { label: "Unit Price", field: "", rowSpan: 2 },
  { label: "Offer Price", field: "", rowSpan: 2 },
  { label: "Total Price", field: "", rowSpan: 2 },
  { label: "Stock Status", field: "", rowSpan: 2 },
];

const ProductStockTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const tableRef = useRef<HTMLDivElement>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);
  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,category,subCategory,size,color,price,createdAt,stock,status",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    timeframe: "all",
    status: "",
    size: "",
    color: "",
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
    startDate: dateRange.startDate ? dateRange.startDate.toISOString() : undefined,
    endDate: dateRange.endDate ? dateRange.endDate.toISOString() : undefined,
  });

  const products: IProductStock[] = stockData?.data || [];
  const stockMetaData = stockData?.meta || { totalDoc: 0, page: 1, limit: 10 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setStockQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const unique = (arr: Array<string | undefined | null>) =>
    Array.from(new Set(arr.filter(Boolean))) as string[];

  const sizeOptions = useMemo(() => {
    const allSizes = unique(products.map((p) => p.size));
    return [{ label: "ALL", value: "" }, ...allSizes.map((s) => ({ label: s, value: s }))];
  }, [products]);

  const colorOptions = useMemo(() => {
    const allColors = unique(products.map((p) => p.color));
    return [{ label: "ALL", value: "" }, ...allColors.map((c) => ({ label: c, value: c }))];
  }, [products]);

  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      const okSize = !selectedSize || p.size === selectedSize;
      const okColor =
        !selectedColor || (p.color || "").toLowerCase() === selectedColor.toLowerCase();
      return okSize && okColor;
    });
  }, [products, selectedSize, selectedColor]);

  const totalDocs =
    selectedSize || selectedColor ? displayedProducts.length : stockMetaData.totalDoc;
  const totalPages = Math.max(1, Math.ceil(totalDocs / (stockMetaData.limit || 10)));

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">All Product Stock</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying all product stock in your store. Total{" "}
            <span className="font-bold text-dashboard">{totalDocs}</span> products. Divided into{" "}
            <span className="font-bold text-dashboard">{totalPages} pages</span> & currently showing
            page <span className="font-bold text-dashboard">{stockMetaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex flex-wrap items-center justify-start gap-[10px]">
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
            value={stockQuery.status as string}
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
        <div className="mb-3 flex flex-wrap items-end justify-start gap-4 lg:flex-nowrap">
          {/* select category */}
          <div className="min-w-[250px]">
            <CategorySelector
              key={`category-${resetKey}`}
              heading={<span className="text-[14px] font-semibold">Select Category</span>}
              className="flex-row items-start gap-[20px]"
              subCategoryClassName="flex-row items-start min-w-[250px] gap-[20px]"
              onSelect={(category) => {
                setStockQuery({ ...stockQuery, categoryId: category.value || "" });
              }}
            />
          </div>

          {/* select color */}
          <div className="flex w-[250px] flex-col gap-[10px]">
            <span className="text-[14px] font-semibold">Select Color</span>
            <div className="max-w-[290px]">
              <SelectionBox
                key={`color-${resetKey}`}
                data={colorOptions}
                dropdownClassName="z-[99999999]"
                onSelect={(opt) => {
                  const val = (opt?.value as string) || "";
                  setSelectedColor(val);
                  // keep API query in sync (server-side filtering)
                  setStockQuery({ ...stockQuery, color: val, page: 1 });
                }}
                className="max-w-[290px]"
              />
            </div>
          </div>

          {/* select size */}
          <div className="flex w-[250px] flex-col gap-[10px]">
            <span className="text-[14px] font-semibold">Select Size</span>
            <div className="max-w-[290px]">
              <SelectionBox
                key={`size-${resetKey}`}
                data={sizeOptions}
                dropdownClassName="z-[99999999]"
                onSelect={(opt) => {
                  const val = (opt?.value as string) || "";
                  setSelectedSize(val);
                  // keep API query in sync (server-side filtering)
                  setStockQuery({ ...stockQuery, size: val, page: 1 });
                }}
                className="max-w-[290px]"
              />
            </div>
          </div>

          <button
            className="cursor-pointer rounded-sm border border-dashboard/20 px-4 py-1 text-sm"
            onClick={() => {
              setSelectedSize("");
              setSelectedColor("");
              setResetKey((k) => k + 1);
              setStockQuery({ ...stockQuery, size: "", color: "", page: 1, categoryId: "" });
            }}
          >
            Clear Filters
          </button>
        </div>
        <div className="flex w-full items-center justify-end gap-0">
          <DownloadStockReport />
        </div>
        {/* table */}
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full border border-border-main">
            <thead>
              <tr className="bg-dashboard/10">
                {stockTableHeaders.map((header) => (
                  <th
                    rowSpan={header.rowSpan}
                    key={header.field || header.label}
                    className={twMerge(
                      "border border-border-main px-6 py-3 text-left text-sm font-semibold text-dashboard"
                    )}
                  >
                    {header.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(header.field)}
                      >
                        <span>{header.label}</span>
                      </button>
                    ) : (
                      header.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isStockLoading ? (
                <TableSkeleton columns={stockTableHeaders.length} />
              ) : displayedProducts.length ? (
                displayedProducts.map((product: IProductStock, index: number) => (
                  <tr key={product?._id + index} className="">
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{index + 1}</span>
                    </td>

                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product?.sku || "N/A"}</span>
                    </td>

                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">
                        {typeof product?.category === "object" &&
                        product?.category !== null &&
                        "label" in product.category
                          ? (product.category as { label?: string }).label || "N/A"
                          : typeof product?.category === "string"
                            ? product.category
                            : "N/A"}
                      </span>
                    </td>

                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product?.subCategory || "N/A"}</span>
                    </td>

                    {/* product name */}
                    <td className="border border-border-main px-6 py-3">
                      <span title={product.productName} className="line-clamp-1 text-[14px]">
                        {product.productName}{" "}
                      </span>
                    </td>

                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.size || "N/A"}</span>
                    </td>

                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.color || "N/A"}</span>
                    </td>

                    {/* opening stock */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.openingStock ?? product.stock ?? "0"}</span>
                    </td>

                    {/* sales qty */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.salesQty ?? "0"}</span>
                    </td>
                    {/* damaged qty */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.damagedQty ?? "0"}</span>
                    </td>
                    {/* current stock */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">{product.currentStock ?? product.stock ?? "0"}</span>
                    </td>
                    {/* unit price */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">৳ {product.price}</span>
                    </td>
                    {/* discount price */}
                    <td className="border border-border-main px-6 py-3">
                      <span className="text-[14px]">
                        {product.offerPrice ? `৳ ${Math.round(product.offerPrice)}` : "N/A"}
                      </span>
                    </td>
                    {/* total price */}
                    <td className="border border-border-main px-3 py-3">
                      <span className="text-[14px]">
                        ৳ {Math.round(product.totalPrice ?? (product.price || 0) * (product.stock || 0))}
                      </span>
                    </td>
                    <td className="border border-border-main px-6 py-3">
                      <span
                        className={`text-[14px] capitalize ${
                          product.status === "in-stock"
                            ? "text-green-500"
                            : product.status === "low-stock"
                              ? "text-yellow-500"
                              : product.status === "out-of-stock"
                                ? "text-red-500"
                                : ""
                        }`}
                      >
                        {product.status ? product.status?.replace(/-/g, " ") : "N/A"}
                      </span>
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
        showText={false}
        limit={stockMetaData.limit || 10}
        totalDocs={totalDocs}
        page={stockMetaData.page}
        onPageChange={(page) => setStockQuery({ ...stockQuery, page })}
      />
    </div>
  );
};

export default ProductStockTable;
