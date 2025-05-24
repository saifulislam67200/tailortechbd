import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import AllProductsTable from "@/components/Dashboard/Product/AllProductsTable";

const AllProductsView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="All Products" />
      <AllProductsTable />
    </div>
  );
};

export default AllProductsView;
