"use client";

import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import AllAdminTable from "@/components/Dashboard/ManageAdmins/AllAdminTable";

const ManageAdminView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Mange Admins" />
      <AllAdminTable />
    </div>
  );
};

export default ManageAdminView;
