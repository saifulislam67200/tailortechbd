"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  const nextIndentClass = `px-${(level + 1) * 4}`;

  return (
    <div className={`relative flex h-fit flex-col ${indentClass}`}>
      {hasChildren ? (
        <button
          onMouseEnter={() => onToggle(subcategory._id)}
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
      {/*   */}
      {hasChildren && isExpanded && (
        <div className="absolute top-0 left-full z-50 min-w-[250px] border border-border-muted bg-white px-4 py-2 shadow-lg">
          <div className={nextIndentClass}>
            <Link
              href={`/shop/${subcategory.slug}`}
              className={`hover_underline block w-fit py-1 text-sm font-[700] text-primary transition-colors duration-200`}
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

  const { data } = useGetAllCategoriesQuery({ mode: "tree" });
  const categoryData = data?.data || [];
  const displayedCategories = categoryData.filter((category) => category.display);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (categoryId: string) => {
    setActiveMenu(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setExpandedItems(new Set());
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

  // Close on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setExpandedItems(new Set());
      }
    };

    const handleScroll = () => {
      setActiveMenu(null);
      setExpandedItems(new Set());
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="hidden items-center justify-center bg-white py-[10px] shadow-md lg:flex">
      <div className="ml-10 flex items-baseline gap-[30px]" ref={menuRef}>
        {displayedCategories.map((category) => (
          <div
            key={category._id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(category._id)}
          >
            {category.subCount && category.subcategories?.length ? (
              <button className="hover_underline flex cursor-pointer items-center py-2 text-[16px] font-[600] tracking-[1px] text-primary transition-colors duration-200">
                {category.label.toUpperCase()}
                <BiChevronDown className="ml-1 h-4 w-4" />
              </button>
            ) : (
              <Link
                href={`/shop/${category.slug}`}
                className="hover_underline flex cursor-pointer items-center py-2 text-[16px] font-[600] tracking-[1px] text-primary transition-colors duration-200"
              >
                {category.label.toUpperCase()}
              </Link>
            )}

            {/*   */}
            {category.subcategories?.length && activeMenu === category._id ? (
              <div
                className="fixed top-[141px] left-[50%] z-50 mt-0 w-[800px] translate-x-[-50%] border border-border-muted bg-white shadow-lg"
                onMouseLeave={handleMouseLeave}
              >
                {/* here is the issue */}
                <div className="grid w-full auto-rows-min grid-cols-3 gap-[10px] p-6">
                  <Link
                    href={`/shop/${category.slug}`}
                    className="hover_underline block h-fit w-fit self-start text-[14px] font-[600] text-primary transition-colors duration-200 hover:text-muted"
                  >
                    ALL {category.label.toUpperCase()}
                  </Link>
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory._id} className="self-start">
                      <SubcategoryItem
                        subcategory={subcategory}
                        level={0}
                        expandedItems={expandedItems}
                        onToggle={handleToggle}
                      />
                    </div>
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
