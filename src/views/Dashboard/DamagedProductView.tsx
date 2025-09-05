"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import DamagedProductTable from "@/components/Dashboard/Product/DamagedProductTable";

const DamagedProductView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Damaged Products" />

      <DamagedProductTable />
    </div>
  );
};

export default DamagedProductView;
