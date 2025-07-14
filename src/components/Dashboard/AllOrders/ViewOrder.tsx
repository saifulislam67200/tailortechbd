"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import {
  useChangeOrderStatusMutation,
  useUpdateOrderMutation,
} from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IOrder, IOrderStatus } from "@/types/order";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { ImSpinner11 } from "react-icons/im";
import {
  MdCancel,
  MdCheckCircle,
  MdLocalShipping,
  MdPending,
  MdRunningWithErrors,
} from "react-icons/md";
import { toast } from "sonner";
import AddNewItemOnOrder from "./AddNewItemOnOrder";
import { PiKeyReturnFill } from "react-icons/pi";
import { RiExchangeFill, RiRefundFill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import InvoiceModal from "./InvoiceModal";
const statuses = [
  {
    id: "pending",
    label: "Pending",
    icon: MdPending,
    color: "text-blue-400",
    bgColor: "bg-blue-100",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    icon: IoCheckmarkDoneCircle,
    color: "text-purple-800",
    bgColor: "bg-success/10",
  },
  {
    id: "processing",
    label: "Processing",
    icon: MdRunningWithErrors,
    color: "text-orange-800",
    bgColor: "bg-orange-100",
  },
  {
    id: "on-delivery",
    label: "On-Delivery",
    icon: MdLocalShipping,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: MdCheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "cancelled",
    label: "Cancelled",
    icon: MdCancel,
    color: "text-danger",
    bgColor: "bg-danger/10",
  },
  {
    id: "exchange",
    label: "Exchange",
    icon: RiExchangeFill,
    color: "text-blue-800",
    bgColor: "bg-blue-100",
  },
  {
    id: "returned",
    label: "Returned",
    icon: PiKeyReturnFill,
    color: "text-yellow-800",
    bgColor: "bg-yellow-100",
  },
  {
    id: "refunded",
    label: "Refunded",
    icon: RiRefundFill,
    color: "text-indigo-800",
    bgColor: "bg-indigo-100",
  },
];
type ViewOrderProps = {
  setIsViewOrder: React.Dispatch<React.SetStateAction<boolean>>;
  orderItem: IOrder;
};

export default function ViewOrder({ setIsViewOrder, orderItem }: ViewOrderProps) {
  const [initialOrderItemView, setInitialOrderItemView] = useState(orderItem);

  const [changeOrderStatus, { isLoading }] = useChangeOrderStatusMutation();

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState<IOrderStatus["status"]>("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItemView, setOrderItemView] = useState(orderItem);
  const checkCurrentStatus = orderItemView.status[orderItemView.status.length - 1];
  const [currentStatus, setCurrentStatus] = useState(checkCurrentStatus?.status);
  const [showInvoiceButton, setShowInvoiceButton] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleStatusChange = async () => {
    if (selectedStatus === currentStatus) return;

    const result = await changeOrderStatus({
      id: orderItemView?._id || "",
      data: { status: selectedStatus },
    });
    const error = result.error;

    if (error) {
      const errorMessage =
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
          ? (error.data as { message?: string }).message
          : "Something went wrong, please try again later!";
      toast.error(errorMessage || "Something went wrong, please try again later!");
      return;
    }

    // ======= update local state to reflect the new status ========>
    const newStatusEntry = {
      status: selectedStatus,
      createdAt: new Date().toISOString(),
    };

    setOrderItemView((prev: IOrder) => ({
      ...prev,
      status: [newStatusEntry, ...prev.status], // ========= add the new status at the beginning =======>
    }));

    setCurrentStatus(selectedStatus);
    setIsModalOpen(false);
    toast.success("Order status changed successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRemoveOrderItem = (OrderitemIndex: number) => {
    const updatedOrderItems = orderItemView.orderItems.filter(
      (item, index) => index !== OrderitemIndex
    );

    setOrderItemView({
      ...orderItemView,
      orderItems: updatedOrderItems,
    });

    setInitialOrderItemView({
      ...initialOrderItemView,
      orderItems: updatedOrderItems,
    });
  };

  const handleUpdate = async () => {
    const totalAmount = orderItemView.orderItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const updatedData = {
      ...orderItemView,
      totalProductAmount: totalAmount,
    };

    const res = await updateOrder({
      data: updatedData,
      id: orderItemView?._id || "",
    });
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    setOrderItemView(res.data?.data || updatedData);
    setInitialOrderItemView(res.data?.data || updatedData);
    toast.success("Order updated successfully");
  };

  useEffect(() => {
    if (!orderItem?.status || !Array.isArray(orderItem.status)) {
      setShowInvoiceButton(false);
      return;
    }
    const hasProcessing = orderItem.status.some((statusObj) => {
      const status = String(statusObj?.status || "")
        .toLowerCase()
        .trim();
      return status.includes("processing");
    });

    setShowInvoiceButton(hasProcessing);
  }, [orderItem?.status]);

  return (
    <div className="mb-32 rounded-md bg-white p-6">
      <button
        onClick={() => setIsViewOrder(false)}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary sm:text-[24px]">Orders List</h2>
              {showInvoiceButton && <InvoiceModal orderItem={orderItem} />}
            </div>
            <p className="text-info">ORD-${orderItemView?._id?.slice(-8).toUpperCase()}</p>
          </div>

          <div className="relative mb-8">
            {statuses?.map((status, index) => {
              const isActive = currentStatus === status.id;
              const isPast = statuses.findIndex((s) => s.id === currentStatus) > index;
              const statusData = orderItemView?.status?.find(
                (s: IOrderStatus) => s.status === status.id
              );

              return (
                <div key={status.id} className="relative mb-8 flex">
                  {index < statuses.length - 1 && (
                    <div
                      className={`absolute top-10 left-6 -z-10 h-full w-0.5 ${
                        isPast || isActive ? status.bgColor : "bg-gray-200"
                      }`}
                    />
                  )}

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      isPast || isActive
                        ? status.bgColor + ` ${status.color}`
                        : "bg-gray-200 text-dashboard"
                    }`}
                  >
                    <status.icon className="h-6 w-6" />
                  </div>

                  <div className="ml-4">
                    <h3
                      className={`font-semibold ${isActive || isPast ? status.color : "text-muted"}`}
                    >
                      {status.label}
                    </h3>
                    {statusData?.createdAt && (
                      <p className="text-sm text-gray-500">{formatDate(statusData.createdAt)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-md border border-border-muted bg-gray-50 p-4">
            <h3 className="mb-4 font-medium">Change Status</h3>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as IOrderStatus["status"]);
                setIsModalOpen(true);
              }}
              className="w-full rounded-md border border-border-muted bg-white p-2 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-[#ECE3D2] focus:outline-none"
            >
              <option value="" disabled>
                Select Status
              </option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="col-span-full grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Customer Information */}
              <div className="rounded-md border border-border-muted bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold text-dashboard">Customer Information</h2>

                <div className="space-y-2">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-border-muted object-cover object-center">
                    <Image
                      src={"/images/avatar.jpg"}
                      width={100}
                      height={100}
                      alt={`${orderItemView?.shippingAddress?.name || "Customer"} avatar`}
                    />
                  </div>

                  <p>
                    <span className="text-[14px] font-[700] text-primary">Name: </span>
                    {orderItemView?.shippingAddress?.name}
                  </p>
                  <p>
                    <span className="text-[14px] font-[700] text-primary">Call: </span>
                    <Link
                      className="hover:underline"
                      href={`tel:${orderItemView?.shippingAddress?.phoneNumber}`}
                    >
                      {orderItemView?.shippingAddress?.phoneNumber || "N/A"}
                    </Link>
                  </p>
                </div>
              </div>
              {/* Shipping Information */}
              <div className="w-full rounded-md border border-border-muted bg-white p-6">
                <h2 className="mb-[16px] text-[20px] font-semibold text-dashboard">
                  Shipping Information
                </h2>
                <div className="w-full space-y-2">
                  <p>
                    <span className="text-[14px] font-[700] text-primary">Name: </span>
                    {orderItemView?.shippingAddress?.name}
                  </p>
                  <p>
                    <span className="text-[14px] font-[700] text-primary">Division: </span>
                    {orderItemView?.shippingAddress?.division}
                  </p>
                  <p>
                    <span className="text-[14px] font-[700] text-primary">District: </span>
                    {orderItemView?.shippingAddress?.district}
                  </p>
                  <p>
                    <span className="text-[14px] font-[700] text-primary">Upazila/City: </span>
                    {orderItemView?.shippingAddress?.upazila}
                  </p>
                  <p className="flex w-full flex-col gap-[10px]">
                    <span className="text-[14px] font-[700] text-primary">Shipping Address: </span>
                    <span className="w-full rounded-[5px] bg-primary/5 p-[8px]">
                      {orderItemView?.shippingAddress?.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* // billing information start here   */}
            {orderItemView?.billingAddress && (
              <div className="rounded-md border border-border-muted p-4">
                <h2 className="mb-[16px] text-[20px] font-semibold text-dashboard">
                  Billing Information
                </h2>
                <div className="space-y-2">
                  <p className="text-[14px] text-primary md:text-[16px]">
                    <span className="font-[600]">Name:</span> {orderItemView?.billingAddress?.name}
                  </p>
                  <p className="text-[14px] text-primary md:text-[16px]">
                    <span className="font-[600]">Address:</span>{" "}
                    {orderItemView?.billingAddress?.address}
                  </p>
                  <p className="text-[14px] text-primary md:text-[16px]">
                    <span className="font-[600]">Phone Number:</span>{" "}
                    {orderItemView?.billingAddress?.phoneNumber}
                  </p>
                </div>
              </div>
            )}

            {/* billing information end here  */}
          </div>
          {/* order Item */}
          <div className="mt-6 mb-6 rounded-md border border-border-muted bg-white p-6">
            <div className="mb-[10px] flex w-full items-center justify-between">
              <h2 className="text-xl font-semibold">Order Items</h2>
              {currentStatus === "pending" ? (
                <Button
                  className={`${isEditMode ? "bg-danger text-white" : "bg-success text-white"}`}
                  onClick={() => {
                    if (isEditMode) {
                      setOrderItemView(initialOrderItemView);
                    }
                    setIsEditMode(!isEditMode);
                  }}
                >
                  {isEditMode ? "Cancel Edit" : "Edit Items"}
                </Button>
              ) : (
                ""
              )}
            </div>
            <div className="w-full space-y-4">
              {orderItemView?.orderItems?.map((item, i) => (
                <div
                  key={item?.product_id}
                  className="flex w-full items-center justify-between gap-[10px] rounded-md border border-border-muted bg-white p-[16px]"
                >
                  <div className="flex items-center gap-[16px]">
                    <div className="overflow-hidden rounded-md bg-slate-200">
                      <Image
                        src={item?.product?.image || "/images/avatar.jpg"}
                        width={100}
                        height={100}
                        alt={`${item?.product?.name || "Product"} image`}
                        className="h-16 w-16 object-contain object-center"
                      />
                    </div>
                    <div>
                      <p className="text-[14px]">
                        <span className="font-semibold text-primary">Name: </span>
                        {item?.product?.name}
                      </p>
                      <p className="text-[14px]">
                        <span className="font-semibold text-primary">Quantity: </span>
                        {item?.quantity}
                      </p>
                      {item?.color ? (
                        <p className="text-[14px]">
                          <span className="font-semibold text-primary">Color: </span>
                          {item?.color}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {isEditMode ? (
                    <button
                      className="shrink-0 cursor-pointer bg-danger/10 p-[5px] text-danger"
                      onClick={() => handleRemoveOrderItem(i)}
                    >
                      <FaTrashAlt />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))}
              {isEditMode ? (
                <div className="flex w-full items-center justify-between gap-[10px]">
                  <AddNewItemOnOrder
                    onAddItem={(item) =>
                      setOrderItemView({
                        ...orderItemView,
                        orderItems: [...orderItemView.orderItems, item],
                      })
                    }
                  />
                  <div className="flex items-center justify-start gap-[10px]">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="flex cursor-pointer items-center gap-[5px] text-[14px] text-primary hover:underline disabled:cursor-not-allowed"
                    >
                      Save changes {isUpdating ? <ImSpinner11 className="animate-spin" /> : ""}
                    </button>
                    <button
                      className="cursor-pointer text-[14px] text-primary hover:underline"
                      onClick={() => setOrderItemView(initialOrderItemView)}
                    >
                      Undo changes
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* order summery */}
          <div className="rounded-md border border-border-muted bg-white p-6">
            <h2 className="mb-[16px] text-[20px] font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <p>
                <span className="text-[14px] font-[700] text-primary">Total Amount: </span>
                {Math.round(orderItemView?.totalProductAmount || 0)} BDT
              </p>
              <p>
                <span className="text-[14px] font-[700] text-primary">Payment Status: </span>
                {/* {orderItemView?.paymentStatus || "COD"} */}
                COD
              </p>
              <p>
                <span className="text-[14px] font-[700] text-primary">Date: </span>
                {orderItemView?.createdAt
                  ? new Date(orderItemView.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <DialogProvider
        setState={setIsModalOpen}
        state={isModalOpen}
        className="w-full max-w-[500px]"
      >
        <div className="flex w-full flex-col gap-[12px] rounded-[8px] bg-white p-[16px]">
          <h1 className="mb-1 text-[22px] text-dashboard">Are you sure?</h1>
          <p>
            Want to change status to <span className="font-bold">{selectedStatus}</span>?
          </p>
          <div className="mt-10 flex items-center justify-between gap-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full cursor-pointer rounded bg-gray-300 px-4 py-2 text-gray-700"
            >
              No
            </button>
            <Button
              isLoading={isLoading}
              onClick={handleStatusChange}
              className="w-full rounded bg-dashboard/80 px-4 py-2 text-white"
            >
              Confrim
            </Button>
          </div>
        </div>
      </DialogProvider>
    </div>
  );
}
