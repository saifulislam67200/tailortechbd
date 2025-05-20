import { fakeProducts } from "@/mock/FakeProducts";
import Image from "next/image";
import { FaCartArrowDown, FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import Title from "../ui/Title";
const Collections = () => {
  //   const collections = [
  //     {
  //       _id: 1,
  //       name: "Gaming Laptops Gaming Laptops ",
  //       description: "High performance laptops for professional gamers ",
  //       price: "85,000 ",
  //       image: "/images/home/collections/laptop.webp"
  //     },
  //     {
  //       _id: 2,
  //       name: "Office Solutions",
  //       description: "Complete setup for your office productivity",
  //       price: "35,000 ",
  //       image: "/images/home/collections/collection2.webp"
  //     },
  //     {
  //       _id: 3,
  //       name: "Student Essentials",
  //       description: "Ugreen LP862 (45376) Magnetic Desktop Phone Stand",
  //       price: "25,000",
  //       image: "/images/home/collections/collection3.webp"
  //     },
  //     {
  //       _id: 4,
  //       name: "Premium Monitors",
  //       description: "Ultra HD and 4K monitors for professionals",
  //       price: "15,000 ",
  //       image: "/images/home/collections/collection4.webp"
  //     },
  //     {
  //       _id: 5,
  //       name: "Storage Devices",
  //       description: "SSD, HDD and portable storage solutions",
  //       price: "2,500 ",
  //       image: "/images/home/collections/collection5.webp"
  //     },
  //     {
  //       _id: 6,
  //       name: "Accessories Combo",
  //       description: "Keyboard, mouse and headphone bundles",
  //       price: "1,500",
  //       image: "/images/home/collections/collection6.webp"
  //     },
  //     {
  //       _id: 7,
  //       name: "Gaming Laptops",
  //       description: "High performance laptops for professional gamers ",
  //       price: "85,000 ",
  //       image: "/images/home/collections/laptop.webp"
  //     },
  //     {
  //       _id: 8,
  //       name: "Office Solutions",
  //       description: "Complete setup for your office productivity",
  //       price: "35,000",
  //       image: "/images/home/collections/collection2.webp"
  //     },
  //     {
  //       _id: 9,
  //       name: "Student Essentials",
  //       description: "Affordable devices for students",
  //       price: "25,000",
  //       image: "/images/home/collections/collection3.webp"
  //     },
  //     {
  //       _id: 10,
  //       name: "Premium Monitors",
  //       description: "Ultra HD and 4K monitors for professionals",
  //       price: "15,000",
  //       image: "/images/home/collections/collection4.webp"
  //     },
  //     {
  //       _id: 11,
  //       name: "Storage Devices",
  //       description: "SSD, HDD and portable storage solutions",
  //       price: "2,500",
  //       image: "/images/home/collections/collection5.webp"
  //     },
  //     {
  //       _id: 12,
  //       name: "Accessories Combo",
  //       description: "Keyboard, mouse and headphone bundles",
  //       price: "1,500",
  //       image: "/images/home/collections/collection6.webp"
  //     },
  //   ];

  return (
    <section className="w-full py-[16px]">
      <Title title="Collections" className="!text-[14px]" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {fakeProducts.map((item) => (
          <div
            key={item._id}
            className="group relative overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_0_6px_2px_rgba(33,33,33,0.2)]"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={"/"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Icons */}
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col gap-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
                  <FaCartArrowDown className="text-[15px]" />
                </button>
                <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
                  <FiRefreshCw className="text-[15px]" />
                </button>
                <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
                  <FaHeart className="text-[15px]" />
                </button>
                <button className="cursor-pointer rounded-full border border-quaternary bg-white p-[8px] shadow-md hover:bg-[#404040] hover:text-white">
                  <FaEye className="text-[15px]" />
                </button>
              </div>
            </div>

            {/* Content section */}
            <div className="p-[8px]">
              <h3 className="line-clamp-1 text-center text-[14px] font-bold hover:text-[#0d6efd]">
                {item.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-center text-[13px]">{item.description}</p>
              <p className="mt-2 text-center text-[14px] font-bold text-strong">Tk {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
