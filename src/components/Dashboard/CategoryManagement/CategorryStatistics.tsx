"use client"

import { useGetCategoryStatisticsQuery } from "@/redux/features/category/category.api"
import { IoIosMenu } from "react-icons/io"

const CategoryStatisticsSkeleton = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <span className="rounded-lg bg-gray-200 p-2 animate-pulse">
              <span className="block h-6 w-6 bg-gray-300 rounded"></span>
            </span>
            <div className="ml-4 flex-1">
              <span className="block h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></span>
              <span className="block h-8 w-16 bg-gray-200 rounded animate-pulse"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const CategoryStatistics = () => {
  const { data, isFetching } = useGetCategoryStatisticsQuery(undefined)
  const statisticsData = data?.data
  const totalVisible = statisticsData?.totalVisibleCategories || 0
  const totalCategories = statisticsData?.totalCategories || 0
  const totalRootCategories = statisticsData?.totalMainCategories || 0
  const totalHidenCategories = totalCategories - totalVisible

  if (isFetching) {
    return <CategoryStatisticsSkeleton />
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <span className="rounded-lg bg-blue-100 p-2">
            <IoIosMenu className="h-[24px] w-[24px] text-blue-600" />
          </span>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Categories</p>
            <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-lg bg-green-100 p-2">
            <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Visible</p>
            <p className="text-2xl font-bold text-gray-900">{totalVisible}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-lg bg-yellow-100 p-2">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Hidden</p>
            <p className="text-2xl font-bold text-gray-900">{totalHidenCategories}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-lg bg-purple-100 p-2">
            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Root Categories</p>
            <p className="text-2xl font-bold text-gray-900">{totalRootCategories}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryStatistics
