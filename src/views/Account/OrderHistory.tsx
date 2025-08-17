"use client";

import ReviewForm from "@/components/Account/review/ReviewForm";
import Loader from "@/components/ui/Loader";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import type { IOrder, IShippingAddress } from "@/types/order";
import { IProduct } from "@/types/product";
import dateUtils from "@/utils/date";
import GetStatusStyleAndIcon from "@/utils/GetStatusStyleAndIcon";
import Image from "next/image";
import { useState } from "react";
import { IoChevronDown, IoCube, IoEye } from "react-icons/io5";

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
          orders?.map((order) => {
            const currentStatus = getCurrentStatus(order);
            const { bg, text, icon, label } = GetStatusStyleAndIcon(currentStatus);

            const isExpanded = expandedOrder === order._id;

            return (
              <div key={order._id} className="rounded-lg border border-border-main bg-white">
                {/* Order Header */}
                <div className="p-[8px] sm:p-[16px]">
                  <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:gap-[16px]">
                        <h3 className="font-semibold text-primary">{order.orderId}</h3>
                        <div className="flex items-center gap-[8px]">
                          <div
                            className={`inline-flex items-center gap-1 rounded-full px-[8px] py-[4px] text-[12px] font-medium ${bg} ${text}`}
                          >
                            {icon}
                            {label}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[8px] flex flex-col gap-1 text-[14px] text-muted sm:flex-row sm:items-center sm:gap-[16px]">
                        <span>
                          Order Date: {dateUtils.formateCreateOrUpdateDate(order.createdAt)}
                        </span>
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
                {!isExpanded ? (
                  <div className="px-[8px] pb-[16px] sm:px-[24px]">
                    <div className="flex w-full flex-col gap-[12px] sm:flex-row sm:flex-wrap sm:items-center">
                      {order.orderItems.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex w-full flex-shrink-0 items-center gap-[12px] rounded-lg border border-quaternary bg-gray-50 p-[8px] sm:w-fit sm:p-[12px]"
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
                      {order.orderItems.length > 1 && (
                        <div className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-[12px] font-medium text-muted">
                          +{order.orderItems.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="border-t border-border-main bg-gray-50">
                    <div className="p-[8px] sm:p-[24px]">
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
                                  className="relative flex flex-row items-center gap-[4px] rounded-lg border border-border-muted bg-white p-[8px] sm:gap-[12px] sm:p-[16px]"
                                >
                                  <Image
                                    src={item.product.image || "/avatar.png"}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="h-[50px] w-[50px] rounded-md border object-cover sm:h-[64px] sm:w-[64px]"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <h5 className="text-[14px] sm:text-[16px] sm:font-medium">
                                      {item.product.name}
                                    </h5>
                                    <p className="mb-[4px] text-[14px] text-info">
                                      Product Id:{" "}
                                      {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (item as any)?.product?.sku
                                      }
                                    </p>

                                    <div className="mb-[8px] flex items-center gap-[4px] text-[10px] text-muted sm:gap-[12px] sm:text-[14px] md:text-[14px]">
                                      {item.size && (
                                        <span className="rounded bg-gray-100 px-[4px] py-[3px] sm:px-[8px] sm:py-[4px]">
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
                                      <span className="text-[12px] text-info sm:text-[14px]">
                                        Qty: {item.quantity}
                                      </span>
                                      <span className="text-[14px] font-semibold sm:text-[16px]">
                                        ৳ {Math.round(item.product.price * item.quantity)}
                                      </span>
                                    </div>
                                  </div>
                                  {/* // review button */}
                                  {currentStatus == "delivered" && (
                                    <button
                                      onClick={() => handleReviewClick(item, order?._id)}
                                      className="absolute top-2 right-2 z-10 flex cursor-pointer items-center justify-center rounded-[3px] border border-quaternary bg-white px-2 text-[10px] text-info transition-colors duration-200 hover:border-primary hover:text-primary sm:h-[30px] sm:w-[70px] sm:rounded-[5px] sm:text-[14px]"
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
                          <div className="mb-[24px] rounded-lg border border-border-muted bg-white p-[16px]">
                            <div className="sm:text-[14px]text-[12px] flex items-center justify-between border-b border-border-muted pb-[12px] text-[12px] md:text-[14px]">
                              <span className="font-medium text-info">Order Number:</span>
                              <span className="font-semibold text-primary">{order.orderId}</span>
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

                          {order?.billingAddress && (
                            <div className="rounded-md border border-border-muted bg-white p-4">
                              <h2 className="mb-[10px] text-[16px] font-semibold text-black">
                                Billing Information
                              </h2>
                              <div className="space-y-2">
                                <p className="text-[14px] text-black md:text-[16px]">
                                  <span className="font-[600] text-info">Name:</span>{" "}
                                  {order?.billingAddress?.name}
                                </p>
                                <p className="text-[14px] text-black md:text-[16px]">
                                  <span className="font-[600] text-info">Address:</span>{" "}
                                  {order?.billingAddress?.address}
                                </p>
                                <p className="text-[14px] text-black md:text-[16px]">
                                  <span className="font-[600] text-info">Phone Number:</span>{" "}
                                  {order?.billingAddress?.phoneNumber}
                                </p>
                              </div>
                            </div>
                          )}
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
