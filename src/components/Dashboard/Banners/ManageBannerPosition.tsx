"use client";

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
      <div className="border-b border-border-main bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="center mb-5 gap-[8px]">
              <button
                onClick={() => setIsViewBannerPosition(false)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
              >
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium">Back to Banner Management</span>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90">
            <FiSave className="h-4 w-4" />
            Save Changes
          </button>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">Manage Banner Positions</h1>
          <p className="mt-1 text-gray-600">
            Drag and drop banners to reorder them. The first banner will be displayed at the top of
            your website.
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="border-b border-blue-100 bg-blue-50 px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <FiMove className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="mb-1 text-sm font-semibold text-blue-900">How to reorder banners</h3>
            <p className="text-sm text-blue-700">
              Click and drag the grip handle (⋮⋮) on the left side of each banner card to reorder
              them. Your changes will be saved automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Cards Container */}
      <div className="p-6">
        <div className="space-y-4">
          {banners.map((banner, index) => (
            <div
              key={banner._id}
              className="group cursor-move rounded-xl border-2 border-border-main bg-white transition-all duration-200"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Drag Handle */}
                <div className="flex-shrink-0 cursor-grab p-2 text-gray-400 hover:text-gray-600 active:cursor-grabbing">
                  <FaGripVertical className="h-6 w-6" />
                </div>

                {/* Position Number */}
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Banner Image - Large */}
                <div className="flex-shrink-0">
                  <div className="relative h-28 w-48 overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-50 shadow-sm">
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
                      <h3 className="mb-2 truncate text-lg font-semibold text-gray-900">
                        {banner.name}
                      </h3>

                      <div className="mb-3 flex items-center gap-3">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
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
                          <span className="inline-flex items-center rounded-full border border-border-main bg-gray-100 px-3 py-1 text-sm text-gray-700">
                            🔗 Has Link
                          </span>
                        )}
                      </div>

                      {/* Link URL */}
                      {banner.hyperLink && banner.hyperLink !== "#" && (
                        <div className="text-sm text-gray-500">
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
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <FiMove className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No banners to manage</h3>
            <p className="mx-auto mb-6 max-w-sm text-gray-600">
              Create some banners first to manage their positions and display order.
            </p>
            <button className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90">
              Create Your First Banner
            </button>
          </div>
        )}

        {/* Drop Zones Indicator */}
        {banners.length > 0 && (
          <div className="mt-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
            <div className="text-center text-gray-500">
              <FiMove className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">Drop zone - Drag banners here to reorder</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border-main bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Total banners: <span className="font-semibold">{banners.length}</span>
          </div>
          <div className="text-sm text-gray-500">Changes are saved automatically</div>
        </div>
      </div>
    </div>
  );
};

export default ManageBannerPosition;
