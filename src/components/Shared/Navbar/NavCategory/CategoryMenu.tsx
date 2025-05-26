"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import Link from "next/link";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface SubcategoryItemProps {
  subcategory: ICategory;
  level: number;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
}

function SubcategoryItem({ subcategory, level, expandedItems, onToggle }: SubcategoryItemProps) {
  const isExpanded = expandedItems.has(subcategory._id);
  const hasChildren = subcategory.subcategories?.length ? true : false;
  const indentClass = `px-${level * 4}`;

  return (
    <div className={`relative flex h-fit flex-col ${indentClass}`}>
      {hasChildren ? (
        <button
          onClick={() => onToggle(subcategory._id)}
          className={`flex w-full cursor-pointer items-center justify-between py-1 text-left text-sm text-primary transition-colors duration-200`}
        >
          <span className={`hover_underline w-fit`}>{subcategory.label.toUpperCase()}</span>
          <BiChevronDown
            className={`text-[18px] font-[700] text-primary transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
      ) : (
        <Link
          href={`/shop/${subcategory.slug}`}
          className={`hover_underline hover_underline block w-fit py-1 text-sm text-primary transition-colors duration-200`}
        >
          {subcategory.label.toUpperCase()}
        </Link>
      )}

      {/* Nested Subcategories */}
      {/*  */}
      {hasChildren && isExpanded && (
        <div className="animate-in slide-in-from-top-2 mt-[8px] flex flex-col gap-2 bg-primary/10 py-[8px] duration-200">
          <div className={`px-${(level + 1) * 4}`}>
            <Link
              href={`/shop/${subcategory.slug}`}
              className={`hover_underline hover_underline block w-fit py-1 text-sm text-primary transition-colors duration-200`}
            >
              All {subcategory.label}
            </Link>
          </div>

          {subcategory.subcategories?.map((nestedSub) => (
            <SubcategoryItem
              key={nestedSub._id}
              subcategory={nestedSub}
              level={level + 1}
              expandedItems={expandedItems}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const CategoryMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const { data } = useGetAllCategoriesQuery({
    mode: "tree",
  });
  const categoryData = data?.data || [];

  // Filter only displayed categories
  const displayedCategories = categoryData.filter((category) => category.display);

  const handleMouseEnter = (categoryId: string) => {
    setActiveMenu(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setExpandedItems(new Set()); // Reset all expanded items when leaving menu
  };

  const handleToggle = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="hidden items-center justify-center bg-white py-[10px] shadow-md lg:flex">
      <div className="ml-10 flex items-baseline gap-[30px]">
        {displayedCategories.map((category) => (
          <div
            key={category._id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category._id)}
          >
            {category.subCount ? (
              <button className="hover_underline flex cursor-pointer items-center py-2 text-[16px] font-[500] tracking-[1px] text-primary transition-colors duration-200">
                {category.label.toUpperCase()}
                {category.subCount > 0 && <BiChevronDown className="ml-1 h-4 w-4" />}
              </button>
            ) : (
              <Link
                href={`/shop/${category.slug}`}
                className="hover_underline flex cursor-pointer items-center py-2 text-[16px] font-[500] tracking-[1px] text-primary transition-colors duration-200"
              >
                {category.label.toUpperCase()}
              </Link>
            )}

            {/* Mega Menu Dropdown */}
            {/* activeMenu === category._id && */}
            {category.subcategories?.length && activeMenu === category._id ? (
              <div
                className="fixed top-[173px] left-[50%] z-50 mt-0 max-h-[50vh] w-[800px] translate-x-[-50%] overflow-y-auto border border-border-muted bg-white shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                <div className="grid w-full grid-cols-3 gap-[10px] p-6">
                  {/* All Category Link */}
                  <Link
                    href={`/shop/${category.slug}`}
                    className="hover_underline block h-fit w-fit text-[14px] font-[600] text-primary transition-colors duration-200 hover:text-muted"
                  >
                    ALL {category.label.toUpperCase()}
                  </Link>

                  {/* Subcategories */}
                  {category.subcategories.map((subcategory) => (
                    <SubcategoryItem
                      key={subcategory._id}
                      subcategory={subcategory}
                      level={0}
                      expandedItems={expandedItems}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
