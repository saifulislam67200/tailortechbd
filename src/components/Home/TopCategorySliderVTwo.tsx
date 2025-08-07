"use client";
import { ICategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const TopCategorySliderVTwo = ({ categories }: { categories: ICategory[] }) => {
  return (
    <div className="relative pt-[20px]">
      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={4000}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="top-category-version-two-swiper"
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id} className="!w-fit">
            <Link
              href={`/shop/${category.slug}`}
              className="group block w-fit shrink-0 overflow-hidden rounded-lg transition-all duration-300"
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ======= custom styles for Swiper elements =====> */}
      <style jsx global>{`
        .top-category-version-two-swiper {
          padding: 8px 4px;
        }
        .top-category-version-two-swiper .swiper-slide {
          width: fit-content;
        }
        .top-category-version-two-swiper .swiper-button-prev,
        .top-category-version-two-swiper .swiper-button-next {
          color: #868585;
          background: rgba(255, 255, 255, 0.9);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .top-category-version-two-swiper .swiper-button-prev:hover,
        .top-category-version-two-swiper .swiper-button-next:hover {
          opacity: 1;
        }
        .top-category-version-two-swiper .swiper-button-prev {
          left: 10px;
        }
        .top-category-version-two-swiper .swiper-button-next {
          right: 10px;
        }
        .top-category-version-two-swiper .swiper-button-prev::after,
        .top-category-version-two-swiper .swiper-button-next::after {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default TopCategorySliderVTwo;
