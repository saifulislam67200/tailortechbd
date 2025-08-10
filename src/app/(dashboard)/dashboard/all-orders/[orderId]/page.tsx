import ViewOrder from "@/components/Dashboard/ViewOrder/ViewOrder";

const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const resolvedParams = await params;

  return <ViewOrder orderId={resolvedParams.orderId} />;
};

export default page;
