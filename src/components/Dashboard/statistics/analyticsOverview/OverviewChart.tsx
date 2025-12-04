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
  const [dateRange, setDateRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined }>({ startDate: undefined, endDate: undefined });
  const { user } = useAppSelector((state) => state.user);

  // Fetch sales summary data from API
  const queryParams: Record<string, string> = {};
  if (dateRange.startDate) queryParams.startDate = dateRange.startDate.toISOString().split('T')[0]; // YYYY-MM-DD
  if (dateRange.endDate) queryParams.endDate = dateRange.endDate.toISOString().split('T')[0];
  const { data: salesSummaryData, isLoading, refetch } = useGetSalesSummaryQuery(queryParams);

  const { data: smsOverview } = useGetSmsStatisticsQuery(undefined);

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      refetch();
    }
  }, [dateRange.startDate, dateRange.endDate, refetch]);

  const currentData = Array.isArray(salesSummaryData?.data) ? salesSummaryData.data : [];

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
            className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
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
