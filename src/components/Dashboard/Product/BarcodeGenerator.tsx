"use client";
import DialogProvider from "@/components/ui/DialogProvider";
import html2canvas from "html2canvas-pro";
import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import { PiBarcodeLight } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

interface BarcodeGeneratorProps {
  barcodeValue?: string;
  price?: string | number;
  discount?: string | number;
  brandName?: string;
  productCode?: string;
  autoDownload?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const BarcodeGenerator = ({
  price = "N/A",
  discount = "0",
  brandName = "Tailortech",
  productCode = "N/A",
  autoDownload = false,
  isOpen = false,
  onClose,
}: BarcodeGeneratorProps) => {
  const barcodeRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate discounted price
  const originalPrice = parseFloat(price.toString());
  const discountValue = parseFloat(discount.toString());
  const discountedPrice = (originalPrice - originalPrice * (discountValue / 100)).toFixed(2);

  const barcodeValue = `${productCode}`;
  const modalOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  const setModalOpen = onClose || setInternalIsOpen;

  // Generate barcodes for all canvases
  const generateBarcodes = () => {
    return new Promise<void>((resolve) => {
      let completed = 0;
      for (let i = 0; i < 40; i++) {
        const canvas = canvasRefs.current[i];
        if (canvas) {
          try {
            JsBarcode(canvas, barcodeValue, {
              format: "CODE128",
              lineColor: "#000000",
              width: 1.2,
              height: 40,
              displayValue: false,
              margin: 3,
            });
            completed++;
            if (completed === 40) {
              resolve();
            }
          } catch (error) {
            if (i === 0) {
              toast.error("Failed to generate barcode");
              console.error("Barcode generation error:", error);
            }
            completed++;
            if (completed === 40) {
              resolve();
            }
          }
        } else {
          completed++;
          if (completed === 40) {
            resolve();
          }
        }
      }
    });
  };

  const handleDownload = async () => {
    if (!barcodeRef.current || !barcodeValue) return;

    setIsGenerating(true);

    try {
      // Generate bar codes and wait for completion
      await generateBarcodes();

      // Additional wait to ensure all bar codes are rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(barcodeRef.current, {
        backgroundColor: "#ffffff",
        scale: 3, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 2480,
        height: 3508,
        foreignObjectRendering: false,
      });

      const link = document.createElement("a");
      const fileName = `barcode-sheet-${productCode}-${Date.now()}.png`;

      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Barcode sheet downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download barcode sheet. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: barcodeRef,
  });

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(async () => {
        await generateBarcodes();
        if (autoDownload) {
          setTimeout(() => {
            handleDownload();
          }, 1000);
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [modalOpen, autoDownload]);

  return (
    <>
      {isOpen === undefined && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
        >
          <PiBarcodeLight size={20} />
        </button>
      )}

      <DialogProvider
        setState={setModalOpen}
        state={modalOpen}
        className="h-full max-h-[95vh] w-fit overflow-auto bg-white lg:min-h-[50vh]"
      >
        <div
          ref={barcodeRef}
          className="grid aspect-[2480/3508] h-full shrink-0 grid-cols-4 grid-rows-10 gap-1 bg-white p-[10px] font-sans text-xs text-black"
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-sm border border-gray-300 bg-white p-2 text-center text-black"
            >
              <div className="text-[12px] leading-[1.1] font-bold">{brandName}</div>

              <div className="flex justify-center">
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el;
                  }}
                  width={120}
                  height={45}
                  style={{ maxWidth: "100%" }}
                />
              </div>

              <div className="font-mono text-[8px]">{barcodeValue}</div>

              <div className="">
                {discountValue > 0 && (
                  <>
                    <div className="text-[10px] font-bold text-primary line-through">
                      {discount}% OFF
                    </div>
                    <div className="text-[14px] font-bold text-black">BDT: {discountedPrice}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {!autoDownload && (
          <div className="sticky bottom-0 flex w-full justify-center bg-white p-4 lg:border-t">
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
