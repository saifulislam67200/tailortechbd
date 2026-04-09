"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import SelectionBox from "@/components/ui/SelectionBox";
import {
  useGetProductStockQuery,
  useLazyGetProductStockQuery,
} from "@/redux/features/product/product.api";
import { IProductStock } from "@/types/product";
import dateUtils from "@/utils/date";
import { useEffect, useMemo, useRef, useState } from "react";
import { PiPrinterFill, PiDownloadSimple } from "react-icons/pi";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import CategorySelector from "./CategorySelector";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import DateRange from "../DateRange";

const stockTableHeaders = [
  { label: "SL" },
  { label: "Code" },
  { label: "Category" },
  { label: "Sub Category" },
  { label: "Name" },
  { label: "Size" },
  { label: "Color" },
  { label: "Opening Stock" },
  { label: "Sales Qty" },
  { label: "Damaged Qty" },
  { label: "Current Stock" },
  { label: "Unit Price" },
  { label: "Offer Price" },
  { label: "Total Price" },
  { label: "Stock Status" },
];

type DownloadStockReportProps = {
  reportFilters?: Partial<Record<string, string | number>>;
};

const DownloadStockReport = ({ reportFilters = {} }: DownloadStockReportProps) => {
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
  const products: IProductStock[] = stockData?.data || [];

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    new Date(),
  ]);

  const [trigger, { data, isFetching, isError }] = useLazyGetProductStockQuery({ ...stockQuery });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stocks: IProductStock[] = data?.data || [];

  const handleFetch = async () => {
    if (!dateRange[0] || !dateRange[1]) {
      toast.error("Please select both start and end dates");
      return;
    }

    const res = await trigger({
      limit: 100000,
      startDate: dateRange[0].toISOString(),
      endDate: dateRange[1].toISOString(),
      ...reportFilters,
      ...(selectedCategoryId ? { categoryId: selectedCategoryId } : {}),
      ...(selectedSize ? { size: selectedSize } : {}),
      ...(selectedColor ? { color: selectedColor } : {}),
      fields:
        reportFilters?.fields ||
        "sku,category,subCategory,productName,size,color,price,createdAt,stock,status,openingStock,salesQty,damagedQty,currentStock,offerPrice,totalPrice,discount",
    });

    if (!res.data?.data?.length) {
      setShowReport(false);
      toast.error("No Data Found in this date range and filters");
    } else {
      setShowReport(true);
    }
  };

  const unique = (arr: Array<string | undefined | null>) =>
    Array.from(new Set(arr.filter(Boolean))) as string[];

  const sizeOptions = useMemo(() => {
    const allSizes = unique(products.map((p) => p.size));
    return [{ label: "ALL", value: "" }, ...allSizes.map((s) => ({ label: s, value: s }))];
  }, [products]);

  const colorOptions = useMemo(() => {
    const allColors = unique(products.map((p) => p.color));
    return [{ label: "ALL", value: "" }, ...allColors.map((c) => ({ label: c, value: c }))];
  }, [products]);

  const displayedStocks = useMemo(() => {
    return stocks.filter((p) => {
      const okSize = !selectedSize || p.size === selectedSize;
      const okColor =
        !selectedColor || (p.color || "").toLowerCase() === selectedColor.toLowerCase();
      return okSize && okColor;
    });
  }, [stocks, selectedSize, selectedColor]);

  const { totalAmount, totalOpeningStock, totalSalesQty, totalDamagedQty, totalCurrentStock } =
    useMemo(() => {
      const amount = displayedStocks.reduce((sum, c) => {
        const currentStock = Number(c.stock) || 0;
        const price = Number(c.offerPrice) || Number(c.price) || 0;
        return sum + currentStock * price;
      }, 0);
      const openingStock = displayedStocks.reduce(
        (sum, c) => sum + (Number(c.openingStock) || 0),
        0
      );
      const salesQty = displayedStocks.reduce((sum, c) => sum + (Number(c.salesQty) || 0), 0);
      const damagedQty = displayedStocks.reduce((sum, c) => sum + (Number(c.damagedQty) || 0), 0);
      const currentStock = displayedStocks.reduce((sum, c) => sum + (Number(c.stock) || 0), 0);
      return {
        totalAmount: amount,
        totalOpeningStock: openingStock,
        totalSalesQty: salesQty,
        totalDamagedQty: damagedQty,
        totalCurrentStock: currentStock,
      };
    }, [displayedStocks]);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Product_Stock_Report",
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
    setDateRange([new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()]);
  };

  const handleDownloadPdf = async () => {
    try {
      const el = printRef.current;
      if (!el) return;

      // Add PDF-specific class to hide sub category and apply print-like styles
      el.classList.add("pdf-mode");

      // Wait a bit for styles to apply
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get table element to ensure full width capture
      const tableEl = el.querySelector(".stock-report-table") as HTMLElement;
      const tableWidth = tableEl
        ? Math.max(tableEl.scrollWidth, 1400)
        : document.documentElement.scrollWidth;

      // Render to canvas (for full width capture)
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: tableWidth,
        windowWidth: tableWidth,
      });

      // Remove the class after capturing
      el.classList.remove("pdf-mode");

      // 👉 Change orientation to landscape (horizontal)
      const orientation: "p" | "l" = "l"; // <-- "l" means landscape
      const pdf = new jsPDF(orientation, "mm", "a4");

      const pageWidthMM = pdf.internal.pageSize.getWidth();
      const pageHeightMM = pdf.internal.pageSize.getHeight();
      const marginMM = 4; // Reduced from 8 to 4 for less left/right margin
      const contentWidthMM = pageWidthMM - marginMM * 2;
      const contentHeightMM = pageHeightMM - marginMM * 2;

      const canvasWidthPX = canvas.width;
      const canvasHeightPX = canvas.height;
      const pxPerMM = canvasWidthPX / contentWidthMM;
      const pageHeightPX = contentHeightMM * pxPerMM;

      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d")!;
      pageCanvas.width = canvasWidthPX;
      pageCanvas.height = Math.min(pageHeightPX, canvasHeightPX);

      let rendered = 0;
      let pageIndex = 0;

      while (rendered < canvasHeightPX) {
        const sliceHeightPX = Math.min(pageHeightPX, canvasHeightPX - rendered);
        if (pageCanvas.height !== sliceHeightPX) pageCanvas.height = sliceHeightPX;

        pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          0,
          rendered,
          canvasWidthPX,
          sliceHeightPX,
          0,
          0,
          canvasWidthPX,
          sliceHeightPX
        );

        const imgData = pageCanvas.toDataURL("image/png");
        if (pageIndex > 0) pdf.addPage();

        pdf.addImage(imgData, "PNG", marginMM, marginMM, contentWidthMM, sliceHeightPX / pxPerMM);

        rendered += sliceHeightPX;
        pageIndex += 1;
      }

      const start = dateRange[0]?.toISOString().split("T")[0].replace(/-/g, "") || "unknown";
      const end = dateRange[1]?.toISOString().split("T")[0].replace(/-/g, "") || "unknown";
      pdf.save(`Product_Stock_Report_${start}-${end}.pdf`);
    } catch (e) {
      toast.error("Failed to generate PDF");
      console.error(e);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Stock Report
      </Button>

      <DialogProvider
        state={openModal}
        setState={setOpenModal}
        className={`w-full max-w-[1000px] ${!showReport && "overflow-visible"}`}
      >
        <div className="w-full rounded-[10px] bg-white">
          <h4 className="p-3 text-[20px] font-[700] text-primary">Product Stock Report</h4>
          <HorizontalLine className="my-[10px]" />

          {/* DATE RANGE + FILTERS */}
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

              {/* Date range */}
              <div className="flex flex-col gap-2">
                <span className="text-[15px] font-[600]">Date Range</span>
                <DateRange value={dateRange} onChange={setDateRange} />
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
              {/* Controls */}
              <div className="mb-3 flex flex-wrap items-center gap-2 p-3 print:hidden">
                <Button onClick={handlePrint} className="bg-primary text-white">
                  Print <PiPrinterFill />
                </Button>
                <Button onClick={handleDownloadPdf} className="bg-primary text-white">
                  Download <PiDownloadSimple />
                </Button>
                <Button onClick={() => setShowReport(false)}>Change Date / Filters</Button>

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
                <div className="pdf-header mx-auto print:min-w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.jpg" alt="logo" />
                  <div className="mb-4 text-center">
                    <h2 className="text-[22px] font-bold text-primary">Product Stock Report</h2>
                    <p className="text-sm text-gray-600">
                      Product stock report of{" "}
                      <b>
                        {dateRange[0]?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </b>{" "}
                      to{" "}
                      <b>
                        {dateRange[1]?.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </b>
                    </p>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="pdf-info-bar mb-4 rounded-md border border-primary/20 bg-primary/10 p-3 text-sm text-primary print:min-w-full">
                  Showing product stocks from{" "}
                  <b>
                    {dateRange[0]?.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </b>{" "}
                  to{" "}
                  <b>
                    {dateRange[1]?.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </b>
                  {(selectedCategoryId || selectedSize || selectedColor) && (
                    <>
                      {" "}
                      • Filters:&nbsp;
                      {selectedCategoryId ? "Category" : ""}
                      {selectedCategoryId && (selectedSize || selectedColor) ? ", " : ""}
                      {selectedSize || ""}
                      {selectedSize && selectedColor ? ", " : ""}
                      {selectedColor || ""}
                    </>
                  )}
                </div>

                {/* TABLE */}
                <div className="stock-report-container overflow-x-auto rounded-md border border-gray-200">
                  <table
                    className="stock-report-table w-full min-w-[150%] text-sm print:min-w-[1100px]"
                    style={{ borderCollapse: "collapse" }}
                  >
                    {/* lock column widths for thead/tbody/tfoot */}
                    <colgroup>
                      <col style={{ width: "40px" }} />
                      <col style={{ width: "90px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "120px" }} className="print:hidden" />
                      <col style={{ width: "160px" }} />
                      <col style={{ width: "70px" }} />
                      <col style={{ width: "90px" }} />
                      <col style={{ width: "110px" }} />
                      <col style={{ width: "90px" }} />
                      <col style={{ width: "110px" }} />
                      <col style={{ width: "110px" }} />
                      <col style={{ width: "110px" }} />
                      <col style={{ width: "110px" }} />
                      <col style={{ width: "130px" }} />
                      <col style={{ width: "120px" }} />
                    </colgroup>

                    <thead className="stock-report-thead bg-primary/10 text-primary">
                      <tr>
                        {stockTableHeaders.map((h) => (
                          <th
                            key={h.label}
                            className={`stock-report-th px-1 py-2 text-left print:max-w-[40px] print:px-1 print:py-1 print:text-[10px] ${
                              h.label === "Sub Category" ? "print:hidden" : ""
                            } ${h.label === "Category" ? "text-center" : ""} ${h.label === "Offer Price" ? "print:max-w-[25px]" : ""} ${
                              h.label === "Total Price" ? "print:max-w-[25px]" : ""
                            } ${h.label === "Size" ? "print:max-w-[7px]" : ""} ${
                              h.label === "Color" ? "print:max-w-[10px]" : ""
                            }`}
                            style={{ border: "none" }}
                          >
                            {h.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="stock-report-tbody">
                      {displayedStocks.map((p, index) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {index + 1}
                          </td>
                          <td
                            className="px-1 py-2 print:max-w-[50px] print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.sku || "N/A"}
                          </td>
                          <td
                            className="line-clamp-1 max-w-[60px] px-1 py-2 text-center print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {typeof p.category === "object" &&
                            p.category !== null &&
                            "label" in p.category
                              ? (p.category as { label: string }).label
                              : typeof p.category === "string"
                                ? p.category
                                : "N/A"}
                          </td>
                          <td
                            className="truncate px-1 py-2 print:hidden"
                            style={{ border: "none" }}
                          >
                            {p.subCategory || "N/A"}
                          </td>
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            <span title={p.productName} className="line-clamp-1 max-w-[70px]">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td
                            className="px-1 py-2 print:max-w-[7px] print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.size || "N/A"}
                          </td>
                          <td
                            className="px-1 py-2 print:max-w-[10px] print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.color || "N/A"}
                          </td>
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.openingStock ?? p.stock ?? "0"}
                          </td>
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.salesQty ?? "0"}
                          </td>
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.damagedQty ?? "0"}
                          </td>
                          <td
                            className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.stock ?? "0"}
                          </td>
                          <td
                            className="px-1 py-2 text-left print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            ৳ {p.price || 0}
                          </td>
                          <td
                            className="px-1 py-2 text-left print:max-w-[25px] print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.offerPrice ? `৳ ${p.offerPrice}` : "N/A"}
                          </td>
                          <td
                            className="px-1 py-2 text-left print:max-w-[25px] print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            ৳ {p.totalPrice || 0}
                          </td>
                          <td
                            className="px-1 py-2 capitalize print:px-1 print:py-1 print:text-[10px]"
                            style={{ border: "none" }}
                          >
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* FOOTER inside the same table for perfect alignment */}
                    <tfoot className="stock-report-tfoot">
                      {/* Screen footer (Sub Category visible) */}
                      <tr className="bg-primary/10 font-semibold text-primary print:hidden">
                        <td
                          className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                          colSpan={7}
                        >
                          Totals
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalOpeningStock}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalSalesQty}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalDamagedQty}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalCurrentStock}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                        <td className="px-1 py-2 text-left print:px-1 print:py-1 print:text-[10px]">
                          ৳ {totalAmount.toFixed(2)}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                      </tr>

                      {/* Print footer (Sub Category hidden) */}
                      <tr className="hidden bg-primary/10 font-semibold text-primary print:table-row">
                        <td
                          className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"
                          colSpan={6}
                        >
                          Totals
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalOpeningStock}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalSalesQty}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalDamagedQty}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]">
                          {totalCurrentStock}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                        <td className="px-1 py-2 text-left print:px-1 print:py-1 print:text-[10px]">
                          ৳ {totalAmount.toFixed(2)}
                        </td>
                        <td className="px-1 py-2 print:px-1 print:py-1 print:text-[10px]"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                  <span>Printed on: {dateUtils.formatDate(new Date().toISOString())}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogProvider>

      <style jsx global>{`
        /* Remove header dividers - apply to all states */
        .stock-report-table thead.stock-report-thead th.stock-report-th {
          border-right: none !important;
          border-left: none !important;
          border-top: none !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        }

        /* Make tfoot band look clean and prevent misalignment */
        .stock-report-tfoot td {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* PDF mode styles - hide sub category and make table smaller like print */
        /* Hide only Sub Category column (4th column) */
        .pdf-mode .stock-report-table colgroup col:nth-child(4),
        .pdf-mode .stock-report-table thead th:nth-child(4),
        .pdf-mode .stock-report-table tbody td:nth-child(4) {
          display: none !important;
        }
        /* Ensure all other columns are visible - especially after Current Stock */
        /* Unit Price (12th), Offer Price (13th), Total Price (14th), Stock Status (15th) */
        .pdf-mode .stock-report-table thead th:nth-child(12),
        .pdf-mode .stock-report-table thead th:nth-child(13),
        .pdf-mode .stock-report-table thead th:nth-child(14),
        .pdf-mode .stock-report-table thead th:nth-child(15),
        .pdf-mode .stock-report-table tbody td:nth-child(12),
        .pdf-mode .stock-report-table tbody td:nth-child(13),
        .pdf-mode .stock-report-table tbody td:nth-child(14),
        .pdf-mode .stock-report-table tbody td:nth-child(15) {
          display: table-cell !important;
          visibility: visible !important;
        }
        /* Hide screen footer, show print footer in PDF mode */
        .pdf-mode .stock-report-table tfoot tr:first-child {
          display: none !important;
        }
        .pdf-mode .stock-report-table tfoot tr.hidden {
          display: table-row !important;
        }
        .pdf-mode .stock-report-container {
          overflow: visible !important;
          width: 150% !important;
        }
        .pdf-mode .stock-report-table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100% !important;
          min-width: 1400px !important;
          font-size: 10px !important;
        }

        .pdf-mode .pdf-header {
          min-width: 150% !important;
        }

        .pdf-mode .pdf-info-bar {
          min-width: 200% !important;
        }
        /* Ensure all columns are visible in PDF mode */
        .pdf-mode .stock-report-table th,
        .pdf-mode .stock-report-table td {
          display: table-cell !important;
          visibility: visible !important;
          font-size: 9px !important;
          padding: 1px 3px !important;
        }
        .pdf-mode .stock-report-tfoot tr {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        /* Reduce font size for headers and other text in PDF mode */
        .pdf-mode h2 {
          font-size: 18px !important;
          text-align: center !important;
        }
        .pdf-mode p,
        .pdf-mode span {
          font-size: 11px !important;
        }
        .pdf-mode img {
          width: 120px !important;
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        /* Center header section and info bar in PDF mode - but not table */
        /* Center header div with h2 */
        .pdf-mode > div > div.mb-4.text-center {
          text-align: center !important;
        }
        /* Center info bar text */
        .pdf-mode > div > div[class*="rounded-md"][class*="border"][class*="bg-primary"] {
          text-align: center !important;
        }
        .pdf-mode > div > div[class*="rounded-md"][class*="border"][class*="bg-primary"] span,
        .pdf-mode > div > div[class*="rounded-md"][class*="border"][class*="bg-primary"] b {
          text-align: center !important;
        }
        /* Center all paragraphs in PDF mode (but not in table) */
        .pdf-mode > div > div > p {
          text-align: center !important;
        }
        /* Don't center table content - override any center styles */
        .pdf-mode .stock-report-container,
        .pdf-mode .stock-report-table,
        .pdf-mode .stock-report-table th,
        .pdf-mode .stock-report-table td,
        .pdf-mode .stock-report-table tbody,
        .pdf-mode .stock-report-table thead,
        .pdf-mode .stock-report-table tfoot {
          text-align: left !important;
        }

        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:table-row {
            display: table-row !important;
          }

          /* Prevent clipping; respect colgroup widths */
          .stock-report-container {
            overflow: visible !important;
          }
          .stock-report-table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100% !important;
            min-width: 0 !important;
          }

          /* Keep totals together */
          .stock-report-tfoot tr {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Aggressive: remove stray borders in thead on print */
          .stock-report-table thead.stock-report-thead th.stock-report-th,
          .stock-report-table thead th,
          table.stock-report-table thead th {
            border: none !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
          }

          /* Reduce all text sizes for print */
          .stock-report-table {
            font-size: 10px !important;
          }
          .stock-report-table th,
          .stock-report-table td {
            font-size: 10px !important;
            padding: 2px 4px !important;
          }
          .stock-report-table th {
            font-weight: 600 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DownloadStockReport;
