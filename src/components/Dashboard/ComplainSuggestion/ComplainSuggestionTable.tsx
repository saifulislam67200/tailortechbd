"use client";

import DeleteComplainAndSuggestionById from "@/components/Account/ComplainAndSuggestion/DeleteComplainAndSuggestoinById";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Pagination from "@/components/ui/Pagination";
import TableDataNotFound from "@/components/ui/TableDataNotFound";
import TableSkeleton from "@/components/ui/TableSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllComplaintSuggestionQuery } from "@/redux/features/order/order.api";
import dateUtils from "@/utils/date";
import { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import TakeActionOnComplainSuggestion from "./TakeActionOnComplainSuggestion";
export const tableHead = [
  { label: "Timestamp", field: "createdAt" },
  { label: "Customer Name", field: "" },
  { label: "Order ID", field: "" },
  { label: "Feedback Type", field: "" },
  { label: "C & S-Category", field: "" },
  { label: "Priority", field: "" },
  { label: "Satisfaction (1–5)", field: "satisfaction" },
  { label: "Status", field: "status" },
  { label: "Action Taken (Details)", field: "" },
  { label: "Resolution Date", field: "resolutionDate" },
  { label: "Action", field: "" },
];

export default function ComplainSuggestionTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });
  const [query, setQuery] = useState({
    page: 1,
    sort: `${sort.order === "desc" ? "-" : ""}${sort.field}`,
  });

  const { data, isLoading } = useGetAllComplaintSuggestionQuery({
    page: query.page,
    searchTerm,
  });
  const complaints = data?.data || [];
  const meta = data?.meta || { totalDoc: 0, page: 1 };
  const handleSort = (field: string) => {
    const newOrder = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order: newOrder });
    setQuery((prev) => ({
      ...prev,
      sort: `${newOrder === "desc" ? "-" : ""}${field}`,
    }));
  };
  return (
    <div className="flex flex-col gap-[10px] bg-white p-[18px]">
      <div className="flex flex-col gap-[5px]">
        <div>
          <h1 className="text-[16px] font-[600]">Complain & Suggestion List</h1>
        </div>
        <p className="text-[12px] text-muted md:text-[14px]">
          Displaying All the available Complain & Suggestion. There is total{" "}
          <span className="font-bold text-dashboard">{meta.totalDoc}</span> entries. Data is Devided
          into{" "}
          <span className="font-bold text-dashboard">{Math.ceil(meta.totalDoc / 10)} pages</span> &
          currently showing page <span className="font-bold text-dashboard">{meta.page}.</span>
        </p>
      </div>
      <HorizontalLine className="my-[10px]" />
      <div className="no-print mb-2 flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 p-[5px] outline-none xl:max-w-[300px]">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="@eg: Customer Name/Order ID"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setQuery({ ...query, page: 1 });
            }}
          />
          <RxMagnifyingGlass />
        </div>
        {/* <Button type="button">
          <IoPrintSharp className="mr-2" />
          Print
        </Button> */}
      </div>

      {/* Printable area */}
      <div ref={tableRef}>
        <div className="overflow-x-auto bg-white shadow print:overflow-visible">
          <table className="w-full min-w-[1100px] border-collapse print:min-w-0">
            <thead>
              <tr className="bg-solid-slab [&>th]:text-left">
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className="px-[18px] py-3 text-left text-sm font-semibold text-dashboard uppercase md:px-6"
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
            <tbody>
              {isLoading ? (
                <TableSkeleton row={4} columns={tableHead.length} />
              ) : complaints.length === 0 ? (
                <TableDataNotFound span={10} message="Complain & Suggestion" />
              ) : (
                complaints.map((c) => (
                  <tr key={c._id} className="border-t border-border-main align-top">
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.createdAt
                        ? dateUtils.formateCreateOrUpdateDate(c.createdAt, { month: "short" })
                        : "-"}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.customerName}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.orderId}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.feedbackType}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.csCategory}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.priority}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.satisfaction}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.status}
                    </td>
                    <td
                      title={c.actionTaken}
                      className="max-w-[420px] px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]"
                    >
                      <span className="line-clamp-3 whitespace-pre-wrap">{c.actionTaken}</span>
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      {c.resolutionDate
                        ? dateUtils.formateCreateOrUpdateDate(c.resolutionDate, { month: "short" })
                        : "-"}
                    </td>
                    <td className="px-[18px] py-[16px] text-[12px] font-semibold tracking-wider text-dashboard capitalize lg:text-[14px]">
                      <span className="flex items-center gap-2">
                        <DeleteComplainAndSuggestionById id={c._id} />
                        <TakeActionOnComplainSuggestion complaint={c} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        textClassName="mt-2"
        totalDocs={meta.totalDoc}
        className="mt-4"
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </div>
  );
}
