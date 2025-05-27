"use client";
import React, { useState } from "react";
import AnalyticsOverviewFilter from "./AnalyticsOverviewFilter";

const salesData = [
  {
    id: "2457",
    customer: "Brandon Jacob",
    product: "At praesentium minu",
    price: "$64",
    status: "delivered" as StatusType,
  },
  {
    id: "2147",
    customer: "Bridie Kessler",
    product: "Blanditiis dolor omnis similique",
    price: "$47",
    status: "pending" as StatusType,
  },
  {
    id: "2049",
    customer: "Ashleigh Langosh",
    product: "At recusandae consectetur",
    price: "$147",
    status: "delivered" as StatusType,
  },
  {
    id: "2644",
    customer: "Angus Grady",
    product: "Ut voluptatem id earum et",
    price: "$67",
    status: "cancelled" as StatusType,
  },
  {
    id: "2644",
    customer: "Raheem Lehner",
    product: "Sunt similique distinctio",
    price: "$165",
    status: "delivered" as StatusType,
  },
];

type StatusType = "pending" | "on-delivery" | "delivered" | "cancelled";

const statusColors: Record<StatusType, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "on-delivery": "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-400",
};

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this_month", label: "This Month" },
  { value: "this_year", label: "This Year" },
];

const RecentSalesTable = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]);

  return (
    <div className="overflow-x-auto bg-white p-[16px]">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-semibold">
          Recent Sales <span className="font-normal text-info">| {selectedFilter.label}</span>
        </h2>
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="0 text-left">
            <th className="px-4 py-[20px]">#</th>
            <th className="px-4 py-[20px]">Customer</th>
            <th className="px-4 py-[20px]">Product</th>
            <th className="px-4 py-[20px]">Price</th>
            <th className="px-4 py-[20px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index} className="border-t border-quaternary hover:bg-quaternary/20">
              <td className="cursor-pointer px-4 py-[20px]">#{sale.id}</td>
              <td className="px-4 py-[20px]">{sale.customer}</td>
              <td className="cursor-pointer px-4 py-[20px]">{sale.product}</td>
              <td className="px-4 py-[20px]">{sale.price}</td>
              <td className="px-4 py-[20px]">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${statusColors[sale.status]}`}
                >
                  {sale.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-4 text-sm text-info">
        Showing 1 to {salesData.length} of {salesData.length} entries
      </div>
    </div>
  );
};

export default RecentSalesTable;
