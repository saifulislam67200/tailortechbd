"use client";

import { CategoryTree } from "@/components/Dashboard/CategoryManagement/CategoryTree";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

export interface ICategory {
  _id: string;
  label: string;
  slug: string;
  thumbnail?: string;
  subCount: number;
  parent?: string;
  display: boolean;
}

function CategoryManagementView() {
  const { data } = useGetAllCategoriesQuery({ mode: "tree" });
  const [activeTab, setActiveTab] = useState("tree");

  const categories = data?.data || [];

  // Flatten categories for easier manipulation

  const handleDeleteCategory = (id: string) => {
    console.log(id);
  };

  const handleToggleDisplay = (id: string) => {
    console.log(id);
  };

  const handleAddSubcategory = (parentId: string) => {
    console.log(parentId);
  };

  const totalVisible = categories.filter((category) => category.display).length;
  const totalHidden = categories.filter((category) => !category.display).length;

  return (
    <div className="w-full p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Category Management</h1>
          <p className="mt-1 text-gray-600">
            Manage your product categories and their hierarchical structure
          </p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white">
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <span className="rounded-lg bg-blue-100 p-2">
              <IoIosMenu className="h-[24px] w-[24px] text-blue-600" />
            </span>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{data?.meta.totalDoc}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visible</p>
              <p className="text-2xl font-bold text-gray-900">{totalVisible}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-yellow-100 p-2">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hidden</p>
              <p className="text-2xl font-bold text-gray-900">{totalHidden}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Root Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
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
      {activeTab === "tree" && (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Category Hierarchy</h2>
            <p className="mt-1 text-sm text-gray-600">
              View and manage your categories in a tree structure
            </p>
          </div>
          <div className="p-6">
            <CategoryTree
              categories={categories}
              onDelete={handleDeleteCategory}
              onToggleDisplay={handleToggleDisplay}
              onAddSubcategory={handleAddSubcategory}
            />
          </div>
        </div>
      )}

      {activeTab === "list" && (
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={category.thumbnail || "/images/category_blank.png"}
                    alt={category.label}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{category.label}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                    {category.parent && (
                      <p className="text-xs text-gray-400">
                        Parent:{" "}
                        {categories.find((c) => c._id === category.parent)?.label || "Unknown"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{category.subCount} subcategories</span>
                  <button
                    onClick={() => handleAddSubcategory(category._id)}
                    className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-800 transition-colors hover:bg-green-200"
                  >
                    Add Sub
                  </button>
                  <button
                    className={`rounded px-3 py-1 text-sm font-medium ${
                      category.display ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {category.display ? "Visible" : "Hidden"}
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-800 transition-colors hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryManagementView;
