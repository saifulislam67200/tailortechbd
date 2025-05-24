import { getPageMetaData } from "@/utils/meta";
import EditProductView from "@/views/Dashboard/EditProductView";

export const metadata = getPageMetaData("Edit Product");

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;

  return <EditProductView slug={resolvedParams.slug} />;
};

export default page;
