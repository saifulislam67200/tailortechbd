"use client";
import { useGetRelatedProuctsByProductSlugQuery } from "@/redux/features/product/product.api";
import ProductSecondaryCard from "../ui/Card/ProductCard/ProductSecondaryCard";
import Title from "../ui/Title";
const RelatedProducts = ({ slug }: { slug: string }) => {
  const { data } = useGetRelatedProuctsByProductSlugQuery({ slug, limit: 6 });

  const products = data?.data;
  return (
    <div className="mt-[15px] w-full">
      <Title title="RELATED PRODUCTS" className="!text-[14px]" />

      <div className="my-[15px] grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products?.map((item) => <ProductSecondaryCard key={item._id} product={item} />)}
      </div>
    </div>
  );
};

export default RelatedProducts;
