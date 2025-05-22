"use client";
import { useState } from "react";
// import { categories } from "@/mock/category";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";
import { IoHome } from "react-icons/io5";
import { useGetAllCategoriesQuery } from "@/redux/category/category.api";

interface CategoryAccordionProps {
  setIsOpen: (open: boolean) => void;
}

const CategoryAccordion = ({ setIsOpen }: CategoryAccordionProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const { data } = useGetAllCategoriesQuery({
  mode: "tree",
});
  const categories = data?.data;

  return (
    <div className="mx-auto w-full md:max-w-4xl">
      <div className="p-[8px]">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <IoHome color="#fff" />
        </Link>
      </div>

      <div className="border-y border-[#464646]">
        {categories?.map((category) => (
          <div key={category._id} className="group">
            <button
              onClick={() => toggleCategory(category._id)}
              className="flex w-full items-center justify-between p-[8px] text-left text-white transition-colors"
            >
              <span className="flex items-center text-[13px] font-medium text-white">
                {category.label}
              </span>
              <PlusIcon size="size-4" />
            </button>

            {expandedCategories[category._id] && category.subcategories && (
              <div className="px-6 py-2 text-white">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory._id}
                      href={`/shop/${subcategory.slug}`}
                      className="flex items-center space-x-3 rounded-lg transition-all hover:bg-white hover:shadow-sm"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-white">{subcategory.label}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAccordion;
