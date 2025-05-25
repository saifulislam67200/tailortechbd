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
import MagnifierPortal from "../ui/MagnifierPortal";

const ProductDetailsSlider = ({
  product,
  selectedColor,
}: {
  product: Pick<IProduct, "images" | "colors">;
  selectedColor: IColor | undefined;
}) => {
  const ZOOM_LEVEL = 2.5;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType>(null);

  const colorImages: string[] = product.colors?.flatMap((c) => c?.images || []) || [];
  const images = [...product.images, ...colorImages];

  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);
  const [currentZoomImg, setCurrentZoomImg] = useState("");

  useEffect(() => {
    if (selectedColor?.images?.length) {
      const firstColorImage = selectedColor.images[0];
      const newIndex = images.findIndex((img) => img === firstColorImage);
      if (newIndex !== -1) {
        swiperRef.current?.slideTo(newIndex);
      }
    }
  }, [selectedColor, images]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const imgEl = e.currentTarget.querySelector("img");
    if (imgEl) {
      const rect = imgEl.getBoundingClientRect();
      setImageSize({ width: rect.width, height: rect.height });
      setImageRect(rect);
      setCurrentZoomImg((imgEl as HTMLImageElement).src);
      setZoomable(true);
      updatePosition(e);
    }
  };

  const handleMouseLeave = () => {
    setZoomable(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e);
  };

  const updatePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const imgEl = e.currentTarget.querySelector("img");
    if (!imgEl) return;
    const rect = imgEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const zoomedWidth = rect.width * ZOOM_LEVEL;
    const zoomedHeight = rect.height * ZOOM_LEVEL;

    let bgX = -x * ZOOM_LEVEL + rect.width / 2;
    let bgY = -y * ZOOM_LEVEL + rect.height / 2;

    // Clamp background position
    bgX = Math.max(Math.min(bgX, 0), rect.width - zoomedWidth);
    bgY = Math.max(Math.min(bgY, 0), rect.height - zoomedHeight);

    setPosition({ x: bgX, y: bgY });
  };

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
          className="main-slider h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="group flex w-full cursor-crosshair flex-col items-center justify-center gap-4 lg:flex-row"
              >
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

      {/* Magnifier rendered through portal */}
      <MagnifierPortal
        className="hidden lg:block"
        show={zoomable}
        imageUrl={currentZoomImg}
        width={imageSize.width}
        height={imageSize.height}
        position={position}
        targetRect={imageRect}
        zoom={ZOOM_LEVEL}
      />
    </section>
  );
};

export default ProductDetailsSlider;
