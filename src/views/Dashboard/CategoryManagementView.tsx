"use client";

import CategorryStatistics from "@/components/Dashboard/CategoryManagement/CategorryStatistics";
import { CategoryTree } from "@/components/Dashboard/CategoryManagement/CategoryTree";
import CreateCategory from "@/components/Dashboard/CategoryManagement/CreateCategory";
import DeleteCategory from "@/components/Dashboard/CategoryManagement/DeleteCategory";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import Button from "@/components/ui/Button";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { TCategoryWithSubcategories } from "@/types/category";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

function CategoryManagementView() {
  const [searchQuery, setSearchQuery] = useState({ mode: "tree", searchTerm: "", page: 1 });

  const { data, isLoading, refetch } = useGetAllCategoriesQuery(searchQuery);
  const [activeTab, setActiveTab] = useState("tree");
  const [categories, setCategories] = useState<TCategoryWithSubcategories[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const categoryData = data?.data || [];
      setCategories((prevCategories) => [...prevCategories, ...categoryData]);
    }
    return () => {
      setCategories([]);
    };
  }, [isLoading]);

  // Flatten categories for easier manipulation

  const handleCateogryActionChange = async () => {
    setSearchQuery({ mode: "tree", searchTerm: "", page: 1 });
    const data = await refetch();
    const categoryData = data?.data?.data || [];
    setCategories(categoryData);
  };

  return (
    <div className="w-full">
      <div className="mb-[20px] flex flex-col justify-between gap-[16px] md:mb-[32px] md:flex-row md:items-center">
        <DashboardPageHeadingTitle title="Category Management" />
        <CreateCategory>
          <button className="md:text-[]16px] flex w-full max-w-[157px] cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[14px] text-white">
            <FaPlus />
            Add Category
          </button>
        </CreateCategory>
      </div>

      {/* Stats */}
      <CategorryStatistics />

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-border-main">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("tree")}
              className={`flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-medium ${
                activeTab === "tree"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              Tree View
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`border-b-2 px-1 py-2 text-sm font-medium ${
                activeTab === "list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              List View
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {isLoading ? (
        <div className="center h-[200px] w-full bg-white p-[16px]">
          <span className="text-[20px] font-[700] text-primary">
            Categories loading please wait...
          </span>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      ) : (
        <>
          {activeTab === "tree" && (
            <div className="rounded-lg border border-border-main bg-white">
              <div className="border-b border-border-main p-6">
                <h2 className="text-lg font-semibold">Category Hierarchy</h2>
                <p className="mt-1 text-sm text-info">
                  View and manage your categories in a tree structure
                </p>
              </div>
              <div className="py-[16px]">
                <CategoryTree
                  categories={categories}
                  onDelete={handleCateogryActionChange}
                  onAddSubcategory={handleCateogryActionChange}
                  onUpdate={handleCateogryActionChange}
                />
              </div>
              {categories.length !== (data?.meta.totalDoc || 0) ? (
                <Button
                  className="mx-auto mb-[20px] w-fit"
                  onClick={() => {
                    setSearchQuery({ ...searchQuery, page: searchQuery.page + 1 });
                  }}
                >
                  Load more
                </Button>
              ) : (
                ""
              )}
            </div>
          )}

          {activeTab === "list" && (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="rounded-lg border border-border-main bg-white p-4"
                >
                  <div className="flex flex-col justify-between sm:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <Image
                        width={32}
                        height={32}
                        src={category.thumbnail || "/images/category_blank.png"}
                        alt={category.label}
                        className="h-10 w-10 rounded-lg object-cover"
                        onError={(e) => (e.currentTarget.src = "/images/category_blank.png")}
                      />
                      <div>
                        <h3 className="font-medium">{category.label}</h3>
                        <p className="text-sm text-gray-500">/{category.slug}</p>
                        {category.parent && (
                          <p className="text-xs text-gray-400">
                            Parent:{" "}
                            {categories.find((c) => c._id === category.parent)?.label || "Unknown"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-500">
                        {category.subCount} subcategories
                      </span>
                      <CreateCategory onSuccess={handleCateogryActionChange}>
                        <button className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800 transition-colors hover:bg-green-200">
                          Add Sub
                        </button>
                      </CreateCategory>

                      <DeleteCategory
                        category={category}
                        onDelete={() => handleCateogryActionChange()}
                      ></DeleteCategory>
                    </div>
                  </div>
                </div>
              ))}
              {categories.length !== (data?.meta.totalDoc || 0) ? (
                <Button
                  className="mx-auto mb-[20px] w-fit"
                  onClick={() => {
                    setSearchQuery({ ...searchQuery, page: searchQuery.page + 1 });
                  }}
                >
                  Load more
                </Button>
              ) : (
                ""
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryManagementView;
