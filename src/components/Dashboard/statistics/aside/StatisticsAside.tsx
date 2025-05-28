import React from "react";
import RecentQuestions from "./RecentQuestions";
import YearlySellingPieChart from "./YearlySellingPieChart";

const StatisticsAside = () => {
  return (
    <aside>
      <YearlySellingPieChart />
      <RecentQuestions />
    </aside>
  );
};

export default StatisticsAside;
