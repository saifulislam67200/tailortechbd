import { products } from "@/mock/FakeProducts";
import SubCategoryCard from "./SubCategoryCard";

const SubCategory = () => {
  return (
    <section className="main_container py-[16px]">
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products?.map((item) => <SubCategoryCard key={item._id} product={item} />)}
      </div>
    </section>
  );
};

export default SubCategory;
