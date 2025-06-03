"use client";
import CreateCategoryForm from "@/components/Dashboard/CreateCategory/CreateCategoryForm";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
const CreateCategoryVIew = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Create Category" />
      <CreateCategoryForm />
    </div>
  );
};

export default CreateCategoryVIew;
