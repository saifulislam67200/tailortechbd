import Title from "../ui/Title";
import CustomerReviewCard from "./CustomerReviewCard";
import CustomerReviewForm from "./CustomerReviewForm";

export interface IReview {
  productId: string;
  userId: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  name: string;
  reviewText: string;
}

const productReviews = [
  {
    _id: "651a72b8c8f4a1a2b3c4d5e1",
    productId: "651a72b8c8f4a1a2b3c4d5f1",
    userId: "651a72b8c8f4a1a2b3c4d5g1",
    starRating: 5,
    name: "Siam Mann",
    reviewText:
      "Very good printer, works perfectly for my home office setup. The print quality is excellent!",
    createdAt: "2022-10-15T10:30:00.000Z",
  },
  {
    _id: "651a72b8c8f4a1a2b3c4d5e2",
    productId: "651a72b8c8f4a1a2b3c4d5f1",
    userId: "651a72b8c8f4a1a2b3c4d5g2",
    starRating: 4,
    name: "Alex Johnson",
    reviewText: "Good printer overall, but the ink cartridges run out faster than I expected.",
    createdAt: "2022-11-05T14:45:00.000Z",
  },
  {
    _id: "651a72b8c8f4a1a2b3c4d5e3",
    productId: "651a72b8c8f4a1a2b3c4d5f1",
    userId: "651a72b8c8f4a1a2b3c4d5g3",
    starRating: 3,
    name: "Maria Garcia",
    reviewText: "Average performance. Sometimes jams when printing multiple pages.",
    createdAt: "2022-12-20T09:15:00.000Z",
  },
  {
    _id: "651a72b8c8f4a1a2b3c4d5e4",
    productId: "651a72b8c8f4a1a2b3c4d5f1",
    userId: "651a72b8c8f4a1a2b3c4d5g4",
    starRating: 5,
    name: "James Wilson",
    reviewText:
      "Absolutely love this printer! The wireless setup was super easy and the mobile printing works flawlessly.",
    createdAt: "2023-01-10T16:20:00.000Z",
  },
  {
    _id: "651a72b8c8f4a1a2b3c4d5e5",
    productId: "651a72b8c8f4a1a2b3c4d5f1",
    userId: "651a72b8c8f4a1a2b3c4d5g5",
    starRating: 2,
    name: "Sarah Kim",
    reviewText:
      "Disappointed with the print quality. Colors don't come out as vibrant as advertised.",
    createdAt: "2023-02-28T11:10:00.000Z",
  },
];

const CustomerReview = ({ productId }: { productId: string }) => {
  return (
    <>
      {/* // customer review */}
      <Title title="CUSTOMER REVIEW" className="mt-[10px] !text-[14px]" />

      <div className="mt-[10px] space-y-[10px]">
        {productReviews?.map((item) => (
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
