"use client";
import { IColor, IProduct } from "@/types/product";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassPlusLight } from "react-icons/pi";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

const ZoomableLightboxImage = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const ZOOM = 2;
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent toggle if it was a drag
    if (dragStart) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setOrigin(`${x}% ${y}%`);
    setTranslate({ x: 0, y: 0 });
    setZoomed((z) => !z);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!zoomed) return;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomed || !dragStart) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setTranslate((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragStart={(e) => e.preventDefault()}
      className={`flex items-center justify-center overflow-hidden ${zoomed ? "h-full w-full" : "h-fit w-fit"}`}
      style={{ cursor: zoomed ? "grab" : "zoom-in" }}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoomable"
        draggable={false}
        className="pointer-events-none select-none"
        style={{
          transformOrigin: origin,
          transform: zoomed
            ? `scale(${ZOOM * 1.5}) translate(${translate.x / ZOOM}px, ${translate.y / ZOOM}px)`
            : "scale(1) translate(0px, 0px)",
          transition: dragStart ? "none" : "transform 0.25s ease",
          maxWidth: zoomed ? "100%" : "700px",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const LightboxModal = ({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicked directly on the backdrop
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!open) return null;
  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#000000a8]"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 cursor-pointer rounded bg-white px-3 py-1 text-black"
      >
        ✕
      </button>

      <button>
        {/* zoom in button */}
        <PiMagnifyingGlassPlusLight />
      </button>

      <ZoomableLightboxImage src={active} />
    </div>
  );
};

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

  const [lightBoxImage, setLightBoxImage] = useState<string | undefined>(undefined);

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
    <>
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
                <div className="group relative flex w-full cursor-crosshair flex-col items-center justify-center gap-4 lg:flex-row">
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
                  <button
                    onClick={() => setLightBoxImage(lightBoxImage ? undefined : img)}
                    className="center group/fullscreen absolute bottom-5 left-5 h-[30px] w-[30px] cursor-pointer rounded-full border-[1px] border-border-main bg-white hover:bg-black"
                  >
                    <Image
                      src="/images/fullscreenicon.webp"
                      width={15}
                      height={15}
                      alt="Zoom In"
                      className="group-hover/fullscreen:invert"
                    />
                  </button>
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

        <LightboxModal
          open={!!lightBoxImage}
          active={lightBoxImage!}
          onClose={() => setLightBoxImage(undefined)}
        />
      </section>
    </>
  );
};

export default ProductDetailsSlider;
