"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import InStockProductTable from "@/components/Dashboard/Product/InStockProductTable";
const InStockProductView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="In Stock Products" />
      <InStockProductTable />
    </div>
  );
};

export default InStockProductView;
