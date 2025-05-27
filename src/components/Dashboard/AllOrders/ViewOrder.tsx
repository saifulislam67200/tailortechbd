"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useChangeOrderStatusMutation } from "@/redux/features/order/order.api";
import { IOrder, IOrderStatus } from "@/types/order";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPending } from "react-icons/md";
import { toast } from "sonner";

type ViewOrderProps = {
  setIsViewOrder: React.Dispatch<React.SetStateAction<boolean>>;
  orderItemView: IOrder;
};

export default function ViewOrder({
  setIsViewOrder,
  orderItemView: initialOrderItemView,
}: ViewOrderProps) {
  const [changeOrderStatus, { isLoading }] = useChangeOrderStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<IOrderStatus["status"]>("pending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItemView, setOrderItemView] = useState(initialOrderItemView);
  console.log(orderItemView);
  const checkCurrentStatus = orderItemView.status[orderItemView.status.length - 1];
  const [currentStatus, setCurrentStatus] = useState(checkCurrentStatus?.status);

  const statuses = [
    {
      id: "pending",
      label: "Pending",
      icon: MdPending,
      color: "text-dashboard",
      bgColor: "bg-dashboard/50",
    },
    {
      id: "on-delivery",
      label: "On-Delivery",
      icon: MdLocalShipping,
      color: "text-dashboard",
      bgColor: "bg-dashboard/50",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: MdCheckCircle,
      color: "text-dashboard",
      bgColor: "bg-dashboard/50",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: MdCancel,
      color: "text-red-500",
      bgColor: "bg-dashboard/50",
    },
  ];

  const handleStatusChange = async () => {
    if (selectedStatus === currentStatus) return;

    const result = await changeOrderStatus({
      id: orderItemView?._id,
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
      _id: `temp-${Date.now()}`, // ======== temporary ID for local state ==========>
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
            <h2 className="text-lg font-semibold text-primary sm:text-[24px]">Orders List</h2>
            <p className="text-info">ORD-${orderItemView?._id.slice(-8).toUpperCase()}</p>
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
                        ? status.bgColor + " text-black"
                        : "bg-gray-200 text-dashboard"
                    }`}
                  >
                    <status.icon className="h-6 w-6" />
                  </div>

                  <div className="ml-4">
                    <h3 className={`font-semibold ${isActive ? status.color : ""}`}>
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

          <div className="mt-8 rounded-md border border-slate-300 bg-gray-50 p-4">
            <h3 className="mb-4 font-medium">Change Status</h3>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as IOrderStatus["status"]);
                setIsModalOpen(true);
              }}
              className="w-full rounded-md border border-slate-300 bg-white p-2 text-gray-700 focus:border-transparent focus:ring-2 focus:ring-[#ECE3D2] focus:outline-none"
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
              <div className="rounded-md border border-slate-300 bg-white p-6">
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
                    <span className="text-[17px] font-semibold">Name: </span>
                    {orderItemView?.shippingAddress?.name}
                  </p>
                  <p>
                    <span className="text-[17px] font-semibold">Call: </span>
                    {orderItemView?.shippingAddress?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>
              {/* Shipping Information */}
              <div className="rounded-md border border-slate-300 bg-white p-6">
                <h2 className="mb-[16px] text-[20px] font-semibold text-dashboard">
                  Shipping Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-[17px] font-semibold">Name: </span>
                    {orderItemView?.shippingAddress?.name}
                  </p>
                  <p>
                    <span className="text-[17px] font-semibold">Division: </span>
                    {orderItemView?.shippingAddress?.division}
                  </p>
                  <p>
                    <span className="text-[17px] font-semibold">District: </span>
                    {orderItemView?.shippingAddress?.district}
                  </p>
                  <p>
                    <span className="text-[17px] font-semibold">Upazila: </span>
                    {orderItemView?.shippingAddress?.upazila}
                  </p>
                  <p>
                    <span className="text-[17px] font-semibold">Shipping Address: </span>
                    {orderItemView?.shippingAddress?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* order Item */}
          <div className="mt-6 mb-6 rounded-md border border-slate-300 bg-white p-6">
            <h2 className="mb-4 text-[20px] text-dashboard font-semibold">Order Items</h2>
            <div className="space-y-4">
              {orderItemView?.orderItems?.map((item) => (
                <div
                  key={item?.product_id}
                  className="flex items-center gap-[16px] rounded-md border border-slate-300 bg-white p-[16px]"
                >
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
                    <p>
                      <span className="font-semibold">Name: </span>
                      {item?.product?.name}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity: </span>
                      {item?.quantity}
                    </p>
                    {item?.color ? (
                      <p>
                        <span className="font-semibold">Color: </span>
                        {item?.color}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* order summery */}
          <div className="rounded-md border border-slate-300 bg-white p-6">
            <h2 className="mb-[16px] text-[20px] text-dashboard font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <p>
                <span className="text-[17px] font-semibold">Total Amount: </span>
                {Math.round(orderItemView?.totalProductAmount || 0)} BDT
              </p>
              <p>
                <span className="text-[17px] font-semibold">Payment Status: </span>
                {/* {orderItemView?.paymentStatus || "COD"} */}
                COD
              </p>
              <p>
                <span className="text-[17px] font-semibold">Date: </span>
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
