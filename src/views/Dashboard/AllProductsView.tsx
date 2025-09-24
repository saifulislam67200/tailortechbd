"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import AllProductsTable from "@/components/Dashboard/Product/AllProductsTable";
import ProductStockIndicatorTable from "@/components/Dashboard/Product/ProductStockIndicatorTable";
import { useState } from "react";

const AllProductsView = () => {
  const [isCheckStock, setIsCheckStock] = useState(false);

  const handleCheckProductStocks = () => {
    setIsCheckStock(!isCheckStock);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="All Products" />
      {!isCheckStock ? (
        <AllProductsTable />
      ) : (
        <ProductStockIndicatorTable handleCheckProductStocks={handleCheckProductStocks} />
      )}
    </div>
  );
};

export default AllProductsView;
