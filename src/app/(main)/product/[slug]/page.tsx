import ProductDetails from "@/components/productDetails/ProductDetails";
import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import type { Metadata } from "next";

export interface ProductDetailsProps {
  params: { slug: string };
}

async function getProductMeta(slug: string) {
  const res = await fetch(`${baseUrl}/product/get/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Product Not Found",
      description: "No details available for this product.",
    };
  }

  const data = (await res.json()) as { data: IProduct };
  return {
    title: data.data.name || `Product: ${slug}`,
    description: data.data.description || `Details and information about product ${slug}.`,
  };
}

export async function generateMetadata(props: Promise<ProductDetailsProps>): Promise<Metadata> {
  const { params } = await props;
  const meta = await getProductMeta(params.slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

const page = ({ params }: ProductDetailsProps) => {
  return (
    <>
      <ProductDetails params={params} />
    </>
  );
};

export default page;
