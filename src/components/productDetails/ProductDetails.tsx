import { ProductDetailsProps } from "@/app/(main)/products/[slug]/page";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";
import Breadcrumb from "../ui/BreadCrumbs";
import DetailedInfo from "./DetailedInfo";
import DetailsAndInformation from "./DetailsAndInformation";
import ProductDetailsSlider from "./ProductDetailSlider";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const slug = (await params)?.slug;

  const res = await fetch(`${baseUrl}/product/get/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = (await res.json()) as { data: IProduct };
  const product = data?.data;

  return (
    <div className="mx-auto max-w-[1756px] px-[16px] py-[10px] transition-all sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px]">
      <Breadcrumb />
      {product.name}
      <div className="mt-[10px] grid grid-cols-1 gap-[10px] lg:grid-cols-2">
        <ProductDetailsSlider product={product} />
        <DetailedInfo product={product} />
      </div>
      <DetailsAndInformation {...product} />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
