
"use client";
import { useState } from 'react';
import { categories } from "@/mock/category";
import Link from "next/link";
import PlusIcon from '@/components/icons/PlusIcon';
import { IoHome } from "react-icons/io5";

interface CategoryAccordionProps {
    setIsOpen: (open: boolean) => void;
}

const CategoryAccordion = ({ setIsOpen }: CategoryAccordionProps) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="px-6 py-4">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <IoHome color="#fff" />
                </Link>
            </div>

            <div className="divide-y divide-slate-700 border-t border-b border-slate-700">
                {categories.map((category) => (
                    <div key={category._id} className="group">
                        <button
                            onClick={() => toggleCategory(category._id)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left text-white transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="font-medium text-white">{category.label}</span>
                                {category.subCount > 0 && (
                                    <span className="text-xs bg-gray-100  px-2 py-1 rounded-full">
                                        {category.subCount}
                                    </span>
                                )}
                            </div>
                            <PlusIcon size="size-4" />
                        </button>

                        {expandedCategories[category._id] && category.subcategories && (
                            <div className="px-6 py-2 text-white">
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {category.subcategories.map((subcategory) => (
                                        <Link
                                            key={subcategory._id}
                                            href={`/category/${category.slug}/${subcategory.slug}`}
                                            className="flex items-center space-x-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <div>
                                                <h3 className="text-sm font-medium text-white">{subcategory.label}</h3>
                                                {subcategory.subCount > 0 && (
                                                    <p className="text-xs text-gray-500">{subcategory.subCount} items</p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryAccordion;