"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

const ProductDetailsSlider = ({ product }: { product: IProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [...product?.images];

  console.log(product, "from product details slider");

  return (
    <section className="bg-white px-[10px] py-[14px] md:px-[20px]">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:items-start lg:gap-[20px] xl:gap-[30px]">
        {/* thumbnail images ,vertical on desktop, horizontal on mobile */}
        <div className="mt-[5px] lg:w-[80px]">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="horizontal"
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="thumbnail-slider h-[80px] w-full gap-[90px] overflow-x-scroll lg:h-auto lg:gap-[20px]"
            breakpoints={{
              1024: {
                direction: "vertical",
                spaceBetween: 16,
                slidesPerView: 4,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {images?.map((img, index) => (
              <SwiperSlide key={index} className="!h-[80px] !w-[80px]">
                <div
                  className={`relative h-[60px] w-[60px] cursor-pointer overflow-hidden border p-[5px] transition-all duration-300 md:h-[80px] md:w-[80px] ${activeIndex === index ? "border-info-light" : "border-transparent"}`}
                >
                  <Image
                    src={img}
                    width={80}
                    height={200}
                    className="h-full w-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                    priority={index < 2}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* main Image */}
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
          className="main-slider h-full w-full overflow-hidden"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          initialSlide={activeIndex}
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full border border-info-light p-[5px] lg:p-[0px] 2xl:min-h-[655px] 2xl:max-w-[730px]">
                <Image
                  src={img}
                  width={1000}
                  height={1000}
                  className="w-full object-cover object-center 2xl:min-h-[655px]"
                  alt={`Product image ${index + 1}`}
                  priority={index < 2}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductDetailsSlider;
