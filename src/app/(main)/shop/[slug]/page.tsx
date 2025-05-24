import { baseUrl } from "@/redux/api/api";
import { ICategory } from "@/types/category";
import CategoryProductView from "@/views/CategoryProductView";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/category/get/${slug}`);
  const data = (await res.json()) as { data: ICategory };

  if (!data) {
    console.log("not found");
  }
  return {
    title: data?.data?.label || "Shop | TailorTech",
  };
}

const page = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return <CategoryProductView {...props} />;
};

export default page;
