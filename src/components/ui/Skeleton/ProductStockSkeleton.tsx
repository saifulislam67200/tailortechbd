"use client";

const ProductStockSkeleton = () => {
  // Create an array with 10 elements to render 10 rows
  const rows = Array.from({ length: 10 });

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex animate-pulse flex-col gap-[15px] bg-white p-[16px]">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-48 rounded bg-skeleton"></div>
          <div className="h-4 w-64 rounded bg-skeleton"></div>
        </div>

        <div className="my-[10px] border-b border-skeleton"></div>

        {/* Search & Filter Bar Skeleton */}
        <div className="flex items-center justify-between gap-4">
          <div className="h-10 w-72 rounded border border-skeleton bg-skeleton"></div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-32 rounded border border-skeleton bg-skeleton"></div>
            <div className="h-10 w-28 rounded bg-skeleton"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-skeleton">
            <thead>
              <tr>
                {["Product Name", "Color", "Size", "Stock Qty", "Stock Status", "Last Updated"].map(
                  (head, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-left text-sm font-semibold text-skeleton uppercase"
                    >
                      <div className="h-4 w-20 rounded bg-skeleton"></div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((_, idx) => (
                <tr key={idx} className="border-t border-skeleton">
                  {Array(6)
                    .fill(0)
                    .map((__, i) => (
                      <td key={i} className="px-6 py-4">
                        <div className="h-4 w-full max-w-[80%] rounded bg-skeleton"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-4 flex justify-center gap-2">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="h-8 w-8 rounded bg-skeleton" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStockSkeleton;
