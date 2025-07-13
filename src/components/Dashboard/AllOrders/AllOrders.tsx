import DashboardPageHeadingTitle from "../DashboardPageHeadingTitle";
import AllOrderTable from "./AllOrderTable";

export default function OrderList() {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="All Orders" />
      <AllOrderTable />
      {/* <GenerateInvoiceModal /> */}
    </div>
  );
}
