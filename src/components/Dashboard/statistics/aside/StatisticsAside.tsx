import React from "react";
import MonthlySellingPieChart from "./MonthlySellingPieChart";
import RecentQuestions from "./RecentQuestions";

const StatisticsAside = () => {
  return (
    <aside>
      <MonthlySellingPieChart />
      <RecentQuestions />
    </aside>
  );
};

export default StatisticsAside;
