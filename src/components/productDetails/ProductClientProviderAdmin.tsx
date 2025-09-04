"use client";

import { IColor, IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import ProductDetailsSlider from "./ProductDetailSlider";
import ProductSizeChart from "./ProductSizeChart";

const getColorsWithStock = (product: IProduct) => {
  if (!product || !product.colors) {
    return [];
  }

  return product.colors.map((color) => {
    const totalStock = color.sizes.reduce((sum, size) => sum + size.stock, 0);
    return {
      color: color.color,
      stock: totalStock,
      sizes: color.sizes.map((size) => ({
        size: size.size,
        stock: size.stock,
      })),
    };
  });
};

const ProductClientProviderAdmin = ({
  product,
  children,
}: {
  children: React.ReactNode;
  product: IProduct;
  slug: string;
}) => {
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();

  const colorsWithStock = getColorsWithStock(product);

  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className="ml-7 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>
      <div className="main_container w-full px-[16px] py-[10px]">
        <div className="mt-[10px] grid grid-cols-9 gap-[10px]">
          <div className="col-span-9 lg:col-span-3">
            <ProductDetailsSlider
              product={product}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
            />
          </div>
          <section className="col-span-9 w-full bg-white px-[10px] py-[10] md:px-[20px] lg:col-span-6">
            {children}
            <ProductSizeChart chart={product?.chart} className="w-full 2xl:max-w-[800px]" />

            <div className="mt-5 w-full bg-white">
              <h2 className="text-2xl font-bold text-gray-800">Stock Info</h2>

              <table className="w-full border border-slate-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Color
                    </th>
                    <th className="border border-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Total Stock
                    </th>
                    <th className="border border-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Sizes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {colorsWithStock.map((colorData, index) => {
                    const totalStock = colorData.sizes.reduce((sum, size) => sum + size.stock, 0);
                    const hasStock = totalStock > 0;

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* Color */}
                        <td className="border border-slate-300 px-4 py-2">
                          <span className="capitalize">{colorData.color}</span>
                        </td>

                        {/* Total Stock */}
                        <td className="border border-slate-300 px-4 py-2">
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium ${
                              hasStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {hasStock ? `${totalStock} in stock` : "Out of stock"}
                          </span>
                        </td>

                        {/* Sizes */}
                        <td className="border border-slate-300 px-4 py-2">
                          <div className="flex flex-wrap gap-2">
                            {colorData.sizes.map((size, sizeIndex) => (
                              <span
                                key={sizeIndex}
                                className={`rounded px-2 py-1 text-xs font-medium ${
                                  size.stock > 0
                                    ? "border border-green-200 bg-green-50 text-green-700"
                                    : "border border-gray-200 bg-gray-50 text-gray-500"
                                }`}
                              >
                                {size.size.toUpperCase()} ({size.stock})
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Summary footer */}
              <div className="mt-8 flex flex-wrap items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-600">
                      {colorsWithStock.filter((c) => c.stock > 0).length} colors in stock
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                    <span className="text-sm text-gray-600">
                      {colorsWithStock.filter((c) => c.stock === 0).length} colors out of stock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductClientProviderAdmin;
