import OverviewChart from "./OverviewChart";
import RecentSales from "./RecentSales";
import TopSelling from "./TopSelling";

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
