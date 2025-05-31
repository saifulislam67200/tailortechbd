"use client";

const RecentQuestionsSkeleton = () => {
  return (
    <div className="mt-[16px] h-[700px] w-full animate-pulse bg-white p-[16px] xl:w-[450px] 2xl:w-[550px]">
      <div className="mb-[20px] h-5 w-56 rounded bg-gray-200"></div>

      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-gray-100"></div>
                <div className="h-3 w-40 rounded bg-gray-100"></div>
              </div>
            </div>
            <div className="h-5 w-12 rounded bg-gray-200"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentQuestionsSkeleton;
