"use client";

const RecentSalesTableSkeleton = () => {
  return (
    <div className="animate-pulse bg-white p-4">
      {/* Header and Filter */}
      <div className="flex flex-col justify-between gap-2 pb-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded bg-gray-200"></div>
          <div className="h-5 w-4 rounded bg-gray-200"></div>
          <div className="h-5 w-20 rounded bg-gray-200"></div>
        </div>
        <div className="h-9 w-36 rounded bg-gray-200"></div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              {["Product", "Customer", "Total Items", "Price", "Status"].map((header) => (
                <th key={header} className="px-4 py-5 text-left">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t border-gray-200">
                {/* Product */}
                <td className="flex max-w-[200px] items-center gap-2 px-4 py-5">
                  <div className="h-12 w-12 rounded bg-gray-200"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </td>

                {/* Customer */}
                <td className="px-4 py-5">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="mt-1 h-3 w-24 rounded bg-gray-200"></div>
                </td>

                {/* Total Items */}
                <td className="px-4 py-5">
                  <div className="h-4 w-6 rounded bg-gray-200"></div>
                </td>

                {/* Price */}
                <td className="px-4 py-5">
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                </td>

                {/* Status */}
                <td className="px-4 py-5">
                  <div className="h-6 w-20 rounded bg-gray-200"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200"></div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-8 rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSalesTableSkeleton;
