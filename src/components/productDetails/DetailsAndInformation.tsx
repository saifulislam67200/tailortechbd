import { IProduct } from "@/types/product";
import CustomerReview from "./CustomerReview";
import DetailsPageTOPProduct from "./DetailsPageTopProduct";
import QuestionAnswer from "./QuestionAnswer";
import Link from "next/link";

const DetailsAndInformation = ({ product }: { product: IProduct }) => {
  return (
    <section className="mt-[15px] flex flex-col gap-[13px] md:flex-row">
      <div className="w-full">
        <div className="flex items-center">
          {[
            { label: "Details", id: "" },
            { label: "Q&A", id: "question-answer-form" },
            { label: "Reviews", id: "customer-review-form" },
          ]?.map((item, index) => (
            <Link
              href={`#${item.id}`}
              key={index}
              className={`flex h-[35px] cursor-pointer items-center justify-center border border-quaternary px-[20px] text-[16px] font-bold ${item.label == "Details" ? "bg-primary text-white" : ""} `}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border border-quaternary bg-white p-[20px] text-black">
          <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
        </div>

        <QuestionAnswer productId={product?._id} />
        <CustomerReview productId={product?._id} />
      </div>

      <DetailsPageTOPProduct />
    </section>
  );
};

export default DetailsAndInformation;
