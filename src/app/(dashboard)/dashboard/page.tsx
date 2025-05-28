import StatisticsView from "@/views/Dashboard/StatisticsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailortech | Dashboard Statistics",
  description: "View your dashboard statistics and analytics",
};

const page = () => {
  return <StatisticsView />;
};

export default page;
