"use client";

const OverviewChartSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Header and Filter */}
      <div className="mb-4 flex w-full items-center justify-between rounded bg-white p-[16px]">
        <div className="h-5 w-32 rounded bg-gray-200"></div>
        <div className="h-9 w-36 rounded bg-gray-200"></div>
      </div>

      {/* Summary Cards */}
      <div className="mb-[16px] flex flex-col gap-[16px] lg:flex-row">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[160px] flex-1 rounded bg-white p-[16px] shadow-sm 2xl:h-[180px]"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>

            <div className="mt-[24px] flex items-center gap-[16px]">
              <div className="h-[60px] w-[60px] rounded-md bg-gray-100"></div>
              <div className="flex flex-col gap-2">
                <div className="h-6 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-20 rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="rounded bg-white pt-[50px] pr-[16px] pb-[70px] 2xl:h-[500px]">
        <div className="mb-[20px] h-5 w-56 rounded bg-gray-200 pl-[45px]"></div>
        <div className="mx-auto h-[240px] w-[95%] rounded bg-gray-100 2xl:h-[360px]"></div>
      </div>
    </div>
  );
};

export default OverviewChartSkeleton;
