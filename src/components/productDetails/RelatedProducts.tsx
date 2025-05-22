import { products } from "@/mock/FakeProducts";
import Title from "../ui/Title";
import ProductCard from "../Home/Collections/ProductCard";

const RelatedProducts = () => {
  return (
    <div className="mt-[15px] w-full">
      <Title title="RELATED PRODUCTS" className="!text-[14px]" />

      <div className="my-[15px] grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products?.slice(0, 6)?.map((item) => <ProductCard key={item._id} product={item} />)}
      </div>
    </div>
  );
};

export default RelatedProducts;
