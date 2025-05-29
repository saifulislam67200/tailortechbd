const BannerTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="transition-colors hover:bg-gray-50">
          {/* Order Column */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="flex items-center space-x-2">
              <span className="h-4 w-8 animate-pulse rounded bg-gray-300"></span>
            </span>
          </td>

          {/* Banner Image */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-12 w-20 animate-pulse rounded-lg bg-gray-300"></span>
          </td>

          {/* Name */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-4 w-32 animate-pulse rounded bg-gray-300"></span>
          </td>

          {/* Toggle Column */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-6 w-12 animate-pulse rounded-full bg-gray-300"></span>
          </td>

          {/* Status */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="inline-flex h-6 w-[87px] animate-pulse rounded-full bg-gray-300"></span>
          </td>

          {/* Created Date */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="block h-4 w-24 animate-pulse rounded bg-gray-300"></span>
          </td>

          {/* Actions */}
          <td className="px-[24px] py-[16px] whitespace-nowrap">
            <span className="flex items-center space-x-3">
              <span className="h-8 w-8 animate-pulse rounded bg-gray-300"></span>
              <span className="h-8 w-8 animate-pulse rounded bg-gray-300"></span>
            </span>
          </td>
        </tr>
      ))}
    </>
  )
}

export default BannerTableSkeleton
