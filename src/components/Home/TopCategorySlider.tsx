"use client";

import { ICategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TopCategorySlider = ({ categories }: { categories: ICategory[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [xOffset, setXOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;

    if (!container || !inner) return;

    const handleWheel = (e: WheelEvent) => {
      const innerWidth = inner.scrollWidth;
      const containerWidth = container.offsetWidth;
      const maxTranslate = Math.max(innerWidth - containerWidth, 0);

      if (maxTranslate <= 0) return;

      const delta = e.deltaY;
      const next = xOffset - delta;

      // Clamp scroll within bounds
      const clamped = Math.min(0, Math.max(-maxTranslate, next));

      const atLeftEdge = xOffset === 0;
      const atRightEdge = xOffset === -maxTranslate;

      const scrollingRight = delta > 0;
      const scrollingLeft = delta < 0;

      // Only prevent default if we can scroll horizontally in that direction
      const shouldScroll = (scrollingRight && !atRightEdge) || (scrollingLeft && !atLeftEdge);

      if (container.matches(":hover") && shouldScroll) {
        e.preventDefault();
        setXOffset(clamped);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [xOffset]);

  return (
    <div ref={containerRef} className="scrollbar-hide relative w-full overflow-x-auto">
      <div
        ref={innerRef}
        style={{
          transform: `translateX(${xOffset}px)`,
          transition: "transform 0.4s",
        }}
        className="mt-[16px] flex items-center justify-start gap-[24px]"
      >
        {categories?.map((category) => (
          <Link
            href={`/shop/${category.slug}`}
            key={category._id}
            className="group block w-fit shrink-0 overflow-hidden rounded-lg transition-all duration-300"
          >
            <div className="relative mx-auto aspect-square h-[100px] w-[100px] overflow-hidden rounded-md md:h-[189px] md:w-[189px]">
              <Image
                src={category.thumbnail || "/images/home/top-categories/top-categories3.jpg"}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="line-clamp-1 px-[6px] py-[6px] text-center">
              <h3 className="font-medium">{category.label}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategorySlider;
