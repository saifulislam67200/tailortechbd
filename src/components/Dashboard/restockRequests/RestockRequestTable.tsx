"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllRestockRequestQuery } from "@/redux/features/restockRequest/restockRequest.api";
import { IProduct } from "@/types/product";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import DeleteRestockRequestModal from "../Product/DeleteRestockRequestModal";

const tableHead = [
  { label: "Product", field: "" },
  { label: "Color", field: "" },
  { label: "Size", field: "" },
  { label: "Name", field: "" },
  { label: "Email", field: "" },
  { label: "Phone", field: "" },
  { label: "Details", field: "" },
  { label: "Actions", field: "" },
];

interface IRequest {
  product: IProduct;
  _id: string;
  color: string;
  size: string;
  name: string;
  email: string;
  phone: string;
  details: string;
}

const RestockRequestTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllRestockRequestQuery({ ...query, searchTerm });
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
        <div className="flex items-center justify-between">
          <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Product"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
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
                productData?.map((request: IRequest) => (
                  <tr key={request?._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="line-clamp-1 text-[14px]">{request?.product?.name}</span>
                      <span className="line-clamp-1 text-[14px]">
                        Product Id: {request?.product?.sku}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.color || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.size || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.name || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.email || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.phone || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.details || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <DeleteRestockRequestModal
                        restockRequestId={request?._id}
                        restockRequestName={request?.product?.name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Restock Request Found" />
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

export default RestockRequestTable;
