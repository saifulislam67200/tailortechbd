"use client";
import { IColor, IProduct } from "@/types/product";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const swiperRef = useRef<SwiperType>(null);

  const colorImages: string[] = product.colors?.flatMap((c) => c?.images || []) || [];
  const images = [...product.images, ...colorImages];

  // 🔁 Update active index on color change
  useEffect(() => {
    if (selectedColor?.images?.length) {
      const firstColorImage = selectedColor.images[0];
      const newIndex = images.findIndex((img) => img === firstColorImage);
      console.log(newIndex, "fasdf");

      if (newIndex !== -1) {
        swiperRef.current?.slideTo(newIndex);
      }
    }
  }, [selectedColor, images]);

  return (
    <section className="bg-white px-[10px] py-[14px] md:px-[20px]">
      <div className="flex flex-col items-center lg:items-start lg:gap-[20px] xl:gap-[30px]">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          spaceBetween={10}
          className="main-slider h-full w-full overflow-hidden"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square h-full max-h-[600px] w-full border border-info-light p-[5px] lg:p-[0px]">
                <Image
                  src={img}
                  width={1000}
                  height={1000}
                  className="mx-auto h-full w-auto max-w-full object-contain"
                  alt={`Product image ${index + 1}`}
                  priority={index < 2}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          direction="horizontal"
          spaceBetween={4}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbnail-slider w-full overflow-x-scroll"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="!h-[90px] !w-[80px] border-[1px] border-transparent [&.swiper-slide-thumb-active>.thumb]:border-primary"
            >
              <div className="thumb relative h-[60px] w-[60px] cursor-pointer overflow-hidden border border-transparent p-[5px] transition-all duration-300 md:h-[80px] md:w-[80px]">
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
    </section>
  );
};

export default ProductDetailsSlider;
