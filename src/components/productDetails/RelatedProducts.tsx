"use client";
import { useGetRelatedProuctsByProductSlugQuery } from "@/redux/features/product/product.api";
import Title from "../ui/Title";
import TopProductCard from "../ui/Card/ProductCard/TopProductCard";
const RelatedProducts = ({ slug }: { slug: string }) => {
  const { data } = useGetRelatedProuctsByProductSlugQuery({ slug, limit: 6 });

  const products = data?.data;
  return (
    <div className="w-full md:max-w-[432px]">
      <Title title="RELATED PRODUCTS" className="!text-[14px]" />

      <div className="mt-[10px] w-full space-y-[10px]">
        {products?.map((item) => <TopProductCard key={item._id} product={item} />)}
      </div>
    </div>
  );
};

export default RelatedProducts;
