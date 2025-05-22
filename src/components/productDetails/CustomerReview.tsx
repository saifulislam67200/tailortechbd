"use client";
import { useGetAllReviewByProductIdQuery } from "@/redux/features/review/review.api";
import Title from "../ui/Title";
import CustomerReviewCard from "./CustomerReviewCard";
import CustomerReviewForm from "./CustomerReviewForm";

export interface IReview {
  productId: string;
  userId: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  name: string;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

const CustomerReview = ({ productId }: { productId: string }) => {
  const { data } = useGetAllReviewByProductIdQuery(productId);

  return (
    <>
      {/* // customer review */}
      <Title title="CUSTOMER REVIEW" className="mt-[10px] !text-[14px]" />

      <div className="mt-[10px] space-y-[10px]">
        {data?.data?.map((item: IReview) => (
          <CustomerReviewCard
            key={item._id}
            {...item}
            starRating={item.starRating as 1 | 2 | 3 | 4 | 5}
          />
        ))}
      </div>

      <CustomerReviewForm productId={productId} />
    </>
  );
};

export default CustomerReview;
