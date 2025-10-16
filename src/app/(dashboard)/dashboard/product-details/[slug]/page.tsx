import ProductDetailsAdmin from "@/components/productDetails/ProductDetailsAdmin";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/product/get/${slug}`, { cache: "no-store" });

  const data = (await res.json()) as { data: IProduct };

  return {
    title: data?.data?.name || "Details | Tailortech",
    description: data?.data?.description || "Product Details",
  };
}

const page = async (props: { params: Promise<{ slug: string }> }) => {
  return <ProductDetailsAdmin {...props} />;
};

export default page;
