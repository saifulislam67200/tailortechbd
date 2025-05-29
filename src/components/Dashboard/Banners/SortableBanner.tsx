"use client";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TBanner } from "./ManageBannerPosition";
import { FaGripVertical } from "react-icons/fa";

const SortableBanner = ({ banner, index }: { banner: TBanner; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver, active } =
    useSortable({
      id: banner._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 100 : 0,
  };

  const isActiveDragging = active?.id === banner._id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-[5px] border transition-all duration-200 ${
        isDragging
          ? "scale-[1.01] border-primary bg-white/90 shadow-lg"
          : isOver && !isActiveDragging
            ? "border-blue-300 bg-blue-50/50"
            : "border-border-main bg-white"
      }`}
    >
      {/* Drag Preview Effect */}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 rounded-[5px] border-2 border-primary bg-primary/10" />
      )}

      {/* Drop Indicator */}
      {isOver && !isActiveDragging && (
        <div className="pointer-events-none absolute inset-0 rounded-[5px] border-2 border-dashed border-blue-300 bg-blue-100/30" />
      )}

      <div className="flex items-center gap-[10px] p-[16px] lg:gap-[16px]">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={`flex-shrink-0 p-1 text-info/50 transition-colors duration-200 hover:text-info/80 lg:p-2 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <FaGripVertical className="h-6 w-6" />
        </div>

        {/* Position Number */}
        <div className="flex-shrink-0">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] bg-gradient-to-br from-primary to-primary/80 text-[18px] font-bold text-white shadow-sm lg:h-[48px] lg:w-[48px]">
            {index + 1}
          </div>
        </div>

        {/* Banner Image - Large */}
        <div className="flex-shrink-0">
          <div className="relative h-[90px] w-[140px] overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-50 lg:h-[112px] lg:w-[192px]">
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
              <h3 className="mb-[8px] truncate text-lg font-semibold capitalize">{banner.name}</h3>

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
    </div>
  );
};

export default SortableBanner;
