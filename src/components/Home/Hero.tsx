"use client";

import Image from "next/image";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const leftImages = ["/images/home/banner/banner1.png", "/images/home/banner/banner2.png", "/images/home/banner/banner3.png",];

  return (
    <div className="mt-[16px]">
      <div className="flex flex-col gap-[8px] lg:flex-row">
        {/* Left Side - Main Banner */}
        <div className="w-full">
          <div className="relative mb-[4px] aspect-[834.66/250] w-full">
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
      </div>
    </div>
  );
};

export default Hero;
