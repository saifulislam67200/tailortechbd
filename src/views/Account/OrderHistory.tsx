"use client";

import { useState } from "react";
import {
  IoChevronDown,
  IoCube,
  IoCarSport,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEye,
  IoDownload,
  IoTime,
} from "react-icons/io5";
import type { IOrder, IShippingAddress } from "@/types/order";
import { useGetMyOrdersQuery } from "@/redux/features/order/order.api";
import Image from "next/image";

export default function OrderHistory() {
  const { data } = useGetMyOrdersQuery();
  const orders = data?.data || [];
  console.log(orders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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
    return Math.floor(order.totalProductAmount + (order.deliveryFee || 0));
  };

  const formatAddress = (address: IShippingAddress) => {
    return `${address.address}, ${address.upazila}, ${address.district}, ${address.division}`;
  };

  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-muted bg-white p-[16px]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-gray-600">
            View all your order information here ({orders.length || 0} orders)
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <IoCube className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          orders?.map((order) => {
            const currentStatus = getCurrentStatus(order);
            const isExpanded = expandedOrder === order._id;

            return (
              <div
                key={order._id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <h3 className="font-semibold text-gray-900">{getOrderNumber(order)}</h3>
                        <div className="flex items-center gap-2">
                          <div
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
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
                      <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-4">
                        <span>Customer: {order.shippingAddress.name}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Total: Tk. {getTotalAmount(order)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{order.orderItems.length} items</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                        <IoDownload className="h-4 w-4" />
                        Invoice
                      </button>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        Details
                        <IoChevronDown
                          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-shrink-0 items-center gap-3 rounded-lg bg-gray-50 p-3"
                      >
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-medium text-gray-500">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Order Items */}
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
                            <IoCube className="h-4 w-4" />
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.orderItems.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
                              >
                                <Image
                                  src={item.product.image || "/placeholder.svg"}
                                  alt={item.product.name}
                                  width={64}
                                  height={64}
                                  className="h-16 w-16 rounded-md border object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                  <h5 className="mb-1 font-medium text-gray-900">
                                    {item.product.name}
                                  </h5>
                                  <div className="mb-2 flex items-center gap-3 text-sm text-gray-500">
                                    {item.size && (
                                      <span className="rounded bg-gray-100 px-2 py-1">
                                        Size: {item.size}
                                      </span>
                                    )}
                                    {item.color && (
                                      <span className="rounded bg-gray-100 px-2 py-1">
                                        Color: {item.color}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                      Qty: {item.quantity}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                      Tk. {Math.floor(item.product.price * item.quantity)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Info */}
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
                            <IoEye className="h-4 w-4" />
                            Order Information
                          </h4>
                          <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                              <span className="font-medium text-gray-600">Order Number:</span>
                              <span className="font-semibold text-gray-900">
                                {getOrderNumber(order)}
                              </span>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-100 py-2">
                              <span className="font-medium text-gray-600">Customer:</span>
                              <div className="text-right">
                                <div className="font-semibold text-gray-900">
                                  {order.shippingAddress.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {order.shippingAddress.phoneNumber}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-between border-b border-gray-100 py-2">
                              <span className="font-medium text-gray-600">Delivery Address:</span>
                              <span className="max-w-xs text-right font-semibold text-gray-900">
                                {formatAddress(order.shippingAddress)}
                              </span>
                            </div>
                            {order.billingAddress && (
                              <div className="flex items-start justify-between border-b border-gray-100 py-2">
                                <span className="font-medium text-gray-600">Billing Address:</span>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">
                                    {order.billingAddress.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {order.billingAddress.address}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {order.billingAddress.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="space-y-2 pt-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Product Amount:</span>
                                <span className="font-medium">
                                  Tk. {Math.floor(order.totalProductAmount)}
                                </span>
                              </div>
                              {order.deliveryFee && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Delivery Fee:</span>
                                  <span className="font-medium">
                                    Tk. {Math.floor(order.deliveryFee)}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-3">
                                <span className="text-lg font-semibold text-blue-800">
                                  Total Amount:
                                </span>
                                <span className="text-xl font-bold text-blue-900">
                                  Tk. {getTotalAmount(order)}
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
