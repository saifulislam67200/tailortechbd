/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import {
  useChangeOrderStatusMutation,
  useUpdateOrderMutation,
} from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IOrder, IOrderStatus } from "@/types/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {
  MdCancel,
  MdCheckCircle,
  MdLocalShipping,
  MdPending,
  MdRunningWithErrors,
} from "react-icons/md";
import { PiKeyReturnFill } from "react-icons/pi";
import { RiExchangeFill, RiRefundFill } from "react-icons/ri";
import { toast } from "sonner";
const statuses = [
  {
    id: "pending",
    label: "Pending",
    icon: MdPending,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    icon: IoCheckmarkDoneCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "processing",
    label: "Processing",
    icon: MdRunningWithErrors,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "on-delivery",
    label: "On-Delivery",
    icon: MdLocalShipping,
    color: "text-orange-300",
    bgColor: "bg-orange-100",
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
  const router = useRouter();
  const [changeOrderStatus, { isLoading }] = useChangeOrderStatusMutation();

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState<IOrderStatus["status"]>(
    orderItem.status[orderItem.status.length - 1].status
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItemView, setOrderItemView] = useState(orderItem);
  const checkCurrentStatus = orderItemView.status[orderItemView.status.length - 1];
  const [currentStatus, setCurrentStatus] = useState(checkCurrentStatus?.status);

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
      status: [...prev.status, newStatusEntry], // ========= add the new status at the beginning =======>
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
      (_item, index) => index !== OrderitemIndex
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

  const productDetails = (slug: string) => {
    router.push(`/dashboard/product-details/${slug}`);
  };

  const shouldShowInvoice = orderItemView.status.some((status) => status.status === "processing");
  return (
    <div className="mb-32">
      <button
        onClick={() => setIsViewOrder(false)}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>

      <div>
        <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[0]">
              <h2 className="text-[32px] font-[600]">Order Details</h2>
              <span className="text-[14px] text-strong">
                Order ID:{" "}
                <span className="font-[600]">
                  #ORD-{orderItemView?._id?.slice(-8).toUpperCase()}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              {orderItemView.status.map((status, index) => {
                const color = statuses.find((s) => s.id === status.status);

                return (
                  <span
                    key={status.status + index}
                    className={`text-[16px] font-[600] capitalize ${color ? color.color : ""}`}
                  >
                    {status.status}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <span>Change Status:</span>
            <select
              defaultValue={currentStatus}
              onChange={(e) => {
                const status = statuses.find((s) => s.id === e.target.value);
                if (status) {
                  setSelectedStatus(status.id as IOrderStatus["status"]);
                }
              }}
              className="appearanc w-[150px] rounded-[4px] border-[1px] border-border-main bg-white px-[0.75rem] py-[0.375rem] pr-[2.25rem] text-base leading-[1.5] font-normal transition duration-150 ease-in-out outline-none"
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>

            <Button className="w-fit" onClick={handleStatusChange}>
              Update
            </Button>
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
