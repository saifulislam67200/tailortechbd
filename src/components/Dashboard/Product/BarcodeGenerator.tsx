"use client";
import { useRef, useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import DialogProvider from "@/components/ui/DialogProvider";
import Logo from "@/components/Shared/Logo";
import { PiBarcodeLight } from "react-icons/pi";

interface BarcodeGeneratorProps {
  barcodeValue?: string;
  price?: string | number;
  discount?: string | number;
  brandName?: string;
  productName?: string;
  productCode?: string;
  size?: string;
  color?: string;
  autoDownload?: boolean;
}

const BarcodeGenerator = ({
  price = "N/A",
  discount = "0",
  brandName = "Tallortech",
  productName = "N/A",
  productCode = "N/A",
  size = "N/A",
  color = "N/A",
  autoDownload = false,
}: BarcodeGeneratorProps) => {
  const barcodeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate discounted price
  const originalPrice = parseFloat(price.toString());
  const discountValue = parseFloat(discount.toString());
  const discountedPrice = (originalPrice - originalPrice * (discountValue / 100)).toFixed(2);

  // Generate current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const barcodeValue = `${productCode} - ${size} - ${color}`;

  const generateBarcode = () => {
    if (!svgRef.current || !barcodeValue) return;
    try {
      JsBarcode(svgRef.current, barcodeValue, {
        format: "CODE128",
        lineColor: "#000000",
        width: 2,
        height: 100,
        displayValue: false,
        margin: 10,
      });
    } catch (error) {
      toast.error("Failed to generate barcode");
      console.error("Barcode generation error:", error);
    }
  };

  const handleDownload = async () => {
    if (!barcodeRef.current || !barcodeValue) return;

    setIsGenerating(true);

    try {
      // Ensure barcode is generated
      generateBarcode();

      // Wait for DOM update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use html2canvas to capture the element
      const canvas = await html2canvas(barcodeRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Create download link
      const link = document.createElement("a");
      const fileName = `barcode-${productCode}-${Date.now()}.png`;

      link.download = fileName;
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
  useEffect(() => {
    if (isOpen) {
      // Generate barcode when dialog opens
      const timer = setTimeout(() => {
        generateBarcode();

        // Auto download if enabled
        if (autoDownload) {
          setTimeout(() => {
            handleDownload();
          }, 500);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDownload]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="center aspect-square w-[30px] cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 text-dashboard"
      >
        <PiBarcodeLight size={20} />
      </button>

      <DialogProvider
        setState={setIsOpen}
        state={isOpen}
        className="max-h-[100vh] min-h-[50vh] w-full max-w-[700px] bg-white"
      >
        <div ref={barcodeRef} className="my-6 w-full p-6">
          <div className="rounded-lg border border-primary/30 bg-white p-6">
            {/* Header */}
            <div className="mb-4 flex justify-between border-b pb-4">
              <div>
                <Logo className="h-12" />
                <p className="text-xs text-muted">{formattedDate}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{brandName}</p>
                <p className="text-xs text-muted">Product Code: {productCode}</p>
              </div>
            </div>

            {/* Barcode Content */}
            <div className="text-center">
              <div className="text-lg font-bold">Product Barcode</div>
              <svg ref={svgRef} className="mx-auto my-4" />

              <div className="my-2 font-mono text-sm">{barcodeValue}</div>

              <div className="my-3">
                <span
                  className={`text-xl font-bold ${discountValue > 0 ? "text-danger line-through" : "text-black"}`}
                >
                  BDT: {price}
                </span>
                {discountValue > 0 && (
                  <>
                    <div className="text-base font-bold text-success">{discount}% OFF</div>
                    <div className="text-xl font-bold">BDT: {discountedPrice}</div>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6 border-t border-dashed border-info/50 pt-4">
              <div className="mb-3 text-center text-sm font-bold">PRODUCT DETAILS</div>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>Brand:</strong> {brandName}
                </p>
                <p>
                  <strong>Product:</strong> {productName}
                </p>
                <p>
                  <strong>Code:</strong> {productCode}
                </p>
                <p>
                  <strong>Size:</strong> {size}
                </p>
                <p>
                  <strong>Color:</strong> {color}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!autoDownload && (
          <div className="mb-4 flex w-full justify-center">
            <button
              className="cursor-pointer rounded bg-primary px-4 py-2 text-white disabled:opacity-50"
              onClick={handleDownload}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Download"}
            </button>
          </div>
        )}
      </DialogProvider>
    </>
  );
};

export default BarcodeGenerator;
