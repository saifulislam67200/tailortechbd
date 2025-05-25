import { twMerge } from "tailwind-merge";

const ProductPrimaryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <span
      className={twMerge(
        "flex animate-pulse flex-col overflow-hidden rounded-lg border border-skeleton bg-white",
        className
      )}
    >
      {/* Product Image Skeleton */}
      <span className="h-48 w-full bg-skeleton"></span>

      {/* Product Details */}
      <span className="space-y-3 p-4">
        {/* Product Name */}
        <span className="bgskele block h-5 w-3/4 rounded"></span>

        {/* Color */}
        <span className="space-y-2">
          <span className="block h-4 w-1/2 rounded bg-skeleton"></span>
        </span>

        {/* Size */}
        <span className="space-y-2">
          <span className="block h-4 w-1/3 rounded bg-skeleton"></span>
        </span>

        {/* Price */}
        <span className="block h-6 w-1/4 rounded bg-skeleton"></span>

        {/* Add to Cart Button */}
        <span className="mt-4 block h-10 w-full rounded bg-skeleton"></span>
      </span>
    </span>
  );
};

export default ProductPrimaryCardSkeleton;
