"use client";

import { pageScroll } from "@/utils";
import { useState } from "react";

const ScrollDetailsSection = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div className="items-cente sticky top-[75px] z-[2] flex">
      {[
        { label: "Details", id: "product-description" },
        { label: "Q&A", id: "question-answer-form" },
        { label: "Reviews", id: "customer-review-form" },
      ]?.map((item, index) => (
        <button
          onClick={() => {
            pageScroll(item.id);
            setCurrentTab(index);
          }}
          key={index + "tab"}
          className={`flex h-[35px] cursor-pointer items-center justify-center border border-quaternary px-[20px] text-[16px] font-bold ${index == currentTab ? "bg-primary text-white" : "bg-white text-primary"} `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ScrollDetailsSection;
