import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-md border border-gray-100 bg-white">
      {/* Image */}
      <div className="aspect-square w-full bg-gray-200" />

      {/* Content */}
      <div className="space-y-2 p-2">
        {/* Title skeleton */}
        <div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />

        {/* Description */}
        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="mx-auto h-3 w-4/5 rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="mx-auto h-4 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default CardSkeleton;
