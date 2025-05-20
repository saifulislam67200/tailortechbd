"use client"

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

const categories: Category[] = [
  {
    _id: "1",
    label: "Women's Fashion Women's Fashion",
    thumbnail: "/images/home/top-categories/top-categories1.jpg",
    slug: "womens-fashion",
  },
  {
    _id: "2",
    label: "Men's Collection",
    thumbnail: "/images/home/top-categories/top-categories2.jpg",
    slug: "mens-collection",
  },
  {
    _id: "3",
    label: "Kids Wear",
    thumbnail: "/images/home/top-categories/top-categories3.jpg",
    slug: "kids-wear",
  },
  {
    _id: "4",
    label: "Accessories",
    thumbnail: "/images/home/top-categories/top-categories4.jpg",
    slug: "accessories",
  },
  {
    _id: "5",
    label: "Footwear",
    thumbnail: "/images/home/top-categories/top-categories2.jpg",
    slug: "footwear",
  },
  {
    _id: "6",
    label: "Bags & Purses",
    thumbnail: "/images/home/top-categories/top-categories1.jpg",
    slug: "bags-purses",
  },
  {
    _id: "7",
    label: "Bags & Purses",
    thumbnail: "/images/home/top-categories/top-categories3.jpg",
    slug: "bags-purses",
  },
  {
    _id: "8",
    label: "Bags & Purses",
    thumbnail: "/images/home/top-categories/top-categories2.jpg",
    slug: "bags-purses",
  },
];


const TopCategories: FC = () => {
  // const { data } = useGetAllCategoriesQuery({
  //   mode: "tree",
  // });
  // const categories = data?.data;
  return (
    <section className="bg-white py-[10px]">
      <Title title="Top Categories" linkText="See all categories" href="/categories" />

      {/* Mobile/Tablet */}
      <div className="mt-[16px] flex gap-[10px] overflow-x-auto pb-[16px] lg:hidden">
        {categories?.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category._id}
            className="group flex w-[100px] md:w-[110px] flex-shrink-0 flex-col items-center"
          >
            <div className="relative aspect-square overflow-hidden rounded-md w-[100px]">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="line-clamp-1 py-[6px] px-[6px] text-center">
              <h3 className="text-[14px] font-medium ">{category.label}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop */}
      <div className="mt-[16px] hidden gap-[24px] lg:grid grid-cols-8">
        {categories?.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category._id}
            className="group block overflow-hidden rounded-lg transition-all duration-300"
          >
            <div className="relative mx-auto aspect-square overflow-hidden rounded-md max-w-[150px] 2xl:max-w-[180px]">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="line-clamp-1 py-[6px] px-[6px] text-center">
              <h3 className="font-medium">{category.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;






// const TopCategories: FC = () => {
//   // const { data } = useGetAllCategoriesQuery({
//   //   mode: "tree",
//   // });
//   // const categories = data?.data;
//   return (
//     <section className="bg-white py-[30px]">
//       <Title title="Top Categories" linkText="See all categories" href="/categories" />

//       <div className="mt-[16px] grid grid-cols-2 gap-[16px] md:grid-cols-3 md:gap-6 lg:grid-cols-8">
//         {categories?.map((category) => (
//           <Link
//             href={`/category/${category.slug}`}
//             key={category._id}
//             className="group block overflow-hidden rounded-lg transition-all duration-300"
//           >
//             <div className="relative mx-auto aspect-square w-full max-w-[150px] overflow-hidden rounded-md">
//               <Image
//                 src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
//                 alt={category.label}
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//             <div className="line-clamp-1 py-[8px] px-[6px] text-center">
//               <h3 className="font-medium ">{category.label}</h3>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TopCategories;
