"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import dateUtils from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

const tableHead = [
  { label: "Name", field: "name" },
  { label: "Price", field: "price" },
  { label: "Discount (%)", field: "discount" },
  { label: "Category", field: "" },
  { label: "Date Created", field: "createdAt" },
  { label: "Actions", field: "" },
];

const AllProductsTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data } = useGetAllProductsQuery({ ...query, searchTerm });
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

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Product List</h1>
          <p className="text-[14px] text-muted">
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
        <div className="flex w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search Product"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <RxMagnifyingGlass />
        </div>
        <table className="min-w-full divide-y divide-dashboard/20">
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
            {productData?.map((product) => (
              <tr key={product?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  <span className="text-[14px]">Tk. {product.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[14px]">{product.discount || "N/A"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[14px]">
                    {typeof product.category === "string"
                      ? product.category
                      : product.category?.label || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[14px]">
                    {dateUtils.formateCreateOrUpdateDate(product.createdAt) || "N/A"}
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
                    <button className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-danger bg-danger/5 text-danger">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default AllProductsTable;
