import React from "react";
import DashboardPageHeadingTitle from "../DashboardPageHeadingTitle";
import BannerTable from "./BannerTable";

const Banners = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Manage Banners" />
      <BannerTable />
    </div>
  );
};

export default Banners;
