import ProductSecondaryCardSkeleton from "../ui/Skeleton/ProductSecondaryCardSkeleton";
import Title from "../ui/Title";

const ProductsFallback = ({ title }: { title: string }) => {
  return (
    <section className="w-full py-[16px]">
      <Title title={title || "Collections"} className="text-[14px]" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
        <ProductSecondaryCardSkeleton />
      </div>
    </section>
  );
};

export default ProductsFallback;
