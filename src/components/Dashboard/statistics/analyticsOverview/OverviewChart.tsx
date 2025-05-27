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

// fake data
const timePeriodData: TimePeriodDataType = {
  today: [
    { time: "03:00", Sales: 15, Earnings: 10, Customers: 5, increase: 100 },
    { time: "03:30", Sales: 51, Earnings: 32, Customers: 18, increase: 100 },
    { time: "04:00", Sales: 30, Earnings: 20, Customers: 12, increase: 100 },
    { time: "05:00", Sales: 25, Earnings: 15, Customers: 8, increase: 100 },
  ],
  this_month: [
    { time: "Week 1", Sales: 120, Earnings: 80, Customers: 45, increase: 100 },
    { time: "Week 2", Sales: 200, Earnings: 130, Customers: 70, increase: 100 },
    { time: "Week 3", Sales: 180, Earnings: 120, Customers: 65, increase: 100 },
    { time: "Week 4", Sales: 150, Earnings: 100, Customers: 55, increase: 100 },
  ],
  this_year: [
    { time: "Jan", Sales: 450, Earnings: 300, Customers: 150, increase: 100 },
    { time: "Feb", Sales: 480, Earnings: 320, Customers: 160, increase: 100 },
    { time: "Mar", Sales: 520, Earnings: 350, Customers: 170, increase: 100 },
    { time: "Apr", Sales: 550, Earnings: 370, Customers: 180, increase: 100 },
  ],
  overall: [
    { time: "2020", Sales: 4000, Earnings: 2800, Customers: 1200, increase: 100 },
    { time: "2021", Sales: 4800, Earnings: 3200, Customers: 1500, increase: 100 },
    { time: "2022", Sales: 5200, Earnings: 3500, Customers: 1700, increase: 100 },
    { time: "2023", Sales: 6000, Earnings: 4000, Customers: 2000, increase: 100 },
  ],
};

const options = [
  { value: "overall", label: "Overall" },
  { value: "today", label: "Today" },
  { value: "this_month", label: "This Month" },
  { value: "this_year", label: "This Year" },
];

const OverviewChart = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]);
  const currentData = timePeriodData[selectedFilter.value as keyof TimePeriodDataType];
  const { user } = useAppSelector((state) => state.user);

  // Calculate totals for the current period
  interface DataItem {
    time: string;
    Sales: number;
    Earnings: number;
    Customers: number;
  }

  interface Totals {
    Sales: number;
    Earnings: number;
    Customers: number;
  }

  const totals: Totals = currentData.reduce(
    (acc: Totals, item: DataItem) => ({
      Sales: acc.Sales + item.Sales,
      Earnings: acc.Earnings + item.Earnings,
      Customers: acc.Customers + item.Customers,
    }),
    { Sales: 0, Earnings: 0, Customers: 0 }
  );

  // Calculate increase for the selected filter
  // Show the "increase" value from the last item of the current data, as provided by backend
  const increase = currentData.length > 0 ? currentData[currentData.length - 1].increase : 0;

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between rounded-[5px] bg-white p-[16px]">
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

      <div className="h-[400px] rounded-[5px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
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
