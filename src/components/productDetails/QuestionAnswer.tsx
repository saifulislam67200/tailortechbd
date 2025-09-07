"use client";
import { useGetQuestionsByProductIdQuery } from "@/redux/features/Q&A/questionAndAnswer.api";
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
  const { data } = useGetQuestionsByProductIdQuery(productId);

  return (
    <section id="question-answer-form w-full">
      {/* // Q&A */}
      <Title title="QUESTION & ANSWER" className="mt-[10px] !text-[14px]" />

      {data?.data?.length ? (
        <div className="mt-[10px] space-y-[10px]">
          {data?.data?.map((item: IQuestionAndAns) => (
            <QuestionAnswerCard key={item._id} {...item} />
          ))}
        </div>
      ) : (
        <div className="mt-[10px] flex min-h-[200px] flex-col items-center justify-center gap-[10px] bg-white p-[12px]">
          <span className="font-primary text-[22px] font-[700]">No question found</span>
          <span>Be the first one to ask a question</span>
        </div>
      )}

      <QuestionAnswerForm productId={productId} />
    </section>
  );
};

export default QuestionAnswer;
