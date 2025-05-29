"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AnalyticsOverviewFilter from "./AnalyticsOverviewFilter";
import SalesCard from "./SalesCard";
import CustomersCard from "./CustomersCard";
import { useAppSelector } from "@/hooks/redux";
import EarningCard from "./EarningCard";
import { useGetSalesSummaryQuery } from "@/redux/features/statistics/statistics.api";
import Loader from "@/components/ui/Loader";

type TimeDataType = {
  time: string;
  Sales: number;
  Earnings: number;
  Customers: number;
  increase: number;
};

type TimePeriodDataType = {
  [key in "today" | "this_month" | "this_year" | "overall"]: TimeDataType[];
};

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
];

const OverviewChart = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]);
  const { user } = useAppSelector((state) => state.user);

  // Fetch sales summary data from API
  const { data: salesSummaryData, isLoading } = useGetSalesSummaryQuery({
    searchQuery: selectedFilter.value,
  });

  // Map filter value to API key
  const filterKeyMap: Record<string, keyof TimePeriodDataType> = {
    overall: "overall",
    today: "today",
    "this-month": "this_month",
    "this-year": "this_year",
  };

  // console.log(salesSummaryData, "salesSummaryData");

  // Get current data from API if available, otherwise fallback to empty array
  const currentData = salesSummaryData?.data?.[filterKeyMap[selectedFilter.value]] ?? [];

  // Calculate totals for the current period
  interface DataItem {
    time: string;
    Sales: number;
    Earnings: number;
    Customers: number;
    increase?: number;
  }

  interface Totals {
    Sales: number;
    Earnings: number;
    Customers: number;
  }

  const totals: Totals = currentData?.reduce(
    (acc: Totals, item: DataItem) => ({
      Sales: acc.Sales + item.Sales,
      Earnings: acc.Earnings + item.Earnings,
      Customers: acc.Customers + item.Customers,
    }),
    { Sales: 0, Earnings: 0, Customers: 0 }
  ) ?? { Sales: 0, Earnings: 0, Customers: 0 };

  // Calculate increase for the selected filter
  // Show the "increase" value from the last item of the current data, as provided by backend
  const increase =
    currentData && currentData.length > 0 ? (currentData[currentData.length - 1].increase ?? 0) : 0;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between bg-white p-[16px]">
        <h1>Hi, {user?.fullName}</h1>
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      <div className="mb-[16px] flex flex-col gap-[16px] lg:flex-row">
        <SalesCard value={totals.Sales} selectedFilter={selectedFilter.value} increase={increase} />
        <EarningCard
          value={totals.Earnings}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
        <CustomersCard
          value={totals.Customers}
          selectedFilter={selectedFilter.value}
          increase={increase}
        />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Statistics
        </h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={currentData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line type="monotone" dataKey="Earnings" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="Customers" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
