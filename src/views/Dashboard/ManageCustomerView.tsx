"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import AllCustomerTable from "@/components/Dashboard/manageCustomer/AllCustomerTable";

const ManageCustomerView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Mange Customers" />
      <AllCustomerTable />
    </div>
  );
};

export default ManageCustomerView;
