import ShopViewFallBack from "@/components/Shop/ShopViewFallBack";
import { baseUrl } from "@/redux/api/api";
import { ICategory } from "@/types/category";
import CategoryShopProductView from "@/views/CategoryShopProductView";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/category/get/${slug}`);
  const data = (await res.json()) as { data: ICategory };

  return {
    title: data?.data?.label || "Shop | TailorTech",
  };
}

const page = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <Suspense fallback={<ShopViewFallBack />}>
      <CategoryShopProductView {...props} />;
    </Suspense>
  );
};

export default page;
