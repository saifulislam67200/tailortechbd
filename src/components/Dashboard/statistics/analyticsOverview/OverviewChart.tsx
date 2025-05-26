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
import RavenedCard from "./RavenedCard";
import CustomersCard from "./CustomersCard";

type TimeDataType = {
  time: string;
  Sales: number;
  Revenue: number;
  Customers: number;
};

type TimePeriodDataType = {
  [key in "today" | "this_month" | "this_year" | "overall"]: TimeDataType[];
};

// fake data
const timePeriodData: TimePeriodDataType = {
  today: [
    { time: "03:00", Sales: 15, Revenue: 10, Customers: 5 },
    { time: "03:30", Sales: 51, Revenue: 32, Customers: 18 },
    { time: "04:00", Sales: 30, Revenue: 20, Customers: 12 },
    { time: "05:00", Sales: 25, Revenue: 15, Customers: 8 },
  ],
  this_month: [
    { time: "Week 1", Sales: 120, Revenue: 80, Customers: 45 },
    { time: "Week 2", Sales: 200, Revenue: 130, Customers: 70 },
    { time: "Week 3", Sales: 180, Revenue: 120, Customers: 65 },
    { time: "Week 4", Sales: 150, Revenue: 100, Customers: 55 },
  ],
  this_year: [
    { time: "Jan", Sales: 450, Revenue: 300, Customers: 150 },
    { time: "Feb", Sales: 480, Revenue: 320, Customers: 160 },
    { time: "Mar", Sales: 520, Revenue: 350, Customers: 170 },
    { time: "Apr", Sales: 550, Revenue: 370, Customers: 180 },
  ],
  overall: [
    { time: "2020", Sales: 4000, Revenue: 2800, Customers: 1200 },
    { time: "2021", Sales: 4800, Revenue: 3200, Customers: 1500 },
    { time: "2022", Sales: 5200, Revenue: 3500, Customers: 1700 },
    { time: "2023", Sales: 6000, Revenue: 4000, Customers: 2000 },
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

  // Calculate totals for the current period
  interface DataItem {
    time: string;
    Sales: number;
    Revenue: number;
    Customers: number;
  }

  interface Totals {
    Sales: number;
    Revenue: number;
    Customers: number;
  }

  const totals: Totals = currentData.reduce(
    (acc: Totals, item: DataItem) => ({
      Sales: acc.Sales + item.Sales,
      Revenue: acc.Revenue + item.Revenue,
      Customers: acc.Customers + item.Customers,
    }),
    { Sales: 0, Revenue: 0, Customers: 0 }
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between bg-white p-[16px]">
        <h1>Hi john, Welcome to the dashboard</h1>
        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      <div className="mb-[16px] flex flex-col gap-[16px] sm:flex-row">
        <SalesCard value={totals.Sales} selectedFilter={selectedFilter.value} />
        <RavenedCard value={totals.Revenue} selectedFilter={selectedFilter.value} />
        <CustomersCard value={totals.Customers} selectedFilter={selectedFilter.value} />
      </div>

      <div className="h-[400px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
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
            <Line type="monotone" dataKey="Revenue" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="Customers" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
