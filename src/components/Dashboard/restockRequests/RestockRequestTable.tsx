"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllRestockRequestQuery } from "@/redux/features/restockRequest/restockRequest.api";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import ChangeStockRequestStatus from "./ChangeStockRequestStatus";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Product Code", field: "" },
  { label: "Category", field: "" },
  { label: "Sub-Category", field: "" },
  { label: "Product Name", field: "" },
  { label: "Size", field: "" },
  { label: "Color", field: "" },
  { label: "Requested Qty", field: "" },
  { label: "Customer Details", field: "" },
  { label: "Message", field: "" },
  { label: "Status", field: "" },
  { label: "Actions", field: "" },
];

const RestockRequestTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [changeStockRequest, setChangeStockRequest] = useState<{
    _id: string;
    status: "approved" | "rejected";
  } | null>(null);

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllRestockRequestQuery({ ...query, searchTerm });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productData: Record<string, any>[] = data?.data || [];
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
          <h1 className="text-[16px] font-[600]">All Restock Requests</h1>
          <p className="text-[12px] text-muted md:text-[14px]">
            Displaying All Restock Requests in your store. There is total{" "}
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
                    className="px-6 py-3 text-left text-sm font-semibold text-dashboard"
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
                productData?.map((request, index) => {
                  const parentCategory = request?.product?.category?.parent?.label;

                  return (
                    <tr key={request?._id} className="hover:bg-gray-50">
                      {/* index */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{index + 1}</span>
                      </td>

                      {/* product code */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{request?.product?.sku}</span>
                      </td>

                      {/* category */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">
                          {parentCategory
                            ? parentCategory
                            : request?.product?.category?.label || "N/A"}
                        </span>
                      </td>

                      {/* sub category */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">
                          {parentCategory ? request.product?.category?.label : "N/A"}
                        </span>
                      </td>

                      {/* product name */}
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/product-details/${request?.product?.slug}`}
                          className="line-clamp-1 cursor-pointer text-[14px] hover:underline"
                        >
                          {request?.product?.name}
                        </Link>
                      </td>

                      {/* size */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{request?.size || "N/A"}</span>
                      </td>

                      {/* color */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{request?.color || "N/A"}</span>
                      </td>

                      {/* requested qty */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{request?.requestedQty || "0"}</span>
                      </td>

                      {/* requester details */}
                      <td className="px-6 py-4">
                        <div className="text-[14px]">{request?.name || "N/A"}</div>
                        <div className="text-[14px]">{request?.email || "N/A"}</div>
                        <div className="text-[14px]">{request?.phone || "N/A"}</div>
                        <div className="text-[14px]">{request?.address || "N/A"}</div>
                      </td>

                      {/* message */}
                      <td className="px-6 py-4">
                        <span className="text-[14px]">{request?.details || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-[4px] px-2 py-[3px] text-[14px] capitalize ${request?.status === "approved" ? "bg-success/10 text-success" : request.status == "rejected" ? "bg-red-500/10 text-red-500" : ""}`}
                        >
                          {request?.status || "pending"}
                        </span>
                      </td>

                      {/* actions */}
                      <td className="px-6 py-4">
                        {request.status === "pending" ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                setChangeStockRequest({ _id: request?._id, status: "approved" })
                              }
                              className="cursor-pointer rounded-[4px] bg-success px-2 py-[3px] text-[14px] text-white hover:bg-success/80"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                setChangeStockRequest({ _id: request?._id, status: "rejected" })
                              }
                              className="hover cursor-pointer rounded-[4px] bg-red-500 px-2 py-[3px] text-[14px] text-white hover:bg-red-500/80"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Restock Request Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {changeStockRequest ? (
        <ChangeStockRequestStatus
          requestId={changeStockRequest?._id}
          isOpen={Boolean(changeStockRequest)}
          setIsOpen={() => setChangeStockRequest(null)}
          newStatus={changeStockRequest?.status}
        />
      ) : (
        ""
      )}
      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
};

export default RestockRequestTable;
