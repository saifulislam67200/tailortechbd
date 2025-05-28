const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {/* Customer Info */}
          <td className="w-[180px] px-[24px] py-[16px]">
            <span className="block max-w-[150px]">
              <span className="mb-2 block h-4 w-32 animate-pulse rounded bg-gray-300"></span>
              <span className="block h-3 w-28 animate-pulse rounded bg-gray-300"></span>
            </span>
          </td>

          {/* Product */}
          <td className="px-[24px] py-[16px]">
            <span className="flex max-w-[200px] items-center space-x-3">
              <span className="h-12 w-12 animate-pulse rounded-lg bg-gray-300"></span>
              <span className="min-w-0 flex-1">
                <span className="mb-2 block h-4 w-36 animate-pulse rounded bg-gray-300"></span>
                <span className="block h-3 w-20 animate-pulse rounded bg-gray-300"></span>
              </span>
            </span>
          </td>

          {/* Total Items */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-4 w-16 animate-pulse rounded bg-gray-300"></span>
          </td>

          {/* Total Amount */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-4 w-20 animate-pulse rounded bg-gray-300"></span>
          </td>

          {/* Status */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-6 w-20 animate-pulse rounded-full bg-gray-300"></span>
          </td>

          {/* Date */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-4 w-24 animate-pulse rounded bg-gray-300"></span>
          </td>

          {/* Actions */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="flex justify-center">
              <span className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></span>
            </span>
          </td>
        </tr>
      ))}

      {/* Empty state skeleton */}
      <tr className="hidden" id="empty-skeleton">
        <td colSpan={7} className="py-12 text-center">
          <span className="mx-auto mb-2 block h-6 w-32 animate-pulse rounded bg-gray-300"></span>
          <span className="mx-auto block h-4 w-48 animate-pulse rounded bg-gray-300"></span>
        </td>
      </tr>
    </>
  );
};

export default TableSkeleton;
