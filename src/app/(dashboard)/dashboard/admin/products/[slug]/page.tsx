import TableInput from "@/components/ui/TableInput";
import { getPageMetaData } from "@/utils/meta";
import EditProductView from "@/views/Dashboard/Admin/EditProductView";

export const metadata = getPageMetaData("Edit Product");

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;

  return <EditProductView slug={resolvedParams.slug} />;
  return <TableInput />;
};

export default page;
