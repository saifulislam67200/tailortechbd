"use client";
import { useGetQuestionsByProjectIdQuery } from "@/redux/features/Q&A/questionAndAnswer.api";
import Title from "../ui/Title";
import QuestionAnswerCard from "./QuestionAnswerCard";
import QuestionAnswerForm from "./QuestionAnswerForm";

export interface IQuestionAndAns {
  _id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  question: string;
  answer: string;
}

const QuestionAnswer = ({ productId }: { productId: string }) => {
  const { data } = useGetQuestionsByProjectIdQuery(productId);

  return (
    <>
      {/* // Q&A */}
      <Title title="QUESTION & ANSWER" className="mt-[10px] !text-[14px]" />

      <div className="mt-[10px] space-y-[10px]">
        {data?.data?.map((item: IQuestionAndAns) => (
          <QuestionAnswerCard key={item._id} {...item} />
        ))}
      </div>

      <QuestionAnswerForm productId={productId} />
    </>
  );
};

export default QuestionAnswer;
