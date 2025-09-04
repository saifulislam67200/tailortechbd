"use client";

import { TCategoryWithSubcategories } from "@/types/category";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";

interface CategoryTreeProps {
  categories: TCategoryWithSubcategories[];
  onDelete: (id: string) => void;
  onAddSubcategory: (parentId: string) => void;
  onUpdate: (id: string) => void;
}

interface SubcategoryItemProps {
  category: TCategoryWithSubcategories;
  parentCategory?: TCategoryWithSubcategories;
  level?: number;
  onDelete: (id: string) => void;
  onAddSubcategory: (parentId: string) => void;
  onUpdate: (id: string) => void;
}

const RenderCategory: React.FC<SubcategoryItemProps> = ({
  category,
  level = 0,
  parentCategory,
  onUpdate,
  onAddSubcategory,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = category.subcategories && category.subcategories.length > 0;

  return (
    <div key={category._id} className="space-y-1">
      <div
        className="group flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-primary/5"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-gray-200"
          >
            {isExpanded ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}

        <Image
          width={32}
          height={32}
          src={category.thumbnail || "/images/category_blank.png"}
          alt={category.label}
          className="h-8 w-8 rounded object-cover"
          onError={(e) => (e.currentTarget.src = "/images/category_blank.png")}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium text-gray-900">{category.label}</span>
            {!category.display && (
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">Hidden</span>
            )}
            {hasChildren && (
              <span className="rounded-full border border-blue-200 bg-blue-100 px-2 py-1 text-xs text-blue-600">
                {category.subCount}
              </span>
            )}
          </div>
          <p className="truncate text-xs text-gray-500">/{category.slug}</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <CreateCategory parent={category} onSuccess={onAddSubcategory}>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors hover:bg-success/10"
              title="Add subcategory"
            >
              <FaPlus className="text-success" />
            </button>
          </CreateCategory>

          <UpdateCategory
            categoryId={category._id}
            onSuccess={onAddSubcategory}
            defaultValue={category}
          >
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors hover:bg-success/10"
              title="update subcategory"
            >
              <MdEdit className="text-success" />
            </button>
          </UpdateCategory>

          <DeleteCategory onDelete={onDelete} category={category} parentCategory={parentCategory} />
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {category.subcategories?.map((child) => (
            <RenderCategory
              onUpdate={onUpdate}
              onAddSubcategory={onAddSubcategory}
              onDelete={onDelete}
              level={level + 1}
              key={child._id}
              category={child}
              parentCategory={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export function CategoryTree({
  categories,
  onAddSubcategory,
  onDelete,
  onUpdate,
}: CategoryTreeProps) {
  return (
    <div className="space-y-1">
      {categories.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No categories found. Create your first category to get started.</p>
        </div>
      ) : (
        categories.map((category) => (
          <RenderCategory
            key={category._id}
            onUpdate={onUpdate}
            category={category}
            onAddSubcategory={onAddSubcategory}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
