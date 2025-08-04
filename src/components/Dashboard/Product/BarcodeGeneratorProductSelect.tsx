"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { IColor, IProduct, ISize } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";
import { PiBarcodeLight } from "react-icons/pi";
import { toast } from "sonner";
import BarcodeGenerator from "./BarcodeGenerator";

interface BarcodeGeneratorProductSelectProps {
  product: Pick<
    IProduct,
    "_id" | "colors" | "images" | "name" | "price" | "discount" | "slug" | "sku"
  >;
}

const BarcodeGeneratorProductSelect = ({ product }: BarcodeGeneratorProductSelectProps) => {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<IColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
      if (product.colors[0]?.sizes?.length) {
        setSelectedSize(product.colors[0].sizes[0]);
      }
    }
  }, [product]);

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color);
    setSelectedSize(color.sizes?.[0] || null);
  };

  const handleGenerateBarcode = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size");
      return;
    }
    setIsSelectionModalOpen(false);
    setIsBarcodeModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => setIsSelectionModalOpen(true)}
        className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
      >
        <PiBarcodeLight size={20} />
      </button>

      {/* Selection Modal */}
      <DialogProvider
        state={isSelectionModalOpen}
        setState={setIsSelectionModalOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="text-[20px] font-[700] text-strong">Select Variant</h5>
            <button
              onClick={() => setIsSelectionModalOpen(false)}
              className="cursor-pointer text-lg"
            >
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[20px]" />

          <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
            <div className="relative aspect-square w-full max-w-[200px] shrink-0 md:w-[300px]">
              <Image
                src={
                  selectedColor?.images?.[0] || product?.images?.[0] || "/images/category_blank.png"
                }
                alt={product?.name || "Product image"}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-[10px]">
              <h3 className="line-clamp-2 text-[20px] font-[700]">{product?.name}</h3>

              {/* Color Selection */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-[700]">Select color:</span>
                <div className="flex flex-wrap items-center justify-start gap-[8px]">
                  {product?.colors?.map((color, i) => (
                    <button
                      onClick={() => handleColorSelect(color)}
                      key={color?.color + i}
                      className={`min-w-[60px] cursor-pointer border px-3 py-1 text-sm ${
                        selectedColor?.color === color.color
                          ? "border-primary bg-primary text-white"
                          : "border-border-muted"
                      }`}
                    >
                      {color?.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex w-full flex-col gap-[5px]">
                <span className="font-[700]">Select Size:</span>
                <div className="flex flex-wrap items-center justify-start gap-[8px]">
                  {selectedColor?.sizes?.map((size) => (
                    <button
                      key={size._id}
                      type="button"
                      className={`h-[36px] min-w-[50px] cursor-pointer px-3 text-sm font-medium transition-all ${
                        selectedSize?.size === size.size
                          ? "bg-primary text-white"
                          : "border border-gray-300 bg-white text-black"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                disabled={!selectedColor || !selectedSize}
                onClick={handleGenerateBarcode}
                className="mt-5 w-full py-3 text-base"
              >
                Generate Barcode
              </Button>
            </div>
          </div>
        </div>
      </DialogProvider>

      {/* Barcode Generator Modal */}
      {selectedColor && selectedSize && (
        <BarcodeGenerator
          price={product?.price || "N/A"}
          discount={product?.discount || "0"}
          brandName="Tallortech"
          autoDownload={false}
          isOpen={isBarcodeModalOpen}
          onClose={() => setIsBarcodeModalOpen(false)}
        />
      )}
    </>
  );
};

export default BarcodeGeneratorProductSelect;
