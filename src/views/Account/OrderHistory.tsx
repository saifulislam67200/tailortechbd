"use client";

import OrderCard from "@/components/Account/Order/OrderCard";
import Loader from "@/components/ui/Loader";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import { IoCube } from "react-icons/io5";

export default function OrderHistory() {
  const { data, isLoading } = useGetMyOrdersQuery();
  const orders = data?.data || [];

  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-muted bg-white p-[8px] sm:p-[16px]">
      {/* Header */}
      <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[24px] font-bold">My Orders</h1>
          <p className="mt-[4px] text-[14px] text-muted">
            View all your order information here ({orders.length || 0} orders)
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-[16px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-[4px] text-center">
            <IoCube className="mx-auto mb-[16px] h-[64px] w-[64px] text-gray-300" />
            <h3 className="mb-[8px] text-[18px] font-medium text-primary">No orders found</h3>
            <p className="text-info">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          orders?.map((order) => <OrderCard order={order} key={order._id} />)
        )}
      </div>
    </div>
  );
}
