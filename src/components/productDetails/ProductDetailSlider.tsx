"use client";
import { IColor, IProduct } from "@/types/product";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import Image from "next/image";
import Link from "next/link";
import { RiPlayLargeFill } from "react-icons/ri";

interface ZoomableImageProps {
  src: string;
  zoomLevel?: number;
  width?: number;
  height?: number;
}

const ZoomableImage = ({ src, width = 1200, height = 1200 }: ZoomableImageProps) => {
  return (
    <Link
      href={src}
      data-pswp-width={width}
      data-pswp-height={height}
      className="group/zoomable relative aspect-square h-full max-h-[600px] w-full cursor-zoom-in border border-info-light p-[5px] lg:p-[0px]"
    >
      <Image
        src={src}
        width={831}
        height={598}
        alt="product image"
        className="relative z-[1] aspect-[831/598] w-full object-contain"
      />
    </Link>
  );
};

const ProductDetailsSlider = ({
  product,
  selectedColor,
  setSelectedColor,
}: {
  product: Pick<IProduct, "images" | "colors" | "video">;
  selectedColor: IColor | undefined;
  setSelectedColor: (color: IColor | undefined) => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType>(null);

  const colorImages: string[] = product.colors?.flatMap((c) => c?.images || []) || [];
  const images = [...product.images, ...colorImages];

  useEffect(() => {
    if (selectedColor?.images?.length) {
      const firstColorImage = selectedColor.images[0];
      const newIndex = images.findIndex((img) => img === firstColorImage);
      if (newIndex !== -1) {
        swiperRef.current?.slideTo(newIndex);
      }
    }
  }, [selectedColor, images]);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#product-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
      // pswpModule: PhotoSwipe,
      secondaryZoomLevel: 2.5,
      initialZoomLevel: 0.8,
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <section className="bg-white px-[10px] py-[14px] md:px-[20px]">
      <div
        id="product-gallery"
        className="flex flex-col items-center lg:items-start lg:gap-[20px] xl:gap-[30px]"
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs]}
          spaceBetween={10}
          className="main-slider h-full w-full"
          onSlideChange={() => {
            setSelectedColor(undefined);
          }}
        >
          {product.video ? (
            <SwiperSlide>
              <div className="group flex w-full cursor-zoom-in flex-col items-center justify-center gap-4 lg:flex-row">
                <video
                  src={product.video}
                  className="group/zoomable relative aspect-square h-full max-h-[600px] w-full cursor-zoom-in border border-info-light p-[5px] lg:p-[0px]"
                  controls
                />
              </div>
            </SwiperSlide>
          ) : (
            ""
          )}
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="group flex w-full cursor-zoom-in flex-col items-center justify-center gap-4 lg:flex-row">
                <ZoomableImage src={img} />
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
          {product.video ? (
            <SwiperSlide className="!h-[90px] !w-[80px] border-[1px] border-transparent [&.swiper-slide-thumb-active>.thumb]:border-primary">
              <div className="thumb relative h-[60px] w-[60px] cursor-pointer overflow-hidden border border-transparent p-[5px] transition-all duration-300 md:h-[80px] md:w-[80px]">
                <video src={product.video} className="h-full w-full object-cover" />
                <RiPlayLargeFill className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[30px] text-white" />
              </div>
            </SwiperSlide>
          ) : (
            ""
          )}
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="!h-[90px] !w-[80px] border-[1px] border-transparent [&.swiper-slide-thumb-active>.thumb]:border-primary"
            >
              <div className="thumb relative h-[60px] w-[60px] cursor-pointer overflow-hidden border border-transparent p-[5px] transition-all duration-300 md:h-[80px] md:w-[80px]">
                <img
                  src={img || "/"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                  alt={`Thumbnail ${index + 1}`}
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
