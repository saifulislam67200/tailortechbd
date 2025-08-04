"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import ProductStockTable from "@/components/Dashboard/Product/ProductStockTable";
const ProductStockView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Products Stock" />
      <ProductStockTable />
    </div>
  );
};

export default ProductStockView;
