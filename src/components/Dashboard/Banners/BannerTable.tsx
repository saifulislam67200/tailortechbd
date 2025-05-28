"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import {
  useGetAllBannersQuery,
} from "@/redux/features/banner/banner.api";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import ActiveBannerToggle from "./ActiveBannerToggle";
import DeleteBanner from "./DeleteBanner";

const tableHead = [
  { label: "Order", field: "order" },
  { label: "Banner", field: "banner" },
  { label: "Name", field: "name" },
  { label: "Toggle", field: "toggle" },
  { label: "Status", field: "status" },
  { label: "Created", field: "date" },
  { label: "Actions", field: "" },
];

const BannerTable = () => {
  const { data } = useGetAllBannersQuery();
  const banners = data?.data || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] bg-white p-[16px]">
        {/* Header */}
        <div className="flex flex-col gap-[5px]">
          <h1 className="text-[16px] font-[600]">Banner Management</h1>
          <p className="text-[14px] text-muted">
            You are managing a total of{" "}
            <span className="font-bold text-dashboard">{banners?.length}</span> banners
          </p>
        </div>
        <HorizontalLine className="my-[10px]" />
        {/* Action Buttons */}
        <div className="mb-[5px] flex items-center justify-end gap-[12px]">
          <button className="flex items-center gap-[8px] rounded-[6px] bg-primary px-[16px] py-[8px] text-[14px] font-medium text-white transition-colors hover:bg-primary/90">
            Create New Banner
          </button>
          <button className="flex items-center gap-[8px] rounded-[6px] border border-dashboard/20 bg-dashboard/10 px-[16px] py-[8px] text-[14px] font-medium text-dashboard transition-colors hover:bg-dashboard/20">
            Manage Banner Position
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-dashboard/20">
            <thead className="bg-dashboard/10">
              <tr>
                {tableHead.map((heading) => (
                  <th
                    key={heading.field || heading.label}
                    className={`lg:text-[14px]" px-[24px] py-[12px] text-left text-[12px] font-semibold tracking-wider text-dashboard capitalize`}
                  >
                    {heading?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {banners.map((banner) => (
                <tr key={banner._id} className="transition-colors hover:bg-gray-50">
                  {/* Order Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{banner.index}</span>
                    </div>
                  </td>

                  {/* Banner Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg border bg-gray-100">
                      <Image
                        src={banner.thumbnail || "/placeholder.svg"}
                        alt={banner.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{banner.name}</div>
                  </td>

                  {/* Toggle Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActiveBannerToggle id={banner._id} active={banner?.active} />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex w-[87px] items-center rounded-full px-3 py-1 text-xs font-medium ${
                        banner.active
                          ? "border border-green-200 bg-green-100 text-green-800"
                          : "border border-red-200 bg-red-100 text-red-800"
                      }`}
                    >
                      {banner.active ? (
                        <>
                          <FiEye className="mr-1 h-3 w-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <FiEyeOff className="mr-1 h-3 w-3" />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    {banner.createdAt ? formatDate(banner.createdAt) : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button
                        className="rounded-full border border-dashboard/20 bg-dashboard/5 p-2 text-dashboard transition-colors hover:bg-blue-50 hover:text-blue-900"
                        title="Edit banner"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <DeleteBanner id={banner?._id} name={banner?.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {banners.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-gray-400">
              <FiEye className="mx-auto h-16 w-16" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">No banners found</h3>
            <p className="mb-6 text-gray-600">Get started by creating your first banner.</p>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              Add Banner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerTable;
