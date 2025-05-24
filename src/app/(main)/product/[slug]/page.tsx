import ProductDetails from "@/components/productDetails/ProductDetails";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/product/get/${slug}`, { cache: "no-store" });

  const data = (await res.json()) as { data: IProduct };

  if (!data) {
    console.log("not found");
  }
  return {
    title: data?.data?.name || "Details | TailorTech",
    description: data?.data?.description || "Product Details",
  };
}

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
  return <ProductDetails {...props} />;
};

export default ProductPage;
