"use client";
import React, { useState } from "react";
import AnalyticsOverviewFilter from "./AnalyticsOverviewFilter";
import Image from "next/image";

const salesData = [
  {
    _id: "2457",
    image: "/macbook.jpeg",
    customer: "Brandon Jacob",
    product: "At praesentium minu",
    price: "$64",
    status: "delivered" as StatusType,
  },
  {
    _id: "2147",
    image: "/macbook.jpeg",
    customer: "Bridie Kessler",
    product: "Blanditiis dolor omnis similique",
    price: "$47",
    status: "pending" as StatusType,
  },
  {
    _id: "2049",
    image: "/macbook.jpeg",
    customer: "Ashleigh Langosh",
    product: "At recusandae consectetur",
    price: "$147",
    status: "delivered" as StatusType,
  },
  {
    _id: "2644",
    image: "/macbook.jpeg",
    customer: "Angus Grady",
    product: "Ut voluptatem id earum et",
    price: "$67",
    status: "cancelled" as StatusType,
  },
  {
    _id: "2644",
    image: "/macbook.jpeg",
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
    <div className="overflow-x-auto rounded-[5px] bg-white p-[16px]">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-[5px]">
          <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Recent Sales</h3> |{" "}
          <p className="text-[14px] font-semibold text-info capitalize">{selectedFilter.label}</p>
        </div>
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="0 text-left">
            <th className="px-4 py-[20px]">image</th>
            <th className="px-4 py-[20px]">Customer</th>
            <th className="px-4 py-[20px]">Product</th>
            <th className="px-4 py-[20px]">Price</th>
            <th className="px-4 py-[20px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index} className="border-t border-quaternary hover:bg-quaternary/20">
              <td className="px-4 py-3">
                <Image
                  width={200}
                  height={200}
                  src={sale.image}
                  alt={sale.customer}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
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
