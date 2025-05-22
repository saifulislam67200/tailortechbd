import { products } from "@/mock/FakeProducts";
import ProductSecondaryCard from "../ui/Card/ProductCard/ProductSecondaryCard";
import Title from "../ui/Title";

const RelatedProducts = () => {
  return (
    <div className="mt-[15px] w-full">
      <Title title="RELATED PRODUCTS" className="!text-[14px]" />

      <div className="my-[15px] grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products
          ?.slice(0, 6)
          ?.map((item) => <ProductSecondaryCard key={item._id} product={item} />)}
      </div>
    </div>
  );
};

export default RelatedProducts;
