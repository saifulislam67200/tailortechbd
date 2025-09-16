"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import SelectionBox from "@/components/ui/SelectionBox";
import { IColor, IProduct } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
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
  const [numberOfBarcodes, setNumberOfBarcodes] = useState<number | undefined>(5);
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const handleGenerateBarcode = () => {
    if (!selectedColor) {
      return toast.error("Please select a valid color");
    }
    if (!selectedSize) {
      return toast.error("Please select a valid size");
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
            <h5 className="text-[20px] font-[700] text-strong">Generate Barcode</h5>
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
                src={product?.images?.[0] || "/images/category_blank.png"}
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
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[700]">Color:</span>
                  <SelectionBox
                    data={
                      product?.colors?.map((color) => ({
                        label: color.color,
                        value: color.color,
                      })) || []
                    }
                    onSelect={(e) => {
                      const color = product?.colors?.find((color) => color.color === e.value);
                      setSelectedSize(undefined);
                      setSelectedColor(color);
                    }}
                    showSearch={false}
                  />
                </div>
                {selectedColor ? (
                  <div className="flex flex-col gap-[5px]">
                    <span className="font-[700]">Size:</span>
                    <SelectionBox
                      data={selectedColor?.sizes?.map((size) => ({
                        label: size.size,
                        value: size.size,
                      }))}
                      onSelect={(e) => setSelectedSize(e.value)}
                      showSearch={false}
                      displayValue={selectedSize || "Select size"}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="flex flex-col gap-[5px]">
                  <span className="font-[700]">Number Of Barcode:</span>
                  <Input
                    type="number"
                    placeholder="Number of barcodes"
                    className="w-full"
                    defaultValue={numberOfBarcodes}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNumberOfBarcodes(value === "" ? undefined : Number(value));
                    }}
                  />
                </div>
              </div>

              <Button onClick={handleGenerateBarcode} className="mt-5 w-full py-3 text-base">
                Generate Barcode
              </Button>
            </div>
          </div>
        </div>
      </DialogProvider>

      {/* Barcode Generator Modal */}
      <BarcodeGenerator
        product={product}
        color={selectedColor?.color || ""}
        numberOfBarcodes={numberOfBarcodes}
        size={selectedSize || ""}
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
      />
    </>
  );
};

export default BarcodeGeneratorProductSelect;
