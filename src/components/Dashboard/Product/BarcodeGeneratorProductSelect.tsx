"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { PiBarcodeLight } from "react-icons/pi";
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

  const [numberOfBarcodes, setNumberOfBarcodes] = useState<number | undefined>(40);

  const handleGenerateBarcode = () => {
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
                />{" "}
                <span className="text-[12px] text-primary/80">
                  Each A4 page holds a maximum of 40 barcodes (Avery 3651 layout – 4 columns × 100
                  rows). If more than 40 barcodes are provided, the extra barcodes will
                  automatically continue on a new page
                </span>
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
        productCode={product.sku || "N/A"}
        isOpen={isBarcodeModalOpen}
        numberOfBarcodes={numberOfBarcodes}
        onClose={() => setIsBarcodeModalOpen(false)}
      />
    </>
  );
};

export default BarcodeGeneratorProductSelect;
