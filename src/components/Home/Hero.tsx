"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const leftImages = ["/images/home/banner1.webp", "/images/home/banner11.webp"];
  const rightImages = ["/images/home/banner2.webp", "/images/home/banner3.webp"];

  return (
    <div className="mt-[16px]">
      <div className="flex flex-col gap-[8px] lg:flex-row ">
        {/* Left Side - Main Banner */}
        <div className="w-full lg:w-2/3">
          <div className="relative mb-[4px] w-full aspect-[834.66/434.7] lg:h-[434.7px]">
            <Swiper
              style={{ width: "100%", height: "100%" }}
              spaceBetween={20}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
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
          <div className="flex justify-center gap-[8px] bg-white">
            {leftImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-[3px] w-[30px] lg:h-[3px] lg:w-[40px] ${activeSlide === index ? "bg-black" : "bg-[#878787]"}`}
                aria-label={`slide-${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side*/}
        <div className="flex w-full flex-row flex-wrap gap-[4px] md:flex-row lg:w-1/3 lg:flex-col">
          {rightImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-1 lg:w-full lg:h-[215.2px]"
            >
              <div className="relative h-full w-full aspect-[413.33/215.2]">
                <Image
                  src={image}
                  alt={`banner-${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;