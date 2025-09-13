"use client";
import ComplainSuggestionTable from "@/components/Dashboard/ComplainSuggestion/ComplainSuggestionTable";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";

const ComplainSuggestionView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Complain & Suggestion" />
      <ComplainSuggestionTable />
    </div>
  );
};

export default ComplainSuggestionView;
