import React from "react";
import formateCreateOrUpdateDate from "@/utils/FormateCreateOrUpdateDate";
import { IReview } from "./CustomerReview";

interface CustomerReviewCardProps extends IReview {
  createdAt: string;
}

const CustomerReviewCard = ({
  starRating,
  name,
  reviewText,
  createdAt,
}: CustomerReviewCardProps) => {
  return (
    <div className="rounded-[5px] border border-quaternary bg-white p-[20px]">
      <div className="mb-2">
        {/* Star rating */}
        <div className="flex text-lg">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <span key={star} className={star <= starRating ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm">{reviewText}</p>
      </div>

      <div className="text-xs text-gray-500">
        By {name} · {formateCreateOrUpdateDate(createdAt)}
      </div>
    </div>
  );
};

export default CustomerReviewCard;
