"use client";
import { useGetAllReviewByProductIdQuery } from "@/redux/features/review/review.api";
import Title from "../ui/Title";
import CustomerReviewCard from "./CustomerReviewCard";

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
    <section id="customer-review-form">
      {/* // customer review */}
      <Title title="CUSTOMER REVIEW" className="mt-[10px] !text-[14px]" />

      {data?.data?.length ? (
        <div className="mt-[10px] space-y-[10px]">
          {data?.data?.map((item) => (
            <CustomerReviewCard
              key={item._id}
              {...item}
              starRating={item.starRating as 1 | 2 | 3 | 4 | 5}
            />
          ))}
        </div>
      ) : (
        <div className="mt-[10px] flex min-h-[200px] flex-col items-center justify-center gap-[10px] bg-white p-[12px]">
          <span className="font-primary text-[22px] font-[700]">No review found</span>
          <span>Order the product & be the first one to write a review</span>
        </div>
      )}
    </section>
  );
};

export default CustomerReview;
