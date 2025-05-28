const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {/* Customer Info */}
          <td className="w-[180px] px-[24px] py-[16px]">
            <div className="max-w-[150px]">
              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
              <div className="h-3 w-28 animate-pulse rounded bg-gray-300"></div>
            </div>
          </td>

          {/* Product */}
          <td className="px-[24px] py-[16px]">
            <div className="flex max-w-[200px] items-center space-x-3">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 h-4 w-36 animate-pulse rounded bg-gray-300"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>
          </td>

          {/* Total Items */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
          </td>

          {/* Total Amount */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
          </td>

          {/* Status */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-300"></div>
          </td>

          {/* Date */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
          </td>

          {/* Actions */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
            </div>
          </td>
        </tr>
      ))}

      {/* Empty state skeleton */}
      <div className="hidden py-12 text-center" id="empty-skeleton">
        <div className="mx-auto mb-2 h-6 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="mx-auto h-4 w-48 animate-pulse rounded bg-gray-300"></div>
      </div>
    </>
  );
};

export default TableSkeleton;
