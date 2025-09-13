import dateUtils from "@/utils/date";
import { IReview } from "./CustomerReview";
import Image from "next/image";

interface CustomerReviewCardProps extends IReview {
  createdAt: string;
}

const CustomerReviewCard = ({
  starRating,
  images,
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
        By {name} · {dateUtils.formateCreateOrUpdateDate(createdAt)}
        {images && images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt={name}
                width={100}
                height={100}
                className="mt-2"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviewCard;
