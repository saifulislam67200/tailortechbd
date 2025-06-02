"use client";
import HorizontalLine from "@/components/ui/HorizontalLine";
import {
  useGetAllCouponsQuery,
  useToggleActiveInActiveMutation,
} from "@/redux/features/coupon/coupon.api";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import Toggle from "@/components/ui/Toggle";
import dateUtils from "@/utils/date";
import { ICoupon } from "./CreateCouponView";

const tableHead = [
  { label: "Code", field: "code" },
  { label: "Discount", field: "discount" },
  { label: "Discount Type", field: "discountType" },
  { label: "isActive", field: "isActive" },
  { label: "Created At", field: "createdAt" },
  { label: "Actions", field: "" },
];

const AllCouponsView = () => {
  // const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState<Record<string, string | number>>({
    page: 1,
    fields: "assignedTo.fullName,assignedTo.email,assignedTo.phoneNumber,createdAt",
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
    limit: 10,
  });

  const { data, isLoading } = useGetAllCouponsQuery({ ...query });
  const coupons = data?.data || [];
  const metaData = data?.meta || { totalDoc: 0, page: 1 };

  const [toggleActiveInActive] = useToggleActiveInActiveMutation();

  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };

  const handleToggle = (id: string) => {
    toggleActiveInActive(id);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Coupon List</h1>
          <p className="text-[12px] text-muted md:text-[14px]">Displaying All coupons</p>
        </div>
        <HorizontalLine className="my-[10px]" />
        {/* <div className="flex w-full max-w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search Coupon Code"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <RxMagnifyingGlass />
        </div> */}

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
                                ? "text-dashboard"
                                : "text-dashboard/30"
                            }`}
                          />
                          <FaChevronDown
                            className={`${
                              sort.field === heading.field && sort.order === "desc"
                                ? "text-dashboard"
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
              ) : coupons.length ? (
                coupons.map((coupon: ICoupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-[14px]">{coupon.code}</td>
                    <td className="px-6 py-4 text-[14px]">{coupon.discount}</td>
                    <td className="px-6 py-4 text-[14px] capitalize">{coupon.discountType}</td>
                    <td className="px-6 py-4">
                      {coupon.isActive ? (
                        <span className="rounded-full bg-success/10 px-[8px] py-[2px] text-[14px] text-success">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-danger/10 px-[8px] py-[2px] text-[14px] text-danger">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[14px]">
                      {dateUtils.formateCreateOrUpdateDate(coupon.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Toggle
                        onToggle={() => handleToggle(coupon._id as string)}
                        defaultActive={coupon.isActive}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <TableDataNotFound span={tableHead.length} message="No Coupon Found" />
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalDocs={metaData.totalDoc}
        onPageChange={(page) => setQuery({ ...query, page })}
        limit={10}
      />
    </div>
  );
};

export default AllCouponsView;
