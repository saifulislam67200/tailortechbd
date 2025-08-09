import ViewOrder from "@/components/Dashboard/AllOrders/ViewOrder";
import React from "react";

const page = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const resolvedParams = await params;

  return <ViewOrder orderId={resolvedParams.orderId} />;
};

export default page;
