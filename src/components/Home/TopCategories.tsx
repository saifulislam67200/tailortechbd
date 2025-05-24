import { baseUrl } from "@/redux/api/api";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import Title from "../ui/Title";
// import { useGetAllCategoriesQuery } from "@/redux/category/category.api";

interface Category {
  _id: string;
  label: string;
  thumbnail: string;
  slug: string;
}

const TopCategories: FC = async () => {
  const res = await fetch(`${baseUrl}/category/get?display=true`, {
    next: {
      revalidate: 60 * 5,
    },
  });

  const data = (await res.json()) as { data: Category[] };

  return (
    <section className="bg-white py-[10px]">
      <Title title="Top Categories" className="text-[14px]" />

      {/* Mobile/Tablet */}
      <div className="mt-[16px] flex gap-[10px] overflow-x-auto pb-[16px] lg:hidden">
        {data.data?.map((category) => (
          <Link
            href={`/shop/${category.slug}`}
            key={category._id}
            className="group flex w-[100px] flex-shrink-0 flex-col items-center md:w-[110px]"
          >
            <div className="relative aspect-square w-[100px] overflow-hidden rounded-md">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="line-clamp-1 px-[6px] py-[6px] text-center">
              <h3 className="text-[14px] font-medium">{category.label}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <div className="mt-[16px] hidden grid-cols-8 gap-[24px] lg:grid">
        {data?.data?.map((category) => (
          <Link
            href={`/shop/${category.slug}`}
            key={category._id}
            className="group block overflow-hidden rounded-lg transition-all duration-300"
          >
            <div className="relative mx-auto aspect-square max-w-[150px] overflow-hidden rounded-md 2xl:max-w-[180px]">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="line-clamp-1 px-[6px] py-[6px] text-center">
              <h3 className="font-medium">{category.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
