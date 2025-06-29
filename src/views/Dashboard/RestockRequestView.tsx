import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import RestockRequestTable from "@/components/Dashboard/restockRequests/RestockRequestTable";

const RestockRequestView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Restock Requests" />
      <RestockRequestTable />
    </div>
  );
};

export default RestockRequestView;
