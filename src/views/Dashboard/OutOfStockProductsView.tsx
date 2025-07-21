"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import OutOfStockProductsTable from "@/components/Dashboard/Product/OutOfStockProductsTable";
const OutOfStockProductsView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Out Of Stock Products" />
      <OutOfStockProductsTable />
    </div>
  );
};

export default OutOfStockProductsView;
