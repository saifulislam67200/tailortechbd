"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetDamagedProductQuery } from "@/redux/features/product/product.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import CategorySelector from "./CategorySelector";
import "./index.css";
import DownloadDamagedProductReport from "./DownloadDamagedProductReport";

const stockTableHeaders = [
  { label: "SL", field: "", shouldPrint: true },
  { label: "Product Code", field: "", shouldPrint: true },
  { label: "Category", field: "", shouldPrint: true },
  { label: "Sub Category", field: "", shouldPrint: false },
  { label: "Product Name", field: "", shouldPrint: true },
  { label: "Size", field: "", shouldPrint: true },
  { label: "Color", field: "", shouldPrint: true },
  { label: "Price", field: "", shouldPrint: true },
  { label: "Product Status", field: "", shouldPrint: false },
  { label: "Damaged Qty", field: "", shouldPrint: true },
  { label: "Cause of Damaged", field: "", shouldPrint: true },
];

const DamagedProductTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const router = useRouter();

  const tableRef = useRef<HTMLDivElement>(null);

  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    page: 1,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });
  const { data, isLoading: isStockLoading } = useGetDamagedProductQuery({
    ...stockQuery,
    searchTerm: searchTerm,
    limit: 10,
  });
  const productStocks = data?.data || [];
  const stockMetaData = data?.meta || { totalDoc: 0, page: 1 };

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
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-[16px] font-[600]">All Damaged Products</h1>
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

          <Link
            href="/dashboard/damaged-product/create"
            className="rounded-[4px] bg-primary px-[18px] py-1 text-white"
          >
            Create Damage
          </Link>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3 lg:flex-nowrap">
          <div className="flex flex-col items-end gap-3 xl:flex-row">
            <div className="flex w-full shrink-0 items-center rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none sm:justify-between xl:max-w-[300px]">
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                placeholder="Search damaged products"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <RxMagnifyingGlass />
            </div>
            <div className="w-full min-w-[250px]">
              <CategorySelector
                heading={<span className="text-[14px] font-semibold">Select Category</span>}
                className="w-full flex-col items-start gap-[20px] lg:flex-row"
                subCategoryClassName="flex-row items-start min-w-[250px] gap-[20px]"
                onSelect={(category) => {
                  setStockQuery({ ...stockQuery, category: category.value || "" });
                }}
              />
            </div>
          </div>

          <DownloadDamagedProductReport />
        </div>

        <div ref={tableRef}>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-dashboard/20">
              <thead className="bg-dashboard/10">
                <tr>
                  {stockTableHeaders.map((header) => (
                    <th
                      key={header.field || header.label}
                      className="px-3 py-3 text-left text-sm font-semibold text-dashboard"
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
                    <tr key={product?._id + index} className="text-left hover:bg-gray-50">
                      {/* index */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">{index + 1}</span>
                      </td>

                      {/* product code */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">{product?.productCode || "N/A"}</span>
                      </td>

                      {/* category */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">
                          {typeof product?.category === "string"
                            ? product?.category
                            : product?.category?.label || "N/A"}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <span className="text-[14px]">{product?.subCategory?.label || "N/A"}</span>
                      </td>

                      {/* product name */}
                      <td
                        className="cursor-pointer px-3 py-4"
                        onClick={() => viewProductDetails(product.slug)}
                      >
                        <span className="flex flex-col gap-[5px]">
                          <span className="line-clamp-1 text-[14px] font-[700]">
                            {product.productName}
                          </span>
                        </span>
                      </td>

                      {/* size */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">{product.size || "N/A"}</span>
                      </td>

                      {/* color */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">{product.color || "N/A"}</span>
                      </td>

                      {/* price */}
                      <td className="px-3 py-4">
                        <span className="text-[13px]">৳ {product.price}</span>
                      </td>

                      {/* status */}
                      <td className="px-3 py-4">
                        <span className="text-red-400">Damaged</span>
                      </td>

                      {/* damaged qty */}
                      <td className="px-3 py-4">
                        <span className="text-[14px]">{product.quantity || "N/A"}</span>
                      </td>

                      {/* cause of damaged */}
                      <td className="px-6 py-4" title={product.causeOfDamage || "N/A"}>
                        <span className="line-clamp-1 max-w-[200px] text-[14px]">
                          {product.causeOfDamage || "N/A"}
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
      </div>
      <Pagination
        totalDocs={stockMetaData.totalDoc}
        page={stockMetaData.page}
        onPageChange={(page) => setStockQuery({ ...stockQuery, page })}
      />
    </div>
  );
};

export default DamagedProductTable;
