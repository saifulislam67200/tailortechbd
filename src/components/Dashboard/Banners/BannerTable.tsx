"use client";

import HorizontalLine from "@/components/ui/HorizontalLine";
import {
  useGetAllBannersQuery,
} from "@/redux/features/banner/banner.api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Image from "next/image";
import ActiveBannerToggle from "./ActiveBannerToggle";
import DeleteBanner from "./DeleteBanner";
import AddBanner from "./AddBanner";
import UpdateBanner from "./UpdateBanner";
import Button from "@/components/ui/Button";

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
        <div className="mb-[5px] flex md:flex-row flex-col md:items-center justify-end gap-[12px]">
          <AddBanner />
          <Button className="flex items-center gap-[8px] rounded-[6px] border border-dashboard/20 bg-dashboard/10 px-[16px] py-[8px] text-[14px] font-medium text-dashboard transition-colors hover:bg-dashboard/20">
            Manage Banner Position
          </Button>
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
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-[14px] font-medium">{banner.index}</span>
                    </div>
                  </td>

                  {/* Banner Image */}
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg border border-border-muted bg-gray-100">
                      <Image
                        src={banner.thumbnail || "/images/avatar.jpg"}
                        alt={banner.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <div className="text-[14px] font-medium capitalize">{banner.name}</div>
                  </td>

                  {/* Toggle Column */}
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
                    <ActiveBannerToggle id={banner._id} active={banner?.active} />
                  </td>

                  {/* Status */}
                  <td className="px-[24px] py-[16px] whitespace-nowrap">
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
                  <td className="px-[24px] py-[16px] text-[14px] whitespace-nowrap text-info">
                    {banner.createdAt ? formatDate(banner.createdAt) : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-[24px] py-[16px] text-[14px] font-medium whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      
                      <UpdateBanner banner={banner} />
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
            <h3 className="mb-2 text-lg font-medium text-primary">No banners found</h3>
            <p className="mb-6 text-info">Get started by creating your first banner.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerTable;
