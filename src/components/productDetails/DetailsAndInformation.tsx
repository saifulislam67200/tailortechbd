import { IProduct } from "@/types/product";
import CustomerReview from "./CustomerReview";
// import DetailsPageTOPProduct from "./DetailsPageTopProduct";
import QuestionAnswer from "./QuestionAnswer";
import ScrollDetailsSection from "./ScrollDetailsSection";
import RelatedProducts from "./RelatedProducts";
const DetailsAndInformation = ({ product, slug }: { product: IProduct; slug: string }) => {
  return (
    <section>
      <p className="mt-[15px] text-[14px]">
        <span className="font-bold">NB:</span>The actual color of the physical product may slightly
        variation due to the deviation of lighting sources, photography or your device
        display settings. September 6, 2025
      </p>
      <div className="mt-[15px] flex flex-col gap-[13px] md:flex-row">
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

        <RelatedProducts slug={slug} />
      </div>
    </section>
  );
};

export default DetailsAndInformation;
