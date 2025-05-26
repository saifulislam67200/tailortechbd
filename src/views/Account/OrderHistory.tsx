"use client";

import { useState } from "react";
import {
  IoChevronDown,
  IoCube,
  IoCarSport,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEye,
  // IoDownload,
  IoTime,
} from "react-icons/io5";
import type { IOrder, IShippingAddress } from "@/types/order";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import ReviewForm from "@/components/Account/review/ReviewForm";
import { IProduct } from "@/types/product";

export default function OrderHistory() {
  const { data, isLoading } = useGetMyOrdersQuery();
  const orders = data?.data || [];
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [productToReview, setProductToReview] = useState<{
    item: Partial<IProduct> & { product_id: string };
    orderId: string;
  }>({
    item: { product_id: "" },
    orderId: "",
  });

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getCurrentStatus = (order: IOrder) => {
    return order.status[order.status.length - 1]?.status || "pending";
  };

  const getOrderNumber = (order: IOrder) => {
    return `ORD-${order._id.slice(-8).toUpperCase()}`;
  };

  const getTotalAmount = (order: IOrder) => {
    return Math.round(order.totalProductAmount + (order.deliveryFee || 0));
  };

  const formatAddress = (address: IShippingAddress) => {
    return `${address.address}, ${address.upazila}, ${address.district}, ${address.division}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReviewClick = (item: any, orderId: string) => {
    setProductToReview({ item: item, orderId: orderId });
    setIsReviewOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-muted bg-white p-[16px]">
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
          orders?.map((order) => {
            const currentStatus = getCurrentStatus(order);
            const isExpanded = expandedOrder === order._id;

            return (
              <div key={order._id} className="rounded-lg border border-border-main bg-white">
                {/* Order Header */}
                <div className="p-[16px]">
                  <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[16px]">
                        <h3 className="font-semibold text-primary">{getOrderNumber(order)}</h3>
                        <div className="flex items-center gap-[8px]">
                          <div
                            className={`inline-flex items-center gap-1 rounded-full px-[8px] py-[4px] text-[12px] font-medium ${
                              currentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : currentStatus === "on-delivery"
                                  ? "bg-purple-100 text-purple-800"
                                  : currentStatus === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : currentStatus === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {currentStatus === "pending" ? (
                              <IoTime className="h-3 w-3" />
                            ) : currentStatus === "on-delivery" ? (
                              <IoCarSport className="h-3 w-3" />
                            ) : currentStatus === "delivered" ? (
                              <IoCheckmarkCircle className="h-3 w-3" />
                            ) : currentStatus === "cancelled" ? (
                              <IoCloseCircle className="h-3 w-3" />
                            ) : null}
                            {currentStatus === "pending"
                              ? "Pending"
                              : currentStatus === "on-delivery"
                                ? "On Delivery"
                                : currentStatus === "delivered"
                                  ? "Delivered"
                                  : currentStatus === "cancelled"
                                    ? "Cancelled"
                                    : "Unknown"}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[8px] flex flex-col gap-1 text-[14px] text-muted sm:flex-row sm:items-center sm:gap-[16px]">
                        <span>Customer: {order.shippingAddress.name}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Total: ৳ {getTotalAmount(order)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{order.orderItems.length} items</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-[8px]">
                      {/* <button className="inline-flex cursor-pointer items-center gap-[8px] rounded-lg bg-gray-100 px-[12px] py-[8px] text-[14px] font-medium text-primary transition-colors hover:bg-gray-200">
                        <IoDownload className="h-[16px] w-[16px]" />
                        Invoice
                      </button> */}
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="inline-flex cursor-pointer items-center gap-[8px] rounded-lg bg-primary px-[12px] py-[8px] text-[14px] font-medium text-white transition-colors"
                      >
                        Details
                        <IoChevronDown
                          className={`h-[16px] w-[16px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="px-[24px] pb-[16px]">
                  <div className="flex items-center gap-[12px] overflow-x-auto">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-shrink-0 items-center gap-[12px] rounded-lg bg-gray-50 p-[12px]"
                      >
                        <Image
                          src={item.product.image || "/avatar.png"}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="h-[48px] w-[48px] rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-medium">{item.product.name}</p>
                          <p className="text-[12px] text-muted">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-[12px] font-medium text-muted">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="border-t border-border-main bg-gray-50">
                    <div className="p-[24px]">
                      <div className="grid gap-[24px] md:grid-cols-2">
                        {/* Order Items */}
                        <div>
                          <h4 className="mb-[12px] flex items-center gap-[8px] font-medium">
                            <IoCube className="h-[16px] w-[16px]" />
                            Order Items
                          </h4>
                          {isReviewOpen ? (
                            <ReviewForm
                              productToReview={productToReview}
                              setIsReviewOpen={setIsReviewOpen}
                            />
                          ) : (
                            <div className="space-y-[12px]">
                              {order.orderItems.map((item, index) => (
                                <div
                                  key={index}
                                  className="relative flex flex-col items-center gap-[12px] rounded-lg border border-border-muted bg-white p-[16px] sm:flex-row"
                                >
                                  <Image
                                    src={item.product.image || "/avatar.png"}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="h-[64px] w-[64px] rounded-md border object-cover"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <h5 className="mb-[4px] font-medium">{item.product.name}</h5>
                                    <div className="sm:text-[14px]text-[12px] mb-[8px] flex items-center gap-[12px] text-[12px] text-muted md:text-[14px]">
                                      {item.size && (
                                        <span className="rounded bg-gray-100 px-[8px] py-[4px]">
                                          Size: {item.size}
                                        </span>
                                      )}
                                      {item.color && (
                                        <span className="rounded bg-gray-100 px-[8px] py-[4px]">
                                          Color: {item.color}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-[14px] text-info">
                                        Qty: {item.quantity}
                                      </span>
                                      <span className="text-[18px] font-semibold">
                                        ৳ {Math.round(item.product.price * item.quantity)}
                                      </span>
                                    </div>
                                  </div>
                                  {/* // review button */}
                                  {currentStatus !== "delivered" && (
                                    <button
                                      onClick={() => handleReviewClick(item, order?._id)}
                                      className="absolute top-2 right-2 flex h-[30px] w-[70px] cursor-pointer items-center justify-center rounded-[5px] border border-quaternary px-2 text-info transition-colors duration-200 hover:border-primary hover:text-primary"
                                      aria-label="Give Review"
                                    >
                                      Review
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Order Info */}
                        <div>
                          <h4 className="mb-[12px] flex items-center gap-[8px] font-medium text-primary">
                            <IoEye className="h-[16px] w-[16px]" />
                            Order Information
                          </h4>
                          <div className="rounded-lg border border-border-muted bg-white p-[16px]">
                            <div className="sm:text-[14px]text-[12px] flex items-center justify-between border-b border-border-muted pb-[12px] text-[12px] md:text-[14px]">
                              <span className="font-medium text-info">Order Number:</span>
                              <span className="font-semibold text-primary">
                                {getOrderNumber(order)}
                              </span>
                            </div>
                            <div className="sm:text-[14px]text-[12px] flex items-start justify-between border-b border-border-muted py-[12px] text-[12px] md:text-[14px]">
                              <span className="font-medium text-info">Customer:</span>
                              <div className="text-right">
                                <div className="font-semibold text-primary">
                                  {order.shippingAddress.name}
                                </div>
                                <div className="sm:text-[14px]text-[12px] text-[12px] text-info md:text-[14px]">
                                  {order.shippingAddress.phoneNumber}
                                </div>
                              </div>
                            </div>
                            <div className="sm:text-[14px]text-[12px] flex items-start justify-between border-b border-border-muted py-[12px] text-[12px] md:text-[14px]">
                              <span className="font-medium text-info">Delivery Address:</span>
                              <span className="max-w-[320px] text-right font-semibold text-primary">
                                {formatAddress(order.shippingAddress)}
                              </span>
                            </div>
                            {order.billingAddress && (
                              <div className="sm:text-[14px]text-[12px] flex items-start justify-between border-b border-border-muted py-[4px] text-[12px] md:text-[14px]">
                                <span className="font-medium text-info">Billing Address:</span>
                                <div className="text-right">
                                  <div className="font-semibold text-primary">
                                    {order.billingAddress.name}
                                  </div>
                                  <div className="sm:text-[14px]text-[12px] text-[12px] text-info md:text-[14px]">
                                    {order.billingAddress.address}
                                  </div>
                                  <div className="sm:text-[14px]text-[12px] text-[12px] text-info md:text-[14px]">
                                    {order.billingAddress.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="sm:text-[14px]text-[12px] space-y-[8px] pt-[8px] text-[12px] md:text-[14px]">
                              <div className="flex justify-between">
                                <span className="text-info">Product Amount:</span>
                                <span className="font-semibold text-primary">
                                  ৳ {Math.round(order.totalProductAmount)}
                                </span>
                              </div>
                              {order.deliveryFee && (
                                <div className="flex justify-between">
                                  <span className="text-info">Delivery Fee:</span>
                                  <span className="font-semibold text-primary">
                                    ৳ {Math.round(order.deliveryFee)}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-[12px]">
                                <span className="primary text-[14px] font-semibold sm:text-[16px]">
                                  Total Amount:
                                </span>
                                <span className="text-[14px]sm:text-[16px] font-bold">
                                  ৳ {getTotalAmount(order)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
