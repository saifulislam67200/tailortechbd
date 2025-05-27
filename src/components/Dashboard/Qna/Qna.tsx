import React from "react";
import DashboardPageHeadingTitle from "../DashboardPageHeadingTitle";
import QnaTable from "./QnaTable";

const Qna = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Questions & Answers Management" />
      <QnaTable />
    </div>
  );
};

export default Qna;
