"use client";

import { IBanner } from "@/types/banner";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  banners: IBanner[];
};

const Banner = ({ banners }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="w-full bg-white">
      <div className="relative mb-[10px] aspect-[834.66/300] w-full">
        <Swiper
          loop={true}
          speed={600}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={{ width: "100%", height: "100%" }}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={banner?.thumbnail}
                  alt={`main-banner-${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-[8px]">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSlide(index);
              swiperRef.current?.slideToLoop(index);
            }}
            className={`h-[5px] w-[30px] cursor-pointer lg:h-[3px] lg:w-[40px] ${
              activeSlide === index ? "bg-black" : "bg-[#878787]"
            }`}
            aria-label={`slide-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
