"use client";
import { useState } from "react";
import Link from "next/link";
import PlusIcon from "@/components/icons/PlusIcon";
import { IoHome } from "react-icons/io5";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useAppDispatch } from "@/hooks/redux";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { FiLogOut } from "react-icons/fi";

interface CategoryAccordionProps {
  setIsOpen: (open: boolean) => void;
}

const CategoryAccordion = ({ setIsOpen }: CategoryAccordionProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }));
  };

  const { data } = useGetAllCategoriesQuery({ mode: "tree" });
  const categories = data?.data;

  console.log(categories);

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    setIsOpen(false);
    await logoutUser(undefined);
    toast.success("Logout successfully");
  };

  return (
    <>
      <div className="w-full">
        <div className="p-[8px]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <IoHome color="#fff" />
          </Link>
        </div>

        <div className="border-y border-quaternary/30">
          <div className="h-[80dvh] overflow-y-auto">
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
                    <div className="flex flex-col gap-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory._id}>
                          <button
                            onClick={() => toggleSubcategory(subcategory._id)}
                            className="flex w-full items-center justify-between text-left"
                          >
                            <Link
                              href={`/shop/${subcategory.slug}`}
                              className="flex items-center space-x-3 rounded-lg text-sm font-medium text-white transition-all hover:bg-white hover:shadow-sm"
                              onClick={() => setIsOpen(false)}
                            >
                              {subcategory.label}
                            </Link>
                            {subcategory.subcategories && subcategory.subcategories?.length > 0 && (
                              <PlusIcon size="size-3" />
                            )}
                          </button>

                          {expandedSubcategories[subcategory._id] && subcategory.subcategories && (
                            <div className="mt-2 ml-4">
                              {subcategory.subcategories.map((nested) => (
                                <Link
                                  key={nested._id}
                                  href={`/shop/${nested.slug}`}
                                  className="block py-1 text-sm text-white"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {nested.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => handleLogout()}
        className="flex w-full cursor-pointer items-center space-x-[12px] px-[16px] py-[14px] text-[14px] text-white"
      >
        <FiLogOut className="h-[16px] w-[16px]" />
        <span>Logout</span>
      </button>
    </>
  );
};

export default CategoryAccordion;
