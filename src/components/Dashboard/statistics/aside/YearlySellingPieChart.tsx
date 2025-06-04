"use client";
import YearlySellingPieChartSkeleton from "@/components/ui/Skeleton/YearlySellingPieChartSkeleton";
import { useGetThisYearEarningsQuery } from "@/redux/features/statistics/statistics.api";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import AnalyticsOverviewFilter from "../analyticsOverview/AnalyticsOverviewFilter";

const options = [
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
];

type EarningsEntry = {
  name: string;
  value: number;
  color: string;
};

const YearlySellingPieChart = () => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]);
  const { data: earningsData, isLoading } = useGetThisYearEarningsQuery({
    filter: selectedFilter.value,
  });

  const earningsPieData: EarningsEntry[] = earningsData?.data?.[selectedFilter.value] || [];

  const totalSales =
    earningsPieData?.reduce((sum: number, month: EarningsEntry) => sum + month.value, 0) || 0;

  const hasMultipleValues =
    earningsPieData?.filter((entry: EarningsEntry) => entry.value > 0).length > 1;

  if (isLoading) {
    return <YearlySellingPieChartSkeleton />;
  }

  return (
    <div className="h-fit min-h-[370px] w-full bg-white p-[16px] xl:w-[450px] 2xl:min-h-[450px] 2xl:w-[450px]">
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-[14px] font-bold text-primary sm:text-[16px]">
            Earnings of {selectedFilter?.value}
          </h2>
          <p className="mt-1 flex items-center text-[16px] font-semibold text-info">
            <TbCurrencyTaka size={20} />
            {Math.floor(totalSales).toLocaleString()}
          </p>
          {!hasMultipleValues && (
            <p className="mt-1 text-[12px] text-info">Only showing data for months with earnings</p>
          )}
        </div>

        <AnalyticsOverviewFilter
          options={options}
          selected={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>

      <div className="h-[200px] w-full 2xl:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={earningsPieData?.filter((entry: EarningsEntry) => entry.value > 0) || []}
              cx="50%"
              cy="50%"
              dataKey="value"
              className="text-[12px]"
              label={({ name, value }) => `${name} (${"৳"}${Math.floor(value).toLocaleString()})`}
              minAngle={15}
            >
              {earningsPieData?.map((entry: EarningsEntry, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `৳ ${value.toLocaleString()}`,
                props.payload.name,
              ]}
              includeHidden
              contentStyle={{
                borderRadius: "6px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlySellingPieChart;
