"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllRestockRequestQuery } from "@/redux/features/restockRequest/restockRequest.api";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";

const tableHead = [
  { label: "SL", field: "" },
  { label: "Product Id", field: "" },
  { label: "Category", field: "" },
  { label: "Sub-Category", field: "" },
  { label: "Product Name", field: "" },
  { label: "Size", field: "" },
  { label: "Color", field: "" },
  { label: "Requested Qty", field: "" },
  { label: "Customer Details", field: "" },
  { label: "Message", field: "" },
  { label: "Action", field: "" },
];

const productData = [
  {
    _id: "1",
    product: {
      _id: "6835808066629c2062710ee6",
      name: "Real Madrid Jersey",
      slug: "real-madrid-official",
      category: "Sports",
      subCategory: "Jerseys",
      createdAt: "2025-05-27T09:06:08.848Z",
      updatedAt: "2025-07-03T12:45:19.113Z",
      sku: "RSPO7183102",
    },
    color: "Science Blue",
    size: "M",
    name: "Sophia Webster",
    email: "lahipuxiz@mailinator.com",
    phone: "+1 (452) 351-9102",
    address: "123 Main St, City, Country",
    requestedQty: 5,
    message: "Inventore id ad off",
    createdAt: "2025-07-27T07:48:30.750Z",
    updatedAt: "2025-07-27T07:48:30.750Z",
  },
  {
    _id: "2",
    product: {
      _id: "6835808066629c2062710ee7",
      name: "Barcelona Home Jersey",
      slug: "barcelona-home-2025",
      category: "Sports",
      subCategory: "Jerseys",
      createdAt: "2025-06-01T10:15:22.210Z",
      updatedAt: "2025-07-12T08:55:41.000Z",
      sku: "BCLNA8719203",
    },
    color: "Crimson Red",
    size: "L",
    name: "James Miller",
    email: "james.miller@example.com",
    phone: "+44 7123 456789",
    address: "45 Elm Street, London, UK",
    requestedQty: 2,
    message: "Looking forward to fast delivery!",
    createdAt: "2025-08-01T12:30:10.500Z",
    updatedAt: "2025-08-01T12:30:10.500Z",
  },
  {
    _id: "3",
    product: {
      _id: "6835808066629c2062710ee8",
      name: "Juventus Away Jersey",
      slug: "juventus-away-2025",
      category: "Sports",
      subCategory: "Jerseys",
      createdAt: "2025-05-18T11:45:00.000Z",
      updatedAt: "2025-07-25T14:20:33.000Z",
      sku: "JUVNT5903844",
    },
    color: "Black & White",
    size: "S",
    name: "Maria Gonzales",
    email: "maria.gonzales@example.com",
    phone: "+34 612 345 678",
    address: "Calle Mayor 10, Madrid, Spain",
    requestedQty: 1,
    message: "Please gift wrap this item.",
    createdAt: "2025-08-10T09:22:47.800Z",
    updatedAt: "2025-08-10T09:22:47.800Z",
  },
  {
    _id: "4",
    product: {
      _id: "6835808066629c2062710ee9",
      name: "Manchester United Jersey",
      slug: "man-united-2025",
      category: "Sports",
      subCategory: "Jerseys",
      createdAt: "2025-05-30T07:30:15.000Z",
      updatedAt: "2025-07-15T16:44:55.000Z",
      sku: "MNUTD2398477",
    },
    color: "Classic Red",
    size: "XL",
    name: "Daniel Wong",
    email: "daniel.wong@example.com",
    phone: "+1 (323) 456-7890",
    address: "789 Sunset Blvd, Los Angeles, USA",
    requestedQty: 3,
    message: "Please confirm stock availability.",
    createdAt: "2025-08-15T18:11:09.220Z",
    updatedAt: "2025-08-15T18:11:09.220Z",
  },
];

const RestockRequestTable = () => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "name,slug,price,images,discount,category,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllRestockRequestQuery({ ...query, searchTerm });
  // const productData = data?.data || [];
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
                productData?.map((request, index) => (
                  <tr key={request?._id} className="hover:bg-gray-50">
                    {/* index */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{index + 1}</span>
                    </td>

                    {/* product id */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.product?.sku}</span>
                    </td>

                    {/* category */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.product?.category || "N/A"}</span>
                    </td>

                    {/* sub category */}
                    <td className="px-6 py-4">
                      <span className="text-[14px]">{request?.product?.subCategory || "N/A"}</span>
                    </td>

                    {/* product name */}
                    <td className="px-6 py-4">
                      <span className="line-clamp-1 text-[14px]">{request?.product?.name}</span>
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
                      <span className="text-[14px]">{request?.requestedQty || "N/A"}</span>
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
                      <span className="text-[14px]">{request?.message || "N/A"}</span>
                    </td>

                    {/* action */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <button className="cursor-pointer text-green-400 hover:text-green-500">
                          Accept
                        </button>
                        <button className="cursor-pointer text-red-400 hover:text-red-500">
                          Reject
                        </button>
                      </div>
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
