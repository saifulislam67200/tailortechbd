"use client";
import { categories } from "@/mock/category";
import Link from "next/link";
const CategoryMenu = () => {
  return (
    <div className="hidden items-center justify-center bg-black pb-[12px] lg:flex">
      <div className="flex gap-[16px] sm:ml-[24px] sm:space-x-[20px]">
        {categories.map((category) => {
          const hasSubCategories = category?.subcategories?.length;

          return (
            <div key={category._id} className="group">
              <Link
                href={`/category/${category.slug}?label=${category.label}`}
                className="group/category text-[16px] flex items-center gap-[5px] px-1 pt-1 text-sm font-bold text-white"
              >
                {category.label}
              </Link>

              {/* Dropdown for subcategories */}
              {hasSubCategories ? (
                <div className="invisible absolute left-0 z-50 mt-[12px] w-full bg-background opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[20px]">
                  {category.subcategories?.map((subCategory) => (
                    <Link
                      key={subCategory._id}
                      href={`/category/${category.slug}/${subCategory.slug}?label=${category.label}&subLabel=${subCategory.label}`}
                      className="block px-4 py-2 text-sm  hover:bg-gray-100"
                      role="menuitem"
                    >
                      {subCategory.label}
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;
