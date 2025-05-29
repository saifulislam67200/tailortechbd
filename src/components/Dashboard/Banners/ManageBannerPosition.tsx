"use client";

import Button from "@/components/ui/Button";
import { useGetAllBannersQuery } from "@/redux/features/banner/banner.api";
import Image from "next/image";
import { FaGripVertical } from "react-icons/fa";
import { FiEye, FiEyeOff, FiArrowLeft, FiSave, FiMove } from "react-icons/fi";
type ManageBannerPositionProps = {
  setIsViewBannerPosition: React.Dispatch<React.SetStateAction<boolean>>;
};
const ManageBannerPosition = ({ setIsViewBannerPosition }: ManageBannerPositionProps) => {
  const { data } = useGetAllBannersQuery();
  const banners = data?.data || [];

  return (
    <div className="overflow-hidden rounded-lg border border-border-main bg-white">
      {/* Header */}
      <div className="border-b border-border-main bg-white px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="center mb-[20px] gap-[8px]">
              <button
                onClick={() => setIsViewBannerPosition(false)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
              >
                <FiArrowLeft className="h-[20px] w-[20px]" />
              </button>
              <span className="text-[14px] font-medium">Back to Banner Management</span>
            </div>
          </div>
          <Button className="flex items-center gap-[8px] px-[16px] py-[8px] text-white transition-colors hover:bg-primary/90">
            <FiSave className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="mt-4">
          <h1 className="text-[18px] font-bold md:text-[22px]">Manage Banner Positions</h1>
          <p className="mt-1 text-info">
            Drag and drop banners to reorder them. The first banner will be displayed at the top of
            your website.
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="border-b border-blue-100 bg-blue-50 px-[24px] py-[16px]">
        <div className="flex items-start gap-[12px]">
          <div className="rounded-lg bg-blue-100 p-[8px]">
            <FiMove className="h-[20px] w-[20px] text-blue-600" />
          </div>
          <div>
            <h3 className="mb-1 text-[14px] font-semibold text-blue-900">How to reorder banners</h3>
            <p className="text-[14px] text-blue-700">
              Click and drag the grip handle (⋮⋮) on the left side of each banner card to reorder
              them. Your changes will be saved automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Cards Container */}
      <div className="p-[24px]">
        <div className="space-y-4">
          {banners.map((banner, index) => (
            <div
              key={banner._id}
              className="group cursor-move rounded-[5px] border border-border-main bg-white transition-all duration-200"
            >
              <div className="flex items-center gap-[16px] p-[16px]">
                {/* Drag Handle */}
                <div className="flex-shrink-0 cursor-grab p-2 text-gray-400 hover:text-info active:cursor-grabbing">
                  <FaGripVertical className="h-6 w-6" />
                </div>

                {/* Position Number */}
                <div className="flex-shrink-0">
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[5px] bg-gradient-to-br from-primary to-primary/80 text-[18px] font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Banner Image - Large */}
                <div className="flex-shrink-0">
                  <div className="relative h-[112px] w-[192px] overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-50">
                    <Image
                      src={banner.thumbnail || "/placeholder.svg"}
                      alt={banner.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                  </div>
                </div>

                {/* Banner Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-[8px] truncate text-lg font-semibold capitalize">
                        {banner.name}
                      </h3>

                      <div className="mb-[12px] flex items-center gap-3">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[14px] font-medium ${
                            banner.active
                              ? "border border-green-200 bg-green-100 text-green-800"
                              : "border border-red-200 bg-red-100 text-red-800"
                          }`}
                        >
                          {banner.active ? (
                            <>
                              <FiEye className="mr-1.5 h-4 w-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <FiEyeOff className="mr-1.5 h-4 w-4" />
                              Inactive
                            </>
                          )}
                        </span>

                        {/* Link Badge */}
                        {banner.hyperLink && banner.hyperLink !== "#" && (
                          <span className="inline-flex items-center rounded-full border border-border-main bg-gray-100 px-3 py-1 text-[14px] text-gray-700">
                            🔗 Has Link
                          </span>
                        )}
                      </div>

                      {/* Link URL */}
                      {banner.hyperLink && banner.hyperLink !== "#" && (
                        <div className="text-[14px] text-gray-500">
                          <span className="font-medium">Link:</span>{" "}
                          <span className="inline-block max-w-xs truncate align-bottom">
                            {banner.hyperLink}
                          </span>
                        </div>
                      )}

                      {/* Created Date */}
                      {banner.createdAt && (
                        <div className="mt-2 text-xs text-gray-400">
                          Created:{" "}
                          {new Date(banner.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>

                    {/* Move Indicators */}
                    <div className="ml-4 flex flex-col items-center gap-1">
                      <div className="h-1 w-8 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300" />
                      <div className="h-1 w-6 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300" />
                      <div className="h-1 w-4 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Drag Indicator Line */}
              <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {banners.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-[24px] flex h-[96px] w-[96px] items-center justify-center rounded-full bg-gray-100">
              <FiMove className="h-[48px] w-[48px] text-info" />
            </div>
            <h3 className="mb-2 text-[20px] font-semibold">No banners to manage</h3>
            <p className="mx-auto mb-[24px] max-w-sm text-info">
              Create some banners first to manage their positions and display order.
            </p>
            <button className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90">
              Create Your First Banner
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border-main bg-gray-50 px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-info">
            Total banners: <span className="font-semibold">{banners.length}</span>
          </div>
          <div className="text-[14px] text-info">Changes are saved automatically</div>
        </div>
      </div>
    </div>
  );
};

export default ManageBannerPosition;
