"use client";

import ComplainAndSuggestionTable from "@/components/Account/ComplainAndSuggestion/ComplainAndSuggestionTable";
import { useState } from "react";
import ComplainAndSuggestionForm, { IComplainFormValues } from "./ComplainAndSuggestionForm";

const ComplainAndSuggestionView = () => {
  const [view, setView] = useState<"table" | "form">("table");

  const [defaultValues, setDefaultValues] = useState<
    (IComplainFormValues & { _id: string }) | undefined
  >(undefined);

  return (
    <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[24px]">
      <h2 className="mb-[15px] text-[18px] font-bold text-primary md:mb-[16px] md:text-[24px]">
        Complain & Suggestion Box
      </h2>

      {/* TABLE VIEW */}
      {view === "table" && (
        <ComplainAndSuggestionTable
          onEditClick={(c) => {
            setDefaultValues({
              customerName: c.customerName,
              orderId: c.orderId,
              feedbackType: c.feedbackType,
              csCategory: c.csCategory,
              priority: c.priority,
              satisfaction: String(c.satisfaction),
              message: c.message,
              _id: c._id,
            });
            setView("form");
          }}
          setView={setView}
        />
      )}

      {/* FORM VIEW */}
      {view === "form" && (
        <ComplainAndSuggestionForm
          onSuccess={() => {
            setDefaultValues(undefined);
            setView("table");
          }}
          onCancel={() => {
            setView("table");
            setDefaultValues(undefined);
          }}
          defaultValues={defaultValues}
        />
      )}
    </div>
  );
};

export default ComplainAndSuggestionView;
