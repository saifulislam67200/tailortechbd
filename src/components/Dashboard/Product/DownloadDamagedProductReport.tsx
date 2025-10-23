"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import CategorySelector from "./CategorySelector";
import {
  useGetProductStockQuery,
  useLazyGetDamagedProductQuery,
} from "@/redux/features/product/product.api";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import SelectionBox from "@/components/ui/SelectionBox";
import { PiDownloadSimple, PiPrinterFill } from "react-icons/pi";
import { IProductStock } from "@/types/product";

const headers = [
  "SL",
  "Product Code",
  "Category",
  "Product Name",
  "Size",
  "Color",
  "Price",
  "Damaged Qty",
  "Cause of Damaged",
];

const DownloadDamagedProductReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [stockQuery, setStockQuery] = useState<Record<string, string | number>>({
    fields: "name,category,subCategory,size,color,price,createdAt,stock,status",
    timeframe: "all",
    status: "",
    size: "",
    color: "",
  });

  const { data: stockData } = useGetProductStockQuery({
    ...stockQuery,
    limit: 999,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = stockData?.data || [];

  // filters
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [trigger, { data, isFetching, isError }] = useLazyGetDamagedProductQuery();
  const damagedProducts = data?.data || [];

  const handleFetch = async () => {
    const res = await trigger({
      limit: 100000,
      ...(selectedCategoryId ? { category: selectedCategoryId } : {}),
      ...(selectedSize ? { size: selectedSize } : {}),
      ...(selectedColor ? { color: selectedColor } : {}),
      fields:
        "sku,category,subCategory,productName,size,color,price,quantity,causeOfDamage,createdAt,slug",
    });

    if (!res.data?.data?.length) {
      setShowReport(false);
      toast.error("No Data Found in this filters");
    } else {
      setShowReport(true);
    }
  };

  const unique = (arr: Array<string | undefined | null>) =>
    Array.from(new Set(arr.filter(Boolean))) as string[];

  const sizeOptions = useMemo(() => {
    const allSizes = unique(products.map((p: IProductStock) => p.size));
    return [{ label: "ALL", value: "" }, ...allSizes.map((s) => ({ label: s, value: s }))];
  }, [products]);

  const colorOptions = useMemo(() => {
    const allColors = unique(products.map((p: IProductStock) => p.color));
    return [{ label: "ALL", value: "" }, ...allColors.map((c) => ({ label: c, value: c }))];
  }, [products]);

  const displayedDamagedProducts = useMemo(() => {
    return damagedProducts.filter((p) => {
      const okSize = !selectedSize || p.size === selectedSize;
      const okColor =
        !selectedColor || (p.color || "").toLowerCase() === selectedColor.toLowerCase();
      return okSize && okColor;
    });
  }, [damagedProducts, selectedSize, selectedColor]);

  const { totalUnits, totalAmount } = useMemo(() => {
    const units = displayedDamagedProducts.reduce((sum, c) => sum + (Number(c.quantity) || 0), 0);
    const amount = displayedDamagedProducts.reduce(
      (sum, c) => sum + Number(c.price || 0) * Number(c.quantity || 0),
      0
    );
    return { totalUnits: units, totalAmount: amount };
  }, [displayedDamagedProducts]);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Damaged_Product_Report",
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openModal && !showReport && e.key === "Enter") handleFetch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, showReport]);

  const clearFilters = () => {
    setSelectedCategoryId("");
    setSelectedSize("");
    setSelectedColor("");
    setResetKey((k) => k + 1);
    setStockQuery({ ...stockQuery, size: "", color: "", page: 1, categoryId: "" });
  };

  const handleDownloadPdf = async () => {
    try {
      const el = printRef.current;
      if (!el) return;

      // Render the entire report area to a canvas
      const canvas = await html2canvas(el, {
        scale: 2, // crisp text
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: document.documentElement.scrollWidth,
      });

      // PDF settings
      const orientation: "p" | "l" = "p"; // change to "l" for landscape if you prefer
      const pdf = new jsPDF(orientation, "mm", "a4");

      const pageWidthMM = pdf.internal.pageSize.getWidth();
      const pageHeightMM = pdf.internal.pageSize.getHeight();
      const marginMM = 8; // left/right/top/bottom

      // Drawable area inside margins
      const contentWidthMM = pageWidthMM - marginMM * 2;
      const contentHeightMM = pageHeightMM - marginMM * 2;

      // Canvas sizes (px)
      const canvasWidthPX = canvas.width;
      const canvasHeightPX = canvas.height;

      // How many canvas pixels fit into 1mm at the chosen scale?
      // We will scale the image so its width fits contentWidthMM
      const pxPerMM = canvasWidthPX / contentWidthMM;

      // Height of one PDF page in canvas pixels (inside margins)
      const pageHeightPX = contentHeightMM * pxPerMM;

      // A helper canvas we’ll reuse to crop page slices
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d")!;
      pageCanvas.width = canvasWidthPX;
      pageCanvas.height = Math.min(pageHeightPX, canvasHeightPX);

      let rendered = 0;
      let pageIndex = 0;

      while (rendered < canvasHeightPX) {
        // Height for this slice (last slice may be shorter)
        const sliceHeightPX = Math.min(pageHeightPX, canvasHeightPX - rendered);

        // Resize helper canvas if last slice is shorter
        if (pageCanvas.height !== sliceHeightPX) {
          pageCanvas.height = sliceHeightPX;
        }

        // Clear and draw slice from the big canvas
        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          /* sx, sy, sw, sh */ 0,
          rendered,
          canvasWidthPX,
          sliceHeightPX,
          /* dx, dy, dw, dh */ 0,
          0,
          canvasWidthPX,
          sliceHeightPX
        );

        const imgData = pageCanvas.toDataURL("image/png");

        if (pageIndex > 0) pdf.addPage();

        // Add the slice as an image that fits the content box
        pdf.addImage(
          imgData,
          "PNG",
          marginMM,
          marginMM,
          contentWidthMM,
          sliceHeightPX / pxPerMM // convert px back to mm for height
        );

        rendered += sliceHeightPX;
        pageIndex += 1;
      }

      pdf.save(`Damaged_Product_Report_${stockQuery.startDate}-${stockQuery.endDate}.pdf`);
    } catch (e) {
      toast.error("Failed to generate PDF");
      console.error(e);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Damaged Product Report
      </Button>

      <DialogProvider
        state={openModal}
        setState={setOpenModal}
        className="w-full max-w-[1000px] overflow-visible"
      >
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Damaged Product Report</h4>
          <HorizontalLine className="my-[10px]" />

          {/* FILTERS */}
          {!showReport && (
            <div className="flex flex-col gap-4 p-3">
              {/* Filters row */}
              <div className="flex flex-wrap items-start gap-4">
                {/* Category */}
                <div className="min-w-[260px]">
                  <CategorySelector
                    key={`cat-${resetKey}`}
                    heading={<span className="text-[14px] font-semibold">Select Category</span>}
                    className="flex-row items-start gap-[16px]"
                    subCategoryClassName="flex-row items-start min-w-[250px] gap-[16px]"
                    onSelect={(category) => {
                      setStockQuery({ ...stockQuery, categoryId: category.value || "" });
                      setSelectedCategoryId(category.value || "");
                    }}
                  />
                </div>

                {/* Color */}
                <div className="flex w-[250px] flex-col gap-2">
                  <span className="text-[14px] font-semibold">Select Color</span>
                  <SelectionBox
                    key={`color-${resetKey}`}
                    data={colorOptions}
                    dropdownClassName="z-[99999999]"
                    onSelect={(opt) => setSelectedColor((opt?.value as string) || "")}
                    className="max-w-[290px]"
                  />
                </div>

                {/* Size */}
                <div className="flex w-[250px] flex-col gap-2">
                  <span className="text-[14px] font-semibold">Select Size</span>
                  <SelectionBox
                    key={`size-${resetKey}`}
                    data={sizeOptions}
                    dropdownClassName="z-[99999999]"
                    onSelect={(opt) => setSelectedSize((opt?.value as string) || "")}
                    className="max-w-[290px]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Button onClick={handleFetch} className="bg-primary text-white">
                  {isFetching ? "Loading..." : "Show Report"}
                </Button>
                <Button className="bg-red-500 text-white" onClick={clearFilters}>
                  Clear Filters
                </Button>
                {isError && (
                  <span className="text-sm text-red-600">Failed to load. Please try again.</span>
                )}
              </div>
            </div>
          )}

          {/* REPORT VIEW */}
          {showReport && (
            <div className="mt-2">
              {/* Controls (hidden in print) */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3 print:hidden">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print <PiPrinterFill />
                </Button>
                <Button onClick={handleDownloadPdf} className="bg-primary text-white">
                  Download <PiDownloadSimple />
                </Button>
                <Button onClick={() => setShowReport(false)}>Change Filters</Button>

                {/* Active filter pills */}
                <div className="ml-auto flex flex-wrap items-center gap-2 text-xs">
                  {selectedCategoryId && (
                    <span className="rounded bg-primary/10 px-2 py-1 text-primary">
                      Category set
                    </span>
                  )}
                  {selectedSize && (
                    <span className="rounded bg-primary/10 px-2 py-1 text-primary">
                      Size: {selectedSize}
                    </span>
                  )}
                  {selectedColor && (
                    <span className="rounded bg-primary/10 px-2 py-1 text-primary">
                      Color: {selectedColor}
                    </span>
                  )}
                </div>
              </div>

              {/* Printable Area */}
              <div ref={printRef} className="p-3">
                {/* Header */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />
                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Damaged Product Report</h2>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        {headers.map((h) => (
                          <th key={h} className="px-3 py-2 text-left">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedDamagedProducts.map((r, i) => (
                        <tr key={r?._id ?? i} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{i + 1}</td>
                          <td className="px-3 py-2">{r?.productCode ?? "N/A"}</td>
                          <td className="px-3 py-2">
                            {typeof r?.category === "object" && r?.category?.label
                              ? r?.category?.label
                              : typeof r?.category === "string"
                                ? r?.category
                                : "N/A"}
                          </td>

                          <td className="px-3 py-2">
                            <span title={r?.productName} className="line-clamp-1">
                              {r?.productName ?? "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{r?.size ?? "N/A"}</td>
                          <td className="px-3 py-2">{r?.color ?? "N/A"}</td>
                          <td className="px-3 py-2 text-right">৳{Number(r?.price || 0)}</td>
                          <td className="px-3 py-2">{r?.quantity ?? 0}</td>
                          <td className="px-3 py-2">{r?.causeOfDamage ?? "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={6}>
                          Totals
                        </td>
                        <td className="px-3 py-2 text-right">৳{totalAmount}</td>
                        <td className="px-3 py-2">{totalUnits}</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                  <span>Printed on: {new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogProvider>
    </div>
  );
};

export default DownloadDamagedProductReport;
