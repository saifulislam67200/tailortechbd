import { notFound } from "next/navigation";
import Breadcrumb from "../ui/BreadCrumbs";
import DetailedInfo from "./DetailedInfo";
import ProductDetailsSlider from "./ProductDetailSlider";
import { ProductDetailsProps } from "@/app/(main)/product-details/[slug]/page";
import DetailsAndInformation from "./DetailsAndInformation";

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const slug = (await params)?.slug;

  const res = await fetch(`http://localhost:5000/api/v1/product/get/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  console.log(product);
  return (
    <div className="mx-auto max-w-[1756px] px-[16px] py-[10px] transition-all sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px]">
      <Breadcrumb />
      <div className="mt-[10px] grid grid-cols-1 gap-[10px] lg:grid-cols-2">
        <ProductDetailsSlider {...product} />
        <DetailedInfo {...product} />
      </div>
      <DetailsAndInformation {...product} />
    </div>
  );
};

export default ProductDetails;
