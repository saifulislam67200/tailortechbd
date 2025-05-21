import { notFound } from "next/navigation";
import Breadcrumb from "../ui/BreadCrumbs";
import DetailedInfo from "./DetailedInfo";
import ProductDetailsSlider from "./ProductDetailSlider";
import { ProductDetailsProps } from "@/app/(main)/product-details/[slug]/page";


const ProductDetails = async ({ params }: ProductDetailsProps) => {
    const slug = params?.slug;

    const res = await fetch(`http://localhost:5000/api/v1/product/get/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) return notFound();

    const product = await res.json();

    console.log(product)
    return (
        <div className="max-w-[1756px] mx-auto px-[16px] sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px] transition-all py-[10px]">
            <Breadcrumb />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] mt-[10px]">
                <ProductDetailsSlider />
                <DetailedInfo />
            </div>
        </div>
    )
};

export default ProductDetails;