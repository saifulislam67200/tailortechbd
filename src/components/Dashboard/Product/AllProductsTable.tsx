"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import dateUtils from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";
import DeleteProductById from "./DeleteProductById";
import { useRouter } from "next/navigation";
import BarcodeGeneratorProductSelect from "./BarcodeGeneratorProductSelect";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Product Id", field: "sku" },
  { label: "Category", field: "" },
  { label: "Sub Category", field: "" },
  { label: "Name", field: "name" },
  { label: "Size", field: "" },
  { label: "Color", field: "" },
  { label: "Price", field: "price" },
  { label: "Discount (%)", field: "discount" },
  { label: "Date Created", field: "createdAt" },
  { label: "Actions", field: "" },
];

const AllProductsTable = ({
  handleCheckProductStocks,
}: {
  handleCheckProductStocks: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const router = useRouter();

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllProductsQuery({ ...query, searchTerm });
  const productData = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const productDetails = (slug: string) => {
    router.push(`/dashboard/product-details/${slug}`);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Product List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All the available products in your store. There is total{" "}
            <span className="font-bold text-dashboard">{metaData.totalDoc}</span> products. Data is
            Devided into{" "}
            <span className="font-bold text-dashboard">
              {Math.ceil(metaData.totalDoc / 10)} pages
            </span>{" "}
            & currently showing page{" "}
            <span className="font-bold text-dashboard">{metaData.page}.</span>
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Product"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>

          <button
            onClick={handleCheckProductStocks}
            className="text- flex w-[120px] cursor-pointer items-center justify-center bg-primary/80 py-[4px] text-white transition-colors duration-100 hover:bg-primary"
          >
            Check Stocks
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard uppercase"
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

            <tbody className="divide-y divide-dashboard/20">
              {isLoading ? (
                <TableSkeleton columns={tableHead.length} />
              ) : data?.data.length ? (
                productData?.map((product, index) => (
                  <tr key={product?._id} className="hover:bg-gray-50">
                    {/* index */}
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => productDetails(product?.slug)}
                    >
                      <span className="text-[14px]"> {index + 1}</span>
                    </td>

                    {/* id */}
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => productDetails(product?.slug)}
                    >
                      <span className="text-[14px]"> {product?.sku ? product?.sku : "N/A"}</span>
                    </td>

                    {/* category */}
                    <td className="cursor-pointer px-6 py-4">
                      {product?.category ? (
                        <span className="text-[14px]">
                          {typeof product.category === "string"
                            ? product.category
                            : product.category.label}
                        </span>
                      ) : (
                        <span className="text-[14px]">N/A</span>
                      )}
                    </td>

                    {/* sub category */}
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground text-[14px]">—</span>
                    </td>

                    {/* name */}
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => productDetails(product?.slug)}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span className="flex aspect-square max-h-[50px] w-[50px] items-center justify-start bg-white">
                          <Image
                            src={product.images[0]}
                            alt={`${product.name} image`}
                            width={80}
                            height={80}
                            className="mx-auto h-full w-auto max-w-full object-contain"
                          />
                        </span>
                        <span className="line-clamp-1 text-[14px]">{product.name}</span>
                      </div>
                    </td>

                    {/* size */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 text-[14px]">
                        {product?.colors?.length
                          ? product.colors.flatMap((color) =>
                              color.sizes.map((s) => <span key={s._id}>{s.size}</span>)
                            )
                          : "N/A"}
                      </div>
                    </td>

                    {/* color */}
                    <td className="px-6 py-4">
                      <div className="text-[14px]">
                        {product.colors && product.colors.length > 0
                          ? product.colors.map((colorObj, idx) => (
                              <div key={idx} className="font-medium">
                                {colorObj.color}
                              </div>
                            ))
                          : "N/A"}
                      </div>
                    </td>

                    {/* price */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">৳ {product.price}</span>
                    </td>

                    {/* discount */}
                    <td className="px-8 py-4">
                      <span className="text-[14px]">{product.discount || "N/A"}</span>
                    </td>

                    {/* created at */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">
                        {dateUtils.formateCreateOrUpdateDate(product.createdAt) || "N/A"}
                      </span>
                    </td>

                    {/* actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-[8px]">
                        <BarcodeGeneratorProductSelect product={product} />
                        <Link
                          href={`/dashboard/products/${product.slug}`}
                          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
                        >
                          <GoPencil />
                        </Link>
                        <DeleteProductById productId={product._id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Product Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default AllProductsTable;
