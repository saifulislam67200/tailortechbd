"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const leftImages = [
    "/images/home/banner/banner1.png",
    "/images/home/banner/banner2.png",
    "/images/home/banner/banner3.png",
  ];

  return (
    <div className="mt-[16px]">
      <div className="flex flex-col gap-[8px] lg:flex-row">
        {/* Left Side - Main Banner */}
        <div className="w-full bg-white">
          <div className="relative mb-[8px] aspect-[834.66/407] w-full lg:h-[434.7px]">
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
              {leftImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
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
            {leftImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSlide(index);
                  swiperRef.current?.slideToLoop(index);
                }}
                className={`h-[3px] w-[30px] cursor-pointer lg:h-[3px] lg:w-[40px] ${
                  activeSlide === index ? "bg-black" : "bg-[#878787]"
                }`}
                aria-label={`slide-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
