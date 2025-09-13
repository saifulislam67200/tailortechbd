"use client";
import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import SelectionBox from "@/components/ui/SelectionBox";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductStockQuery } from "@/redux/features/product/product.api";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoCalendarNumberOutline, IoPrintSharp } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useReactToPrint } from "react-to-print";
import { twMerge } from "tailwind-merge";
import CategorySelector from "./CategorySelector";
import "./index.css";

interface IProductStock {
  _id: string;
  productName: string;
  slug: string;
  color: string;
  size: string;
  stock: number;
  status: string;
  sku: string;
  price: number;
  value: number;
  category: string;
  subCategory: string;
  parentCategory: string | null;
}
type TGroupedProduct = Omit<IProductStock, "size" | "stock"> & {
  sizeStock: { size: string; stock: number }[];
};

const sizeKeys = ["S", "M", "L", "XL", "2XL"] as const;
const stockTableHeaders = [
  { label: "SL", field: "", rowSpan: 2, shouldPint: true },
  { label: "Category", field: "", rowSpan: 2, shouldPint: true },
  { label: "Sub Category", field: "", rowSpan: 2 },
  { label: "Color", field: "", rowSpan: 2, shouldPint: true },
  { label: "Style Code", field: "", rowSpan: 2, shouldPint: true },
  {
    label: "Product",
    field: "",
    colSpan: sizeKeys.length,
    className: "text-center",
    shouldPint: true,
  },

  { label: "Current Stock", field: "", rowSpan: 2, shouldPint: true },
  { label: "Unit Price", field: "", rowSpan: 2, shouldPint: true },
  { label: "Total Price", field: "", rowSpan: 2 },
  { label: "Stock Status", field: "", rowSpan: 2 },
];

// "in-stock", "low-stock", "out-of-stock"

const ProductStockTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const tableRef = useRef<HTMLDivElement>(null);
  const [isPrintMode, setIsPrintMode] = useState(false);

  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,category,size,createdAt,stock,status",
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
  const productStocks = stockData?.data || [];
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

  const groupProductsByName = () => {
    const products = productStocks as IProductStock[];
    const groupedMap = new Map<string, TGroupedProduct>();

    for (const product of products) {
      const key = `${product.productName}-${product.color}`; // unique per name+color

      if (stockQuery.color) {
        if (product.color.toLowerCase() !== (stockQuery.color as string).toLowerCase()) {
          continue;
        }
      }

      if (stockQuery.size) {
        if (product.size.toLowerCase() !== (stockQuery.size as string).toLowerCase()) {
          continue;
        }
      }

      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          ...product,
          sizeStock: [{ size: product.size, stock: product.stock }],
        });
      } else {
        const existing = groupedMap.get(key)!;
        existing.sizeStock.push({ size: product.size, stock: product.stock });
      }
    }

    const data = Array.from(groupedMap.values());

    return data;
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
        <div className="mb-3 flex flex-wrap justify-start gap-4 lg:flex-nowrap">
          {/* select category */}
          <div className="min-w-[250px]">
            <CategorySelector
              heading={<span className="text-[14px] font-semibold">Select Category</span>}
              className="flex-row items-start gap-[20px]"
              subCategoryClassName="flex-row items-start min-w-[250px] gap-[20px]"
              onSelect={(category) => {
                setStockQuery({ ...stockQuery, categoryId: category.value || "" });
              }}
            />
          </div>

          {/* select size */}
          <div className="flex w-[250px] flex-col gap-[10px]">
            <span className="text-[14px] font-semibold">Select Size</span>
            <div className="max-w-[290px]">
              <SelectionBox
                data={[
                  { label: "ALL", value: "" },
                  ...sizeKeys.map((size) => ({ label: size, value: size })),
                ]}
                onSelect={(category) => {
                  setStockQuery({ ...stockQuery, size: category.value || "" });
                }}
                className="max-w-[290px]"
              />
            </div>
          </div>

          {/* select color */}
          <div className="flex w-[250px] flex-col gap-[10px]">
            <span className="text-[14px] font-semibold">Select Color</span>
            <div className="max-w-[290px]">
              <SelectionBox
                data={[
                  { label: "ALL", value: "" },
                  { label: "RED", value: "red" },
                  { label: "BLUE", value: "blue" },
                  { label: "GREEN", value: "green" },
                  { label: "YELLOW", value: "yellow" },
                  { label: "BLACK", value: "black" },
                  { label: "WHITE", value: "white" },
                  { label: "GRAY", value: "gray" },
                  { label: "BROWN", value: "brown" },
                  { label: "ORANGE", value: "orange" },
                  { label: "PINK", value: "pink" },
                  { label: "PURPLE", value: "purple" },
                ]}
                onSelect={(category) => {
                  setStockQuery({ ...stockQuery, color: category.value || "" });
                }}
                className="max-w-[290px]"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-0">
          <Button
            onClick={async () => {
              setIsPrintMode(true);
              setTimeout(() => {
                handlePrint();
                setIsPrintMode(false);
              }, 500);
            }}
          >
            <IoPrintSharp />
            print
          </Button>
        </div>
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full border border-border-main">
            <thead>
              <tr>
                {stockTableHeaders.map((header) =>
                  isPrintMode && !header.shouldPint ? (
                    ""
                  ) : (
                    <th
                      colSpan={header.colSpan}
                      rowSpan={header.rowSpan}
                      key={header.field || header.label}
                      className={twMerge(
                        "border border-border-main px-6 py-3 text-left text-sm font-semibold text-dashboard",
                        header.className
                      )}
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
                  )
                )}
              </tr>
              <tr>
                {sizeKeys.map((key) => (
                  <th
                    key={key}
                    className="border border-border-main px-6 py-3 text-left text-sm font-semibold text-dashboard"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isStockLoading ? (
                <TableSkeleton columns={stockTableHeaders.length} />
              ) : groupProductsByName().length ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                groupProductsByName().map((product, index) => {
                  const getSizeStock = (size: string) => {
                    return product.sizeStock.find((s) => s.size === size);
                  };

                  const totalStock = product.sizeStock.reduce(
                    (total, size) => total + size.stock,
                    0
                  );
                  return (
                    <tr key={product?._id + index} className="">
                      <td className="border border-border-main px-6 py-4">
                        <span className="text-[14px]">{index + 1}</span>
                      </td>
                      <td className="border border-border-main px-6 py-4">
                        <span className="text-[14px]">{product?.category || "N/A"}</span>
                      </td>
                      {isPrintMode ? (
                        <></>
                      ) : (
                        <td className="border border-border-main px-6 py-4">
                          <span className="text-[14px]">{product?.subCategory || "N/A"}</span>
                        </td>
                      )}

                      <td className="border border-border-main px-6 py-4">
                        <span className="text-[14px]">{product.color || "N/A"}</span>
                      </td>
                      <td className="border border-border-main px-6 py-4">
                        <span className="line-clamp-1 text-[14px] font-[700]">{product.sku} </span>
                      </td>
                      {sizeKeys.map((s) => (
                        <td className="border border-border-main px-6 py-4" key={s}>
                          {getSizeStock(s)?.stock || 0}
                        </td>
                      ))}

                      <td className="border border-border-main px-6 py-4">
                        <span className="text-[14px]">{totalStock || "0"}</span>
                      </td>
                      <td className="border border-border-main px-6 py-4">
                        <span className="text-[14px]">৳ {product.price}</span>
                      </td>
                      {isPrintMode ? (
                        <></>
                      ) : (
                        <>
                          <td className="border border-border-main px-6 py-4">
                            <span className="text-[14px]">
                              ৳ {Math.round(product.price * totalStock)}
                            </span>
                          </td>
                          <td className="border border-border-main px-6 py-4">
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
                        </>
                      )}
                    </tr>
                  );
                })
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
        totalDocs={stockMetaData.totalDoc}
        page={stockMetaData.page}
        onPageChange={(page) => setStockQuery({ ...stockQuery, page })}
      />
    </div>
  );
};

export default ProductStockTable;
