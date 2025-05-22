import { TSearchParams } from "@/types";
import ShopProductView from "@/views/ShopProductView";
export async function generateMetadata({ searchParams }: TSearchParams) {
  const query = await searchParams;
  const searchTerm = query.searchTerm || "";

  return {
    title: searchTerm ? `${searchTerm} Items in shop` : "Shop",
  };
}
const page = async (props: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  return <ShopProductView {...props} />;
};

export default page;
