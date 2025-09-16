"use client";
import DialogProvider from "@/components/ui/DialogProvider";
import { IProduct } from "@/types/product";
import html2canvas from "html2canvas-pro";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import { PiBarcodeLight } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

interface BarcodeGeneratorProps {
  product: Pick<IProduct, "_id" | "name" | "price" | "sku">;
  color: string;
  size: string;
  autoDownload?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  numberOfBarcodes?: number; // now fully supported
}

const mmToPx = (mm: number) => Math.round((mm * 96) / 25.4);

const BarcodeGenerator = ({
  autoDownload = false,
  isOpen = false,
  product,
  color,
  size,
  onClose,
  numberOfBarcodes = 1,
}: BarcodeGeneratorProps) => {
  const barcodeRef = useRef<HTMLDivElement>(null);

  // ⬇️ array of svg refs — one per label
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const barcodeValue = `${product.sku}`;
  const modalOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setModalOpen = onClose || setInternalIsOpen;

  const priceText = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(Number(product.price ?? 0));

  // ⬇️ generate for every svg present
  const generateBarcodes = async () => {
    try {
      svgRefs.current.forEach((svg) => {
        if (!svg) return;
        JsBarcode(svg, barcodeValue, {
          format: "CODE128",
          lineColor: "#000",
          width: 1.1,
          height: mmToPx(14),
          displayValue: false,
          margin: 0,
        });
      });
    } catch (e) {
      toast.error("Failed to generate barcode");
      console.error(e);
    }
  };

  const handleDownload = async () => {
    if (!barcodeRef.current || !barcodeValue) return;
    setIsGenerating(true);
    try {
      await generateBarcodes();
      await new Promise((r) => setTimeout(r, 150));

      const canvas = await html2canvas(barcodeRef.current, {
        backgroundColor: "#ffffff",
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 2480,
        height: 3508,
        foreignObjectRendering: false,
      });

      const link = document.createElement("a");
      link.download = `barcode-${product.name}-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Barcode downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download barcode. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = useReactToPrint({ contentRef: barcodeRef });

  useEffect(() => {
    if (!modalOpen) return;
    const t = setTimeout(async () => {
      await generateBarcodes();
      if (autoDownload) setTimeout(handleDownload, 300);
    }, 120);
    return () => clearTimeout(t);
    // ⬇️ include numberOfBarcodes so new SVGs get generated
  }, [modalOpen, autoDownload, product.sku, numberOfBarcodes]);

  return (
    <>
      {isOpen === undefined && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
          aria-label="Open barcode generator"
        >
          <PiBarcodeLight size={20} />
        </button>
      )}

      <DialogProvider
        setState={setModalOpen}
        state={modalOpen}
        className="w-[500px] overflow-auto rounded-[6px] bg-white shadow-lg"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Barcode Preview ({numberOfBarcodes})
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This is how your product barcode label will look. You can print or download it.
          </p>
        </div>

        {/* Print safety */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media print {
                .label { break-inside: avoid; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            `,
          }}
        />

        {/* MULTIPLE LABELS SUPPORTED */}
        <div className="max-h-[300px] overflow-auto p-6">
          <div className="flex flex-col justify-center gap-[2px]" ref={barcodeRef}>
            {Array.from({ length: numberOfBarcodes }).map((_, index) => (
              <div
                key={`barcode-${index}`}
                className="label box-border flex h-[38mm] w-[50mm] flex-col justify-between overflow-hidden rounded-[1mm] border border-gray-300 p-[1mm] shadow-sm"
              >
                {/* BRAND */}
                <div className="text-center text-[3.4mm] leading-none font-semibold">
                  Tailor Tech
                </div>

                {/* DETAILS */}
                <div className="mt-[1mm] space-y-[0.2mm] text-[2.8mm] leading-tight">
                  <span className="block max-h-[calc(1em*2.4)] overflow-hidden leading-tight">
                    Item: {product.name}
                  </span>
                  <span className="block">Colour: {color}</span>
                  <span className="block">Size: {size}</span>
                  <span className="block">Price: {priceText}</span>
                </div>

                {/* BARCODE */}
                <div className="mt-[0.6mm] flex flex-col items-center">
                  <span className="flex h-[8mm] w-full items-center justify-center overflow-hidden">
                    <svg
                      // ⬇️ store each svg in the refs array by index
                      ref={(el) => {
                        svgRefs.current[index] = el;
                      }}
                      className="block w-full"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </span>
                  <span className="mt-[0.6mm] w-full truncate text-center font-mono text-[2.6mm] leading-none tracking-wider">
                    {barcodeValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {!autoDownload && (
          <div className="flex justify-center border-t border-gray-200 px-6 py-4">
            <button
              className="cursor-pointer rounded bg-primary px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handlePrint}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Print"}
            </button>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default BarcodeGenerator;
