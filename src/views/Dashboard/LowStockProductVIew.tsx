"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import LowStockProductTable from "@/components/Dashboard/Product/LowStockProductTable";
const LowStockProductVIew = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Low Stock Products" />
      <LowStockProductTable />
    </div>
  );
};

export default LowStockProductVIew;
