"use client";

const YearlySellingPieChartSkeleton = () => {
  return (
    <div className="h-[370px] w-full animate-pulse rounded bg-white p-4 xl:w-[450px] 2xl:min-h-[450px] 2xl:w-[550px]">
      {/* Header Row */}
      <div className="mb-4 flex justify-between">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200"></div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 rounded-full bg-gray-300"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
          <div className="h-3 w-48 rounded bg-gray-100"></div>
        </div>

        {/* Filter Skeleton */}
        <div className="h-8 w-20 rounded bg-gray-200"></div>
      </div>

      {/* Chart Skeleton */}
      <div className="mx-auto flex h-[200px] w-full items-center justify-center 2xl:h-[260px]">
        <div className="h-40 w-40 rounded-full bg-gray-100 2xl:h-52 2xl:w-52"></div>
      </div>
    </div>
  );
};

export default YearlySellingPieChartSkeleton;
