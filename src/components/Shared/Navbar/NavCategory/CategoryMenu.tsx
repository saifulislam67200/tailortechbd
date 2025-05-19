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
                className="group/category flex items-center gap-[5px] px-1 pt-1 text-sm text-[16px] font-bold text-white"
              >
                {category.label}
              </Link>

              {/* Dropdown for subcategories */}
              {hasSubCategories ? (
                <div className="invisible absolute left-0 z-50 mt-[12px] grid w-full grid-cols-1 bg-background px-[20px] opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.subcategories?.map((subCategory, i) => (
                    <Link
                      key={subCategory._id + i}
                      href={`/category/${category.slug}/${subCategory.slug}?label=${category.label}&subLabel=${subCategory.label}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
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
