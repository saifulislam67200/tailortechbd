import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import AnalyticsOverview from "@/components/Dashboard/statistics/analyticsOverview/AnalyticsOverview";
import StatisticsAside from "@/components/Dashboard/statistics/aside/StatisticsAside";

const StatisticsView = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <DashboardPageHeadingTitle title="Dashboard Statistics" />
      <div className="flex flex-col gap-[16px] xl:flex-row">
        <AnalyticsOverview />
        <StatisticsAside />
      </div>
    </div>
  );
};

export default StatisticsView;
