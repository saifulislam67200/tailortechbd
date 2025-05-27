import OverviewChart from "./OverviewChart";
import RecentSales from "./RecentSalesTable";
import TopSelling from "./TopSellingTable";

const AnalyticsOverview = () => {
  return (
    <div className="w-full space-y-[16px]">
      <OverviewChart />
      <RecentSales />
      <TopSelling />
    </div>
  );
};

export default AnalyticsOverview;
