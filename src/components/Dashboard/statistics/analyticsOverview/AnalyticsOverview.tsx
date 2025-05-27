import OverviewChart from "./OverviewChart";
import RecentSales from "./RecentSalesTable";
import TopSelling from "./TopSellingTable";

const AnalyticsOverview = () => {
  return (
    <section className="w-full space-y-[16px]">
      <OverviewChart />
      <RecentSales />
      <TopSelling />
    </section>
  );
};

export default AnalyticsOverview;
