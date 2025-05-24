"use client";
import { IColor, IProduct } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

const ProductDetailsSlider = ({
  product,
  selectedColor,
}: {
  product: Pick<IProduct, "images" | "colors">;
  selectedColor: IColor | undefined;
}) => {
  console.log("selectedColor", selectedColor);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const colorImages: string[] = product.colors?.flatMap((c) => c?.images || []) || [];
  const images = [...product.images, ...colorImages];

  // 🔁 Update active index on color change
  useEffect(() => {
    if (selectedColor?.images?.length) {
      const firstColorImage = selectedColor.images[0];
      const newIndex = images.findIndex((img) => img === firstColorImage);
      if (newIndex !== -1) setActiveIndex(newIndex);
    }
  }, [selectedColor, images]);

  return (
    <section className="bg-white px-[10px] py-[14px] md:px-[20px]">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:items-start lg:gap-[20px] xl:gap-[30px]">
        {/* Thumbnails */}
        <div className="mt-[5px] h-fit w-full overflow-hidden md:max-h-[350px] lg:w-fit 2xl:max-h-[655px]">
          <div className="overflow-x-auto lg:w-[80px] lg:overflow-x-hidden lg:overflow-y-auto">
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="horizontal"
              spaceBetween={4}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="thumbnail-slider h-[80px] w-full gap-[90px] overflow-x-scroll lg:h-auto lg:gap-[20px]"
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                  direction: "vertical",
                },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className="!h-[80px] !w-[80px]">
                  <div
                    className={`relative h-[60px] w-[60px] cursor-pointer overflow-hidden border p-[5px] transition-all duration-300 md:h-[80px] md:w-[80px] ${activeIndex === index ? "border-info-light" : "border-transparent"}`}
                  >
                    <Image
                      src={img || "/"}
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
        </div>

        {/* Main Image */}
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
          className="main-slider h-full w-full overflow-hidden"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          initialSlide={activeIndex}
        >
          {images.map((img, index) => (
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
