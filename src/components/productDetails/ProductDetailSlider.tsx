"use client";
import { IColor, IProduct } from "@/types/product";
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
  setSelectedColor,
}: {
  product: Pick<IProduct, "images" | "colors">;
  selectedColor: IColor | undefined;
  setSelectedColor: (color: IColor | undefined) => void;
}) => {
  const ZOOM_LEVEL = 2.5;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType>(null);

  const colorImages: string[] = product.colors?.flatMap((c) => c?.images || []) || [];
  const images = [...product.images, ...colorImages];

  const [zoomable, setZoomable] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedColor?.images?.length) {
      const firstColorImage = selectedColor.images[0];
      const newIndex = images.findIndex((img) => img === firstColorImage);
      if (newIndex !== -1) {
        swiperRef.current?.slideTo(newIndex);
      }
    }
  }, [selectedColor, images]);

  const handleMouseEnter = () => {
    setZoomable(true);
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setImageSize({ width: rect.width, height: rect.height });
    }
  };

  const handleMouseLeave = () => {
    setZoomable(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
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
          onSlideChange={() => {
            setSelectedColor(undefined);
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="group flex w-full cursor-crosshair flex-col items-center justify-center gap-4 lg:flex-row">
                <div
                  ref={imageContainerRef}
                  className="relative aspect-square h-full max-h-[600px] w-full border border-info-light p-[5px] lg:p-[0px]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    className="h-full w-full bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: zoomable
                        ? `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`
                        : "contain",
                      backgroundPosition: zoomable
                        ? `${-cursorPos.x * ZOOM_LEVEL + imageSize.width / 2}px ${-cursorPos.y * ZOOM_LEVEL + imageSize.height / 2}px`
                        : "center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      height: "100%",
                    }}
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
