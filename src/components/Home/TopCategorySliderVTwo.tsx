"use client";
import { ICategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import "swiper/css";
import "swiper/css/navigation";

const TopCategorySliderVTwo = ({ categories }: { categories: ICategory[] }) => {
  return (
    <div className="relative w-full overflow-hidden pt-[20px]">
      <Marquee>
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={`/shop/${category.slug}`}
            className="group ml-[20px] block w-fit shrink-0 overflow-hidden rounded-lg transition-all duration-300"
          >
            <div className="relative mx-auto aspect-square h-[100px] w-[100px] overflow-hidden rounded-md md:h-[189px] md:w-[189px]">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100px, 189px"
              />
            </div>
            <div className="line-clamp-1 px-[6px] py-[6px] text-center">
              <h3 className="font-medium">{category.label}</h3>
            </div>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default TopCategorySliderVTwo;
