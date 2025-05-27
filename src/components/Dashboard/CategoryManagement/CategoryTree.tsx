"use client";

import { TCategoryWithSubcategories } from "@/types/category";
import { useState } from "react";
import DeleteCategory from "./DeleteCategory";

interface CategoryTreeProps {
  categories: TCategoryWithSubcategories[];
  onDelete: (id: string) => void;
  onToggleDisplay: (id: string) => void;
  onAddSubcategory: (parentId: string) => void;
}

const RenderCategory: React.FC<{
  category: TCategoryWithSubcategories;
  parentCategory?: TCategoryWithSubcategories;
  level?: number;
}> = ({ category, level = 0, parentCategory }) => {
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

        <img
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
            {!category.display && level === 0 && (
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
          <button
            className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-green-100"
            title="Add subcategory"
          >
            <svg
              className="h-4 w-4 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          {level === 0 ? (
            <button
              className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-gray-200"
              title={category.display ? "Hide category" : "Show category"}
            >
              {category.display ? (
                <svg
                  className="h-4 w-4 text-success"
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
              ) : (
                <svg
                  className="h-4 w-4 text-red-600"
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
              )}
            </button>
          ) : (
            ""
          )}
          <DeleteCategory category={category} parentCategory={parentCategory} />
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {category.subcategories?.map((child) => (
            <RenderCategory
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
export function CategoryTree({ categories }: CategoryTreeProps) {
  return (
    <div className="space-y-1">
      {categories.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No categories found. Create your first category to get started.</p>
        </div>
      ) : (
        categories.map((category) => <RenderCategory key={category._id} category={category} />)
      )}
    </div>
  );
}
