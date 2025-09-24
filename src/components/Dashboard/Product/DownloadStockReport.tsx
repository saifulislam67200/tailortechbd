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
import { formatCurrency } from "@/utils/currency";
import dateUtils from "@/utils/date";
import { useEffect, useMemo, useRef, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import CategorySelector from "./CategorySelector";

const stockTableHeaders = [
  { label: "SL" },
  { label: "Product Code" },
  { label: "Category" },
  { label: "Sub Category" },
  { label: "Product Name" },
  { label: "Size" },
  { label: "Color" },
  { label: "Current Stock" },
  { label: "Unit Price" },
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

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [values, setValues] = useState([
    new DateObject().subtract(1, "days"),
    new DateObject().add(6, "days"),
  ]);

  const [trigger, { data, isFetching, isError }] = useLazyGetProductStockQuery();
  const { data: stockData } = useGetProductStockQuery({});
  const products: IProductStock[] = stockData?.data || [];

  const handleFetch = async () => {
    const res = await trigger({
      limit: 100000,
      startDate: values[0].format(),
      endDate: values[1].format(),
      ...reportFilters,
      ...(selectedCategoryId ? { categoryId: selectedCategoryId } : {}),
      ...(selectedSize ? { size: selectedSize } : {}),
      ...(selectedColor ? { color: selectedColor } : {}),
      // fields
      fields:
        reportFilters?.fields ||
        "sku,category,subCategory,productName,size,color,price,createdAt,stock,status",
    });

    if (!res.data?.data?.length) {
      setShowReport(false);
      toast.error("No Data Found in this date range and filters");
    } else {
      setShowReport(true);
    }
  };

  const stocks: IProductStock[] = data?.data || [];

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

  const { totalUnits, totalAmount } = useMemo(() => {
    const units = displayedStocks.reduce((sum, c) => sum + (Number(c.stock) || 0), 0);
    const amount = displayedStocks.reduce(
      (sum, c) => sum + Number(c.price || 0) * Number(c.stock || 0),
      0
    );
    return { totalUnits: units, totalAmount: amount };
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
  }, [openModal, showReport]);

  const clearFilters = () => {
    setSelectedCategoryId("");
    setSelectedSize("");
    setSelectedColor("");
    setResetKey((k) => k + 1);
  };

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="bg-primary text-white">
        Stock Report
      </Button>

      <DialogProvider state={openModal} setState={setOpenModal} className="w-full max-w-[1000px]">
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
                    onSelect={(category) => setSelectedCategoryId(category.value || "")}
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
              </div>

              {/* Date range */}
              <div className="flex flex-col gap-2">
                <span className="text-[15px] font-[600]">Date Range</span>
                <Calendar
                  range
                  numberOfMonths={2}
                  className="mx-auto"
                  value={values}
                  onChange={setValues}
                />
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
                <Button onClick={() => setShowReport(false)}>Change Date / Filters</Button>

                {/* Active filter pills (read-only) */}
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
                <img className="mx-auto mb-3 w-[150px]" src="/images/logos/logo.png" alt="logo" />
                <div className="mb-4 text-center">
                  <h2 className="text-[22px] font-bold text-primary">Product Stock Report</h2>
                  <p className="text-sm text-gray-600">
                    Product stock report of <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                    <b>{values[1].format("MMM DD, YYYY")}</b>
                  </p>
                </div>

                {/* Info Bar */}
                <div className="mb-4 rounded-md border border-primary/20 bg-primary/10 p-3 text-sm text-primary">
                  Showing product stocks from <b>{values[0].format("MMM DD, YYYY")}</b> to{" "}
                  <b>{values[1].format("MMM DD, YYYY")}</b>
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
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-primary/10 text-primary">
                      <tr>
                        {stockTableHeaders.map((h) => (
                          <th key={h.label} className="px-3 py-2 text-left">
                            {h.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {displayedStocks.map((p, index) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{index + 1}</td>
                          <td className="px-3 py-2">{p.sku || "N/A"}</td>
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                      {displayedStocks.map((p) => (
                        <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-3 py-2">{p.category || "N/A"}</td>
                          <td className="px-3 py-2">{p.subCategory || "N/A"}</td>
                          <td className="px-3 py-2">
                            <span title={p.productName} className="line-clamp-1">
                              {p.productName || "-"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{p.size || "N/A"}</td>
                          <td className="px-3 py-2">{p.color || "N/A"}</td>
                          <td className="px-3 py-2">{p.stock ?? "0"}</td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatCurrency(Number(p.price || 0) * Number(p.stock || 0))}
                          </td>
                          <td className="px-3 py-2 capitalize">
                            {p.status ? p.status.replace(/-/g, " ") : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-primary/10 font-semibold text-primary">
                        <td className="px-3 py-2" colSpan={7}>
                          Totals
                        </td>
                        <td className="px-3 py-2">{totalUnits}</td>
                        <td className="px-3 py-2 text-right"></td>
                        <td className="px-3 py-2 text-right">{formatCurrency(totalAmount)}</td>
                        <td className="px-3 py-2"></td>
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
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          table thead {
            display: table-header-group;
          }
          table tfoot {
            display: table-footer-group;
          }
        }
      `}</style>
    </div>
  );
};

export default DownloadStockReport;
