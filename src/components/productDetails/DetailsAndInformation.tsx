import { IProduct } from "@/types/product";
import CustomerReview from "./CustomerReview";
// import DetailsPageTOPProduct from "./DetailsPageTopProduct";
import QuestionAnswer from "./QuestionAnswer";
import ScrollDetailsSection from "./ScrollDetailsSection";
const DetailsAndInformation = ({ product }: { product: IProduct }) => {
  return (
    <section className="mt-[15px] flex flex-col gap-[13px] md:flex-row">
      <div className="w-full">
        <ScrollDetailsSection />
        <div
          id="product-description"
          className="border border-quaternary bg-white p-[20px] text-black"
          dangerouslySetInnerHTML={{ __html: product?.description || "" }}
        ></div>

        <QuestionAnswer productId={product?._id} />
        <CustomerReview productId={product?._id} />
      </div>

      {/* <DetailsPageTOPProduct /> */}
    </section>
  );
};

export default DetailsAndInformation;
