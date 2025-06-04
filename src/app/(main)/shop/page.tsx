import ShopViewFallBack from "@/components/Shop/ShopViewFallBack";
import { TSearchParams } from "@/types";
import ShopProductView from "@/views/ShopProductView";
import { Suspense } from "react";
export async function generateMetadata({ searchParams }: TSearchParams) {
  const query = await searchParams;
  const searchTerm = query.searchTerm || "";

  return {
    title: searchTerm ? `${searchTerm} Items in shop` : "Shop",
  };
}
const page = async (props: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  return (
    <Suspense fallback={<ShopViewFallBack />}>
      <ShopProductView {...props} />
    </Suspense>
  );
};

export default page;
