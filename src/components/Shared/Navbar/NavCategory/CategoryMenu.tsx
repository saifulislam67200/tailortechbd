"use client";
// import { categories } from "@/mock/category";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import Link from "next/link";
const CategoryMenu = () => {
  const { data } = useGetAllCategoriesQuery({
    mode: "tree",
  });
  const categories = data?.data;

  return (
    <div className="hidden items-center justify-center bg-white py-[12px] shadow-md lg:flex">
      <div className="flex gap-[16px] sm:ml-[24px] sm:space-x-[20px]">
        {!categories ||
          (categories.length === 0 && (
            <span className="text-sm text-solid-slab">No categories available at the moment.</span>
          ))}

        {categories?.map((category) => {
          const hasSubCategories = category?.subcategories?.length;

          return (
            <div key={category._id} className="group">
              <Link
                href={`/shop/${category.slug}`}
                className="group/category flex items-center gap-[5px] px-1 pt-1 text-sm text-[16px] font-bold text-black"
              >
                {category.label}
              </Link>

              {/* Dropdown for subcategories */}
              {hasSubCategories ? (
                <div className="invisible absolute left-0 z-50 mt-[12px] grid w-full grid-cols-1 bg-quaternary px-[20px] opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.subcategories?.map((subCategory, i) => (
                    <Link
                      key={subCategory._id + i}
                      href={`/shop/${subCategory.slug}`}
                      className="block px-[16px] py-[4px] text-sm hover:bg-info hover:font-bold"
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
