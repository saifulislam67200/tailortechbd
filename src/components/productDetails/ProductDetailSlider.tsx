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


const ProductDetailsSlider = ({ ...product }: IProduct) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        "/macbook.jpeg",
        "/macbook.jpeg",
        "/macbook.jpeg"
    ];


    console.log(product, "from product details slider")


    return (
        <section className=" bg-white pl-[5px] pr-[5px] xl:pl-[30px] xl:pr-[20px] 2xl:pl-[60px] 2xl:pr-[55px] pt-[14px]">
            <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row lg:gap-[20px] xl:gap-[90px]">
                {/* thumbnail images ,vertical on desktop, horizontal on mobile */}
                <div className="lg:w-[80px] mt-[5px]">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="horizontal"
                        spaceBetween={12}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="thumbnail-slider h-[80px] w-full lg:gap-[20px] gap-[90px] lg:h-auto overflow-x-scroll"
                        breakpoints={{
                            1024: {
                                direction: "vertical",
                                spaceBetween: 16,
                                slidesPerView: 4,
                            },
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index} className="!h-[80px] !w-[80px]">
                                <div className={`relative h-[60px] md:h-[80px] w-[60px] md:w-[80px] cursor-pointer overflow-hidden  border transition-all duration-300  p-[5px] ${activeIndex === index ? "border-info-light" : "border-transparent"}`}>
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
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full 2xl:max-w-[600px] xl:min-h-[593px] h-full border border-info-light p-[5px] lg:p-[0px]">
                                <Image
                                    src={img}
                                    width={2000}
                                    height={2000}
                                    className="object-cover w-full xl:min-h-[593px] object-center"
                                    alt={`Product image ${index + 1}`}
                                    priority={index < 2}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <h1 className="pt-[16px] pb-[50px]">N.B. Image may differ with actual products layout, color, size & dimension. No claim will be accepted for image mismatch. Product data used in this website is based solely on its manufacturer provided information, authenticity and accuracy are their responsibility only.</h1>
        </section>
    );
};

export default ProductDetailsSlider;
