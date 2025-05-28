interface QnaSkeletonProps {
  rows?: number;
}

export default function QnaSkeleton({ rows = 5 }: QnaSkeletonProps) {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <tr key={index} className="animate-pulse border-b border-dashboard/20">
            {/* Customer Column */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="block h-4 w-24 rounded bg-gray-200"></span>
            </td>

            {/* Product Column */}
            <td className="px-6 py-4">
              <span className="flex max-w-[250px] items-center gap-3">
                <span className="block h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200"></span>
                <span className="min-w-0 flex-1 space-y-2">
                  <span className="block h-3 w-32 rounded bg-gray-200"></span>
                  <span className="block h-3 w-20 rounded bg-gray-200"></span>
                </span>
              </span>
            </td>

            {/* Question Column */}
            <td className="px-6 py-4">
              <span className="space-y-2">
                <span className="block h-3 w-40 rounded bg-gray-200"></span>
                <span className="block h-3 w-32 rounded bg-gray-200"></span>
              </span>
            </td>

            {/* Answer Column */}
            <td className="px-6 py-4">
              <span className="block h-5 w-24 rounded-full bg-gray-200"></span>
            </td>

            {/* Date Column */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="block h-4 w-24 rounded bg-gray-200"></span>
            </td>

            {/* Actions Column */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="flex items-center justify-center gap-3">
                <span className="block h-8 w-8 rounded-lg bg-gray-200"></span>
                <span className="block h-8 w-8 rounded-lg bg-gray-200"></span>
              </span>
            </td>
          </tr>
        ))}
    </>
  );
}
