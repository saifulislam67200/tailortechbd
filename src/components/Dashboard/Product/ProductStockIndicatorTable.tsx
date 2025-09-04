"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import ProductStockSkeleton from "@/components/ui/Skeleton/ProductStockSkeleton";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { IProduct } from "@/types/product";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { RxMagnifyingGlass } from "react-icons/rx";

interface IStockRow {
  productId: string;
  productName: string;
  color: string;
  size: string;
  stockQty: number;
  stockStatus: string;
  lastUpdated: string;
  image: string;
  slug: string;
}

const tableHead = [
  { label: "Product Name", field: "" },
  { label: "Color", field: "" },
  { label: "Size", field: "" },
  { label: "Stock Qty", field: "" },
  { label: "Stock Status", field: "" },
  { label: "Last Updated", field: "" },
  { label: "Restock", field: "" },
];

const ProductStockIndicatorTable = ({
  handleCheckProductStocks,
}: {
  handleCheckProductStocks: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [stockFilter, setStockFilter] = useState<"All" | "In Stock" | "Low Stock" | "Stock Out">(
    "All"
  );
  const [sort, setSort] = useState({ field: "lastUpdated", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    limit: 1000,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllProductsQuery({ ...query, searchTerm });
  const productData = data?.data || [];

  // generate stock status data
  const generateStockStatus = (products: IProduct[]): IStockRow[] => {
    return products
      .flatMap((product) =>
        (product.colors ?? []).flatMap((colorVariant) =>
          (colorVariant.sizes ?? []).map((sizeVariant) => {
            const stockQty = sizeVariant.stock;
            let stockStatus = "● In Stock";
            if (stockQty === 0) stockStatus = "● Stock Out";
            else if (stockQty <= 5) stockStatus = "● Low Stock";

            return {
              productId: product._id,
              slug: product.slug,
              productName: product.name,
              color: colorVariant.color,
              size: sizeVariant.size,
              stockQty,
              image: product.images[0] || "/images/category_blank.png",
              stockStatus,
              lastUpdated: new Date(product.updatedAt ?? Date.now()).toISOString().split("T")[0],
            };
          })
        )
      )
      .filter((item) => {
        if (stockFilter === "All") return true;
        // filter by status text but removing the bullet for matching
        return item.stockStatus.includes(stockFilter);
      });
  };

  const stockData: IStockRow[] = useMemo(
    () => generateStockStatus(productData),
    [productData, stockFilter]
  );

  // client side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // update current page to 1 if filter or searchTerm changes
  // also update currentPage when stockFilter or searchTerm or productData changes
  // reset current page when filter or search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [stockFilter, searchTerm]);

  // slice stockData to show only current page items
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return stockData.slice(start, start + itemsPerPage);
  }, [currentPage, stockData]);

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  if (isLoading) {
    return <ProductStockSkeleton />;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Product Stock Status</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying stock status for all product variants. Total{" "}
            <span className="font-bold text-dashboard">{stockData.length}</span> variants.
          </p>
          <span className="text-[12px]">
            <strong>Note:</strong>
            <span className="ml-1">
              <span className="font-medium text-yellow-600">Low Stock</span> (5 or fewer units),{" "}
              <span className="font-medium text-danger">Out of Stock</span> (0 units),{" "}
              <span className="font-medium text-success">In Stock</span> (more than 5 units)
            </span>
          </span>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex flex-col justify-between gap-[24px] md:flex-row md:items-center">
          <div className="flex w-full items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none md:max-w-[300px]">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Product"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <div className="flex items-center gap-[20px] lg:gap-[100px] xl:gap-[200px]">
            <div className="flex items-center gap-2">
              <label className="text-sm">Filter:</label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
                className="h-[33px] border border-quaternary px-2 text-sm focus:outline-none"
              >
                <option value="All">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Stock Out">Stock Out</option>
              </select>
            </div>

            <button
              onClick={handleCheckProductStocks}
              className="flex w-[120px] cursor-pointer items-center justify-center gap-[10px] bg-primary py-[4px] text-white transition-colors duration-100 hover:bg-primary/80"
            >
              <BsArrowLeft /> Back
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="md:px-6 px-4 py-3 text-left text-sm font-semibold text-dashboard uppercase"
                  >
                    {heading.field ? (
                      <button
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => handleSort(heading.field)}
                      >
                        <span>{heading.label}</span>
                        <span className="flex flex-col text-[10px] leading-[10px]">
                          <FaChevronUp
                            className={`${
                              sort.field === heading.field && sort.order === "asc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === heading.field && sort.order === "desc"
                                ? "font-bold text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      heading.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="w-full divide-y divide-dashboard/20">
              {paginatedData.length ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="line-clamp-1 max-w-[200px] px-4 md:px-6 py-4 text-sm text-ellipsis whitespace-nowrap">
                      {item.productName}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm whitespace-nowrap">{item.color}</td>
                    <td className="px-4 md:px-6 py-4 text-sm whitespace-nowrap">{item.size}</td>
                    <td className="px-4 md:px-6 py-4 text-sm whitespace-nowrap">
                      {item.stockQty}
                    </td>
                    <td
                      className={`px-4 md:px-6 py-4 text-sm whitespace-nowrap ${
                        item.stockStatus.includes("Stock Out")
                          ? "text-danger"
                          : item.stockStatus.includes("Low")
                            ? "text-yellow-600"
                            : "text-success"
                      }`}
                    >
                      {item.stockStatus}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm whitespace-nowrap">
                      {item.lastUpdated}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm whitespace-nowrap">
                      <Link
                        href={`/dashboard/products/${item.slug}`}
                        className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-quaternary/20 hover:bg-primary hover:text-white"
                      >
                        <FiExternalLink />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Stock Data Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalDocs={stockData.length}
        onPageChange={(page) => setCurrentPage(page)}
        limit={itemsPerPage}
      />
    </div>
  );
};

export default ProductStockIndicatorTable;
