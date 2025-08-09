import AllOrders from "@/components/Dashboard/AllOrders/AllOrders";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("All Orders");
const page = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="All Orders" />
      <AllOrders />;
    </div>
  );
};

export default page;
