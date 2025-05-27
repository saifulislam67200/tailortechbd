"use client";
import Image from "next/image";
import React from "react";

const recentQuestions = [
  {
    _id: 1,
    image: "/macbook.jpeg",
    product: "Is this dress true to size?",
  },
  {
    _id: 2,
    image: "/macbook.jpeg",
    product: "Are these shoes comfortable for daily wear?",
  },
  {
    _id: 3,
    image: "/macbook.jpeg",
    product: "Does this bag come with a shoulder strap?",
  },
  {
    _id: 4,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 5,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 6,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 7,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 8,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 9,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
  {
    _id: 10,
    image: "/macbook.jpeg",
    product: "Is this jacket suitable for winter?",
  },
];

const RecentQuestions = () => {
  return (
    <div className="mt-[16px] h-[700px] w-full rounded-[5px] bg-white p-[16px] xl:w-[400px] 2xl:w-[450px]">
      <h2 className="mb-[20px] text-[14px] font-bold text-primary sm:text-[16px]">
        Recent Questions
      </h2>
      <ul className="space-y-4">
        {recentQuestions?.map((item) => (
          <li key={item?._id} className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={item?.image}
                alt="Product"
                width={48}
                height={48}
                className="h-12 w-12 rounded object-cover"
              />
              <div>
                <p className="line-clamp-1 text-[12px] text-info">Product Name: {item?.product}</p>
                <p className="line-clamp-1 text-[12px] text-info">Q: {item?.product}</p>
              </div>
            </div>

            <button className="cursor-pointer text-[12px] font-semibold text-secondary hover:text-primary">
              Reply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentQuestions;
