"use client";
import RecentQuestionsSkeleton from "@/components/ui/Skeleton/RecentQuestionsSkeleton";
import { useGetRecentUnansweredQuestionQuery } from "@/redux/features/statistics/statistics.api";
import Image from "next/image";
import AnswerModal from "../../Qna/AnswerModal";

interface IProduct {
  _id: string;
  name: string;
  image: string;
}

interface IQuestion {
  _id: string;
  name: string;
  user: string | null;
  question: string;
  productId: string;
  product: IProduct;
  createdAt: string;
}

const RecentQuestions = () => {
  const { data, isLoading } = useGetRecentUnansweredQuestionQuery(undefined);
  const recentUnAnsweredQuestions = data?.data || [];

  if (isLoading) {
    return <RecentQuestionsSkeleton />;
  }

  return (
    <div className="mt-[16px] h-[700px] w-full bg-white p-[16px] xl:w-[450px] 2xl:w-[450px]">
      <h2 className="mb-[20px] text-[14px] font-bold text-primary sm:text-[16px]">
        Recent Questions <span className="text-[12px] text-info">(Recent 10 max)</span>
      </h2>
      <ul className="space-y-4">
        {recentUnAnsweredQuestions?.length === 0 ? (
          <div className="mx-auto h-full w-full">
            <h5 className="mt-[50%] h-full text-center text-[14px] text-info">
              No recent unanswered question
            </h5>
          </div>
        ) : (
          recentUnAnsweredQuestions?.map((question: IQuestion) => (
            <li key={question?._id} className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={question?.product?.image}
                  alt="Product"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded object-cover"
                />
                <div>
                  <p className="line-clamp-1 text-[12px] text-info">{question?.product?.name}</p>
                  <p className="line-clamp-1 text-[12px] text-info">Q: {question?.question}</p>
                </div>
              </div>

              <AnswerModal item={question}>
                <button className="cursor-pointer text-[12px] font-semibold text-secondary hover:text-primary">
                  Reply
                </button>
              </AnswerModal>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentQuestions;
