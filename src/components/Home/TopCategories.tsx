import { baseUrl } from "@/redux/api/api";
import { ICategory } from "@/types/category";
import type { FC } from "react";
import Title from "../ui/Title";
// import TopCategorySlider from "./TopCategorySlider";
import TopCategorySliderVTwo from "./TopCategorySliderVTwo";

const TopCategories: FC = async () => {
  const res = await fetch(`${baseUrl}/category/get?display=true`, { cache: "no-store" });

  const data = (await res.json()) as { data: ICategory[] };

  return (
    <section className="bg-white py-[10px]">
      <Title title="Top Categories" className="text-[14px]" />

      {/* <TopCategorySlider categories={data?.data} /> */}
      <TopCategorySliderVTwo categories={data?.data} />
    </section>
  );
};

export default TopCategories;
