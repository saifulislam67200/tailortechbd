import React from "react";
import { IQuestionAndAns } from "./DetailsAndInformation";


const QuestionAnswerCard = ({
    question,
    name,
    answer,
    createdAt,
}: IQuestionAndAns) => {
    return (
        <div className="border border-quaternary bg-white p-[20px] rounded-[5px]">
            <div className="mb-2">
                <strong>Q:</strong> {question}
                <div className="text-xs text-gray-500">By {name}</div>
            </div>
            <div>
                <strong>A:</strong> {answer}
                <div className="text-xs text-gray-500">
                    By Admin , {createdAt?.slice(0, 10)} at {createdAt?.slice(11, 16)}
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswerCard;