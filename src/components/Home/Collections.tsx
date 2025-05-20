import React from "react";
import Title from "../ui/Title";
import Image from "next/image";
import { FiShoppingCart, FiRefreshCw, FiHeart, FiEye } from "react-icons/fi";

const Collections = () => {
  // Sample data - replace with your actual data
  const collections = [
    {
      id: 1,
      title: "Gaming Laptops Gaming Laptops ",
      description: "High performance laptops for professional gamers ",
      price: "85,000 ",
      image: "/images/home/collections/laptop.webp"
    },
    {
      id: 2,
      title: "Office Solutions",
      description: "Complete setup for your office productivity",
      price: "35,000 ",
      image: "/images/home/collections/collection2.webp"
    },
    {
      id: 3,
      title: "Student Essentials",
      description: "Ugreen LP862 (45376) Magnetic Desktop Phone Stand",
      price: "25,000",
      image: "/images/home/collections/collection3.webp"
    },
    {
      id: 4,
      title: "Premium Monitors",
      description: "Ultra HD and 4K monitors for professionals",
      price: "15,000 ",
      image: "/images/home/collections/collection4.webp"
    },
    {
      id: 5,
      title: "Storage Devices",
      description: "SSD, HDD and portable storage solutions",
      price: "2,500 ",
      image: "/images/home/collections/collection5.webp"
    },
    {
      id: 6,
      title: "Accessories Combo",
      description: "Keyboard, mouse and headphone bundles",
      price: "1,500",
      image: "/images/home/collections/collection6.webp"
    },
    {
      id: 7,
      title: "Gaming Laptops",
      description: "High performance laptops for professional gamers ",
      price: "85,000 ",
      image: "/images/home/collections/laptop.webp"
    },
    {
      id: 8,
      title: "Office Solutions",
      description: "Complete setup for your office productivity",
      price: "35,000",
      image: "/images/home/collections/collection2.webp"
    },
    {
      id: 9,
      title: "Student Essentials",
      description: "Affordable devices for students",
      price: "25,000",
      image: "/images/home/collections/collection3.webp"
    },
    {
      id: 10,
      title: "Premium Monitors",
      description: "Ultra HD and 4K monitors for professionals",
      price: "15,000",
      image: "/images/home/collections/collection4.webp"
    },
    {
      id: 11,
      title: "Storage Devices",
      description: "SSD, HDD and portable storage solutions",
      price: "2,500",
      image: "/images/home/collections/collection5.webp"
    },
    {
      id: 12,
      title: "Accessories Combo",
      description: "Keyboard, mouse and headphone bundles",
      price: "1,500",
      image: "/images/home/collections/collection6.webp"
    },
  ];

  return (
    <section className="w-full py-[16px]">
      <Title title="Collections" className="!text-[14px]" />
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {collections.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Icons */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiShoppingCart className="text-gray-700 text-sm" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiRefreshCw className="text-gray-700 text-sm" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="text-gray-700 text-sm" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiEye className="text-gray-700 text-sm" />
                </button>
              </div>
            </div>
            
            {/* Content section */}
            <div className="p-[8px]">
              <h3 className="font-bold text-[14px] line-clamp-1 text-center hover:text-[#0d6efd]">{item.title}</h3>
              <p className="text-[13px] text-center mt-1 line-clamp-2">{item.description}</p>
              <p className="font-bold text-[14px] text-center text-strong mt-2">Tk {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;