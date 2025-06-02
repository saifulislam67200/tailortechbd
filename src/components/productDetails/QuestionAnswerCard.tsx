import React from "react";
import { IQuestionAndAns } from "./QuestionAnswer";

const QuestionAnswerCard = ({ question, name, answer, createdAt }: IQuestionAndAns) => {
  const formattedDateTime = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div className="rounded-[5px] border border-quaternary bg-white p-[20px]">
      <div className="mb-2">
        <strong>Q:</strong> {question}
        <div className="text-xs text-gray-500">By {name}</div>
      </div>
      <div>
        <strong>A:</strong> {answer}
        <div className="text-xs text-gray-500">By Admin , {formattedDateTime}</div>
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
