"use client";
import OverviewChartSkeleton from "@/components/ui/Skeleton/OverviewChartSkeleton";
import { useAppSelector } from "@/hooks/redux";
import {
  useGetSalesSummaryQuery,
  useGetSmsStatisticsQuery,
} from "@/redux/features/statistics/statistics.api";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomersCard from "./CustomersCard";
import EarningCard from "./EarningCard";
import SalesCard from "./SalesCard";
import SmsOverviewCard from "./SmsOverviewCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

const OverviewChart = () => {
  const selectedFilter = { value: "custom", label: "Custom Range" };
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({ startDate: undefined, endDate: undefined });
  const { user } = useAppSelector((state) => state.user);

  // Helper function to format date as YYYY-MM-DD in local timezone
  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch sales summary data from API
  const queryParams: Record<string, string> = {};
  if (dateRange.startDate) queryParams.startDate = formatDateLocal(dateRange.startDate);
  if (dateRange.endDate) queryParams.endDate = formatDateLocal(dateRange.endDate);
  const { data: salesSummaryData, isLoading, refetch } = useGetSalesSummaryQuery(queryParams);

  const { data: smsOverview } = useGetSmsStatisticsQuery(undefined);

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      refetch();
    }
  }, [dateRange.startDate, dateRange.endDate, refetch]);

  // Extract summary data from the new API structure
  const summaryData = salesSummaryData?.data?.summary || { Sales: 0, Earnings: 0, Customers: 0 };

  // For chart display, create an array with the summary data
  // If you need time-series data for the chart, you'll need to format it accordingly
  const currentData = [summaryData];

  // interface DataItem {
  //   Sales: number;
  //   Earnings: number;
  //   Customers: number;
  // }

  interface Totals {
    Sales: number;
    Earnings: number;
    Customers: number;
  }

  const totals: Totals = {
    Sales: summaryData.Sales,
    Earnings: summaryData.Earnings,
    Customers: summaryData.Customers,
  };

  // Calculate increase for the selected filter
  // Since increase is not provided in the new API, set to 0
  const increase = 0;

  if (isLoading) {
    return <OverviewChartSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between bg-white p-[16px]">
        <h1>Hi, {user?.fullName}</h1>
        <div className="flex items-center justify-start gap-2">
          <DatePicker
            selected={dateRange.startDate}
            dateFormat={"dd MMM yyyy"}
            placeholderText="Start Date"
            icon={<IoCalendarNumberOutline />}
            className="max-w-[150px] cursor-pointer border border-quaternary px-[12px] py-[6px] text-sm focus:outline-none"
            onChange={(date) => setDateRange({ ...dateRange, startDate: date || undefined })}
          />
          -
          <DatePicker
            selected={dateRange.endDate}
            dateFormat={"dd MMM yyyy"}
            placeholderText="End Date"
            icon={<IoCalendarNumberOutline />}
            className="max-w-[150px] cursor-pointer border border-quaternary px-[12px] py-[6px] text-sm focus:outline-none"
            onChange={(date) => setDateRange({ ...dateRange, endDate: date || undefined })}
          />
          <button
            onClick={() => setDateRange({ startDate: undefined, endDate: undefined })}
            className="ml-2 rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mb-[16px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 2xl:grid-cols-4">
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
        <SmsOverviewCard sms={smsOverview?.data} />
      </div>

      <div className="2x:h-[400px] h-[360px] bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
        <h1 className="mb-[20px] pl-[45px] text-[14px] font-semibold text-primary md:text-[16px]">
          Overall Statistics
          {salesSummaryData?.data?.dateRange && (
            <span className="ml-2 text-xs text-gray-500">
              ({salesSummaryData.data.dateRange.start} to {salesSummaryData.data.dateRange.end})
            </span>
          )}
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
            <XAxis dataKey="name" />
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
