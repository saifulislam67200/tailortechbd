"use client";
import Image from "next/image";
import { useState } from "react";
import AnalyticsOverviewFilter from "./AnalyticsOverviewFilter";

const topSellingData = [
  {
    id: 1,
    image: "/macbook.jpeg",
    name: "lorem ipsum dolor sit amet",
    price: "$64",
    sold: 124,
    revenue: "$5,828",
  },
  {
    id: 2,
    image: "/macbook.jpeg",
    name: "lorem ipsum dolor sit amet consectetur",
    price: "$46",
    sold: 98,
    revenue: "$4,508",
  },
  {
    id: 3,
    image: "/macbook.jpeg",
    name: "lorem ipsum dolor sit amet consectetur adipisicing",
    price: "$59",
    sold: 74,
    revenue: "$4,366",
  },
  {
    id: 4,
    image: "/macbook.jpeg",
    name: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$32",
    sold: 63,
    revenue: "$2,016",
  },
  {
    id: 5,
    image: "/macbook.jpeg",
    name: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$79",
    sold: 41,
    revenue: "$3,239",
  },
];

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this_month", label: "This Month" },
  { value: "this_year", label: "This Year" },
];

const TopSellingTable = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]);

  return (
    <div className="overflow-x-auto rounded-[5px] bg-white p-[16px]">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-[5px]">
          <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Top Selling</h3> |{" "}
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
          <tr className="text-left text-info">
            <th className="px-4 py-[20px]">Preview</th>
            <th className="px-4 py-[20px]">Product</th>
            <th className="px-4 py-[20px]">Price</th>
            <th className="px-4 py-[20px]">Sold</th>
            <th className="px-4 py-[20px]">Earning</th>
          </tr>
        </thead>
        <tbody>
          {topSellingData.map((item) => (
            <tr key={item.id} className="border-t border-t-quaternary hover:bg-quaternary/20">
              <td className="px-4 py-3">
                <Image
                  width={200}
                  height={200}
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="cursor-pointer px-4 py-3 font-medium text-primary hover:underline">
                {item.name}
              </td>
              <td className="px-4 py-3">{item.price}</td>
              <td className="px-4 py-3 font-bold">{item.sold}</td>
              <td className="px-4 py-3">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingTable;
