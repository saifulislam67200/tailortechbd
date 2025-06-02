"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import type { IOrderItem } from "@/types/order";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: IOrderItem | null;
  onUpdate: (updatedItem: IOrderItem) => void;
  isLoading: boolean;
}

export default function EditModal({ isOpen, onClose, item, onUpdate, isLoading }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: item?.product?.name || "",
    quantity: item?.quantity || 1,
    color: item?.color || "",
    size: item?.size || "",
    price: item?.product?.price || 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const updatedItem: IOrderItem = {
      ...item,
      product: {
        ...item.product,
        name: formData.name,
        price: formData.price,
      },
      quantity: formData.quantity,
      color: formData.color,
      size: formData.size,
    };

    onUpdate(updatedItem);
  };

  // Update form data when item changes
  React.useEffect(() => {
    if (item) {
      setFormData({
        name: item.product?.name || "",
        quantity: item.quantity || 1,
        color: item.color || "",
        size: item.size || "",
        price: item.product?.price || 0,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg scale-100 transform transition-all duration-300">
        <div className="overflow-hidden border border-gray-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Edit Product</h3>
                <p className="mt-1 text-sm">Update product information</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 transition-colors duration-200 hover:bg-black/30"
              >
                <MdClose className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                {/* Product Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-dashboard focus:ring-2 focus:ring-dashboard/20 focus:outline-none"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Quantity and Price Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-dashboard focus:ring-2 focus:ring-dashboard/20 focus:outline-none"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price (BDT) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={Math.round(formData.price)}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-dashboard focus:ring-2 focus:ring-dashboard/20 focus:outline-none"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Color and Size Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-dashboard focus:ring-2 focus:ring-dashboard/20 focus:outline-none"
                      placeholder="e.g., Red, Blue"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-dashboard focus:ring-2 focus:ring-dashboard/20 focus:outline-none"
                      placeholder="e.g., M, L, XL"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-dashboard to-dashboard/90 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-dashboard/90 hover:to-dashboard hover:shadow-xl focus:ring-2 focus:ring-dashboard/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
