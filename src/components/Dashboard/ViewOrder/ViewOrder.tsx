"use client";
import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Loader from "@/components/ui/Loader";
import {
  useChangeOrderStatusMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IOrder, IOrderStatus, OrderStatusType } from "@/types/order";
import { IUser } from "@/types/user";
import { profileFallBack } from "@/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsArrowLeft, BsArrowCounterclockwise } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { ImSpinner11 } from "react-icons/im";
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
import { TbCancel } from "react-icons/tb";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import AddNewItemOnOrder from "../AllOrders/AddNewItemOnOrder";
import InvoiceModal from "../AllOrders/InvoiceModal/InvoiceModal";
import ChangeOrderStatusModal from "./ChangeOrderStatusModal";
import EditOrderShippingInfo from "./EditOrderShippingInfo";
import Image from "next/image";
const statuses = [
  {
    id: "pending",
    label: "Pending",
    icon: MdPending,
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
  orderId: string;
};
const negativeStatus = ["cancelled", "returned", "refunded"];

export default function ViewOrder({ orderId }: ViewOrderProps) {
  const { data, isLoading: isOrderLoading } = useGetOrderByIdQuery(orderId);
  const hasRunRef = useRef(false);
  const [initialOrderItemView, setInitialOrderItemView] = useState<IOrder>();
  const [changeOrderStatus] = useChangeOrderStatusMutation();

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [selectedStatus, setSelectedStatus] = useState<IOrderStatus["status"] | undefined>();
  // orderItem.status[orderItem.status.length - 1].status
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [orderItemView, setOrderItemView] = useState<IOrder>();
  const currentStatus = orderItemView?.status[orderItemView.status.length - 1];

  const [isEditMode, setIsEditMode] = useState(false);

  const handleStatusChange = async () => {
    if (selectedStatus === currentStatus || !selectedStatus) return;

    const statusObj = statuses.find((s) => s.id === selectedStatus);
    if (statusObj && negativeStatus.includes(statusObj.id)) {
      setIsStatusChangeModalOpen(true);
      return;
    }
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

    if (orderItemView) {
      setOrderItemView({
        ...orderItemView,
        status: [...orderItemView.status, newStatusEntry], // ========= add the new status at the beginning =======>
      });
    }

    setSelectedStatus(selectedStatus);
    setIsStatusChangeModalOpen(false);
    toast.success("Order status changed successfully!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRemoveOrderItem = (OrderitemIndex: number) => {
    if (!orderItemView) return;
    const updatedOrderItems = orderItemView.orderItems.filter(
      (_item, index) => index !== OrderitemIndex
    );

    setOrderItemView({
      ...orderItemView,
      orderItems: updatedOrderItems,
    });

    setInitialOrderItemView({
      ...orderItemView,
      orderItems: updatedOrderItems,
    });
  };

  const handleUpdate = async () => {
    if (!orderItemView) return;
    const isValidShippingAddress = Object.values(orderItemView.shippingAddress).every(
      (value) => value
    );

    if (!isValidShippingAddress) {
      toast.error("Please enter valid shipping Information", {
        description: "Check shipping address and fill up all the required fields",
      });
      return;
    }

    const totalAmount = orderItemView?.orderItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const updatedData = {
      ...orderItemView,
      totalProductAmount: (totalAmount || 0) - (orderItemView.couponDiscount || 0),
      deliveryFee: orderItemView.shippingAddress?.district?.toLowerCase() === "dhaka" ? 70 : 120,
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
    setIsEditMode(false);
  };

  const shouldShowInvoice = orderItemView?.status.some((status) => status.status === "processing");

  const customer = orderItemView?.user as IUser;

  const orderConfirmDate = new Date(
    orderItemView?.status.find((status) => status.status === "cancelled")?.createdAt || new Date()
  );
  const estimatedDeliveryDate = new Date(orderConfirmDate);
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  const orderItems = orderItemView?.orderItems;

  const subTotal =
    orderItemView?.orderItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;

  const shippingCharge = orderItemView?.deliveryFee;
  const couponDiscount = orderItemView?.couponDiscount;

  // Define status order/sequence (main flow)
  const mainStatusOrder = ["pending", "confirmed", "processing", "on-delivery", "delivered"];

  // Check if a status should be disabled based on currently selected status
  const isStatusDisabled = (statusId: string): boolean => {
    if (!orderItemView?.status || orderItemView.status.length === 0) return false;

    // If "cancelled" status has been passed in history, disable ALL statuses
    const hasCancelledBeenPassed = orderItemView.status.some(
      (statusEntry) => statusEntry.status === "cancelled"
    );
    if (hasCancelledBeenPassed) {
      return true; // Disable all statuses if cancelled has been passed
    }

    // Get the last status from history
    const lastStatusInHistory = orderItemView.status[orderItemView.status.length - 1]?.status;

    // Get the currently selected status (what user is trying to select in dropdown)
    const currentSelectedStatus = selectedStatus;

    // Check if "returned" has been passed or is being selected
    const hasReturnedBeenPassed = orderItemView.status.some(
      (statusEntry) => statusEntry.status === "returned"
    );
    const isReturnedSelected = currentSelectedStatus === "returned";
    const isLastStatusReturned = lastStatusInHistory === "returned";

    // If "returned" is selected, is the last status, or has been passed, disable all previous statuses
    if (hasReturnedBeenPassed || isReturnedSelected || isLastStatusReturned) {
      // Disable all previous statuses: cancelled, pending, confirmed, processing, on-delivery, delivered, exchange
      if (
        statusId === "cancelled" ||
        statusId === "pending" ||
        statusId === "confirmed" ||
        statusId === "processing" ||
        statusId === "on-delivery" ||
        statusId === "delivered" ||
        statusId === "exchange"
      ) {
        return true; // Disable all previous statuses when returned
      }
    }

    // Disable the status only if it's already the last status in history (already updated)
    // Don't disable just because it's selected - only disable after update is performed
    if (lastStatusInHistory && statusId === lastStatusInHistory) {
      return true;
    }

    // If no status is selected yet, check based on history
    if (!currentSelectedStatus) {
      // If "returned" has been passed or is the last status, disable all previous statuses
      if (hasReturnedBeenPassed || isLastStatusReturned) {
        if (
          statusId === "cancelled" ||
          statusId === "pending" ||
          statusId === "confirmed" ||
          statusId === "processing" ||
          statusId === "on-delivery" ||
          statusId === "delivered" ||
          statusId === "exchange"
        ) {
          return true; // Disable all previous statuses when returned has been passed
        }
      }

      // Check if this status has already been passed
      const hasStatusBeenPassed = orderItemView.status.some(
        (statusEntry) => statusEntry.status === statusId
      );

      // Allow re-selection in exchange flow
      if (hasStatusBeenPassed) {
        const exchangeIndex = orderItemView.status.findIndex(
          (statusEntry) => statusEntry.status === "exchange"
        );
        if (exchangeIndex !== -1 && (statusId === "on-delivery" || statusId === "delivered")) {
          // Check if this status was passed after exchange
          const statusPassedAfterExchange = orderItemView.status.some(
            (statusEntry, index) => statusEntry.status === statusId && index > exchangeIndex
          );
          return statusPassedAfterExchange; // Disable only if passed after exchange
        }
        return true; // Disable if already passed
      }

      // Special rule: If "delivered" has been passed, disable "cancelled"
      if (statusId === "cancelled") {
        const hasDeliveredBeenPassed = orderItemView.status.some(
          (statusEntry) => statusEntry.status === "delivered"
        );
        return hasDeliveredBeenPassed;
      }

      return false;
    }

    // Check if selection is sequential (next in order) or direct (jumping)
    const lastStatusIndex = mainStatusOrder.indexOf(lastStatusInHistory || "");
    const selectedStatusIndex = mainStatusOrder.indexOf(currentSelectedStatus);
    const isSequentialSelection =
      selectedStatusIndex !== -1 &&
      lastStatusIndex !== -1 &&
      selectedStatusIndex === lastStatusIndex + 1;

    // Special case: If "exchange" is selected, enable "on-delivery" and "delivered"
    if (currentSelectedStatus === "exchange") {
      // Explicitly disable cancelled when exchange is selected
      if (statusId === "cancelled") {
        return true; // Disable cancelled
      }
      if (statusId === "on-delivery" || statusId === "delivered") {
        return false; // Keep them active
      }
      // Disable other statuses that come before delivered in main flow
      const statusIndex = mainStatusOrder.indexOf(statusId);
      if (statusIndex !== -1 && statusIndex < mainStatusOrder.indexOf("delivered")) {
        return true; // Disable previous statuses
      }
      return false;
    }

    // Special case: If "on-delivery" is selected
    if (currentSelectedStatus === "on-delivery") {
      // Always keep cancelled active when on-delivery is selected
      if (statusId === "cancelled") {
        return false; // Keep cancelled active
      }
      // Disable previous statuses in sequence (except cancelled)
      const onDeliveryIndex = mainStatusOrder.indexOf("on-delivery");
      const statusIndex = mainStatusOrder.indexOf(statusId);
      if (statusIndex !== -1 && statusIndex < onDeliveryIndex) {
        return true; // Disable previous statuses except cancelled
      }
      return false;
    }

    // Special case: If "returned" is selected
    if (currentSelectedStatus === "returned") {
      // Disable all previous statuses when returned is selected
      // This includes: cancelled, pending, confirmed, processing, on-delivery, delivered, exchange
      if (
        statusId === "cancelled" ||
        statusId === "pending" ||
        statusId === "confirmed" ||
        statusId === "processing" ||
        statusId === "on-delivery" ||
        statusId === "delivered" ||
        statusId === "exchange"
      ) {
        return true; // Disable all previous statuses
      }
      return false;
    }

    // Special case: If "delivered" is selected
    if (currentSelectedStatus === "delivered") {
      // Always disable cancelled when delivered is selected
      if (statusId === "cancelled") {
        return true;
      }
      // Disable exchange if delivered is selected after exchange → on-delivery flow
      if (statusId === "exchange") {
        const exchangeIndex = orderItemView.status.findIndex(
          (statusEntry) => statusEntry.status === "exchange"
        );
        const onDeliveryIndex = orderItemView.status.findIndex(
          (statusEntry) => statusEntry.status === "on-delivery"
        );
        // If exchange exists and on-delivery was after exchange, disable exchange
        if (exchangeIndex !== -1 && onDeliveryIndex !== -1 && onDeliveryIndex > exchangeIndex) {
          return true; // Disable exchange when delivered is selected after the flow
        }
      }
      // If directly selecting delivered (jumping), disable on-delivery
      if (!isSequentialSelection && statusId === "on-delivery") {
        return true; // Disable on-delivery when directly selecting delivered
      }
      // Disable previous statuses in sequence
      const deliveredIndex = mainStatusOrder.indexOf("delivered");
      const statusIndex = mainStatusOrder.indexOf(statusId);
      if (statusIndex !== -1 && statusIndex < deliveredIndex) {
        return true; // Disable previous statuses
      }
      return false;
    }

    // Don't disable statuses based on current selection - allow user to change selection freely
    // Only disable based on what's already in history (already updated)

    // Special case: Disable exchange after exchange → on-delivery → delivered flow
    if (statusId === "exchange") {
      const exchangeIndex = orderItemView.status.findIndex(
        (statusEntry) => statusEntry.status === "exchange"
      );
      const onDeliveryIndex = orderItemView.status.findIndex(
        (statusEntry) => statusEntry.status === "on-delivery"
      );

      // If exchange exists and on-delivery was after exchange
      if (exchangeIndex !== -1 && onDeliveryIndex !== -1 && onDeliveryIndex > exchangeIndex) {
        // Check if "delivered" was after on-delivery in the exchange flow
        const deliveredAfterOnDelivery = orderItemView.status.some(
          (statusEntry, index) => statusEntry.status === "delivered" && index > onDeliveryIndex
        );
        // If "delivered" is currently being selected or was after on-delivery, disable exchange
        if ((currentSelectedStatus as string) === "delivered" || deliveredAfterOnDelivery) {
          return true; // Disable exchange after completing the flow
        }
      }
    }

    // Check if this status has already been passed in the order's history
    const hasStatusBeenPassed = orderItemView.status.some(
      (statusEntry) => statusEntry.status === statusId
    );

    // If status has been passed, check for exchange flow exception
    if (hasStatusBeenPassed) {
      const exchangeIndex = orderItemView.status.findIndex(
        (statusEntry) => statusEntry.status === "exchange"
      );
      if (exchangeIndex !== -1 && (statusId === "on-delivery" || statusId === "delivered")) {
        // Check if this status was passed after exchange
        const statusPassedAfterExchange = orderItemView.status.some(
          (statusEntry, index) => statusEntry.status === statusId && index > exchangeIndex
        );
        // If passed after exchange, disable it
        if (statusPassedAfterExchange) return true;
        // Otherwise allow it (was passed before exchange)
        return false;
      }
      return true;
    }

    // Final check: If "returned" has been passed, is selected, or is the last status, disable all previous statuses
    // This ensures the check is applied even if other logic might have allowed these statuses
    if (hasReturnedBeenPassed || isReturnedSelected || isLastStatusReturned) {
      if (
        statusId === "cancelled" ||
        statusId === "pending" ||
        statusId === "confirmed" ||
        statusId === "processing" ||
        statusId === "on-delivery" ||
        statusId === "delivered" ||
        statusId === "exchange"
      ) {
        return true; // Disable all previous statuses when returned
      }
    }

    return false;
  };

  const handleChangeOrderStatusOption = (newStatus: string) => {
    if (isStatusDisabled(newStatus)) return;

    const status = statuses.find((s) => s.id === newStatus);
    if (status) {
      setSelectedStatus(status.id as IOrderStatus["status"]);
      if (negativeStatus.includes(status.id)) {
        setIsStatusChangeModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (data?.data && !hasRunRef.current) {
      const order = data.data;

      setInitialOrderItemView(order);
      setOrderItemView(order);
      setSelectedStatus(order.status[order.status.length - 1].status);

      hasRunRef.current = true; // prevent future runs
    }
  }, [data]);

  if (isOrderLoading) {
    return <Loader />;
  }

  if (!orderItemView)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h4 className="text-[30px] font-[600]">Order Not Found</h4>
        <p>The order you are looking for was not found</p>
      </div>
    );

  return (
    <div className="mb-32">
      <Link
        href="/dashboard/all-orders"
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </Link>

      <div className="w-full">
        <div className="flex w-full flex-wrap items-center justify-between gap-[10px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[0]">
              <h2 className="text-[32px] font-[600]">Order Details</h2>
              <span className="text-[14px] text-strong">
                Order ID: <span className="font-[600]">#{orderItemView?.orderId}</span>
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
            <div className="flex items-center gap-[8px]">
              <select
                value={selectedStatus ? selectedStatus : ""}
                onChange={(e) => handleChangeOrderStatusOption(e.target.value)}
                className="appearanc w-[150px] rounded-[4px] border-[1px] border-border-main bg-white px-[0.75rem] py-[0.375rem] pr-[2.25rem] text-base leading-[1.5] font-normal transition duration-150 ease-in-out outline-none"
              >
                <option value="" hidden>
                  Change Status
                </option>
                {statuses.map((status) => {
                  const disabled = isStatusDisabled(status.id);
                  return (
                    <option
                      key={status.id}
                      value={status.id}
                      disabled={disabled}
                      style={disabled ? { color: "#999", cursor: "not-allowed" } : {}}
                    >
                      {status.label}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => {
                  if (currentStatus?.status) {
                    setSelectedStatus(currentStatus.status);
                  }
                }}
                disabled={selectedStatus === currentStatus?.status}
                className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[4px] border-[1px] border-border-main bg-white text-black transition duration-150 ease-in-out hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                title="Reset to last status"
              >
                <BsArrowCounterclockwise size={16} />
              </button>
            </div>

            <Button
              className="w-fit"
              isLoading={isUpdating}
              disabled={isUpdating}
              onClick={handleStatusChange}
            >
              Update
            </Button>
          </div>
        </div>
        {currentStatus?.note ? <span>Note: {currentStatus?.note}</span> : ""}
        <div className="mt-[48px] flex w-full items-center justify-end gap-[10px]">
          {isEditMode ? (
            <>
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex cursor-pointer items-center gap-[5px] bg-success text-white disabled:cursor-not-allowed"
              >
                Save changes {isUpdating ? <ImSpinner11 className="animate-spin" /> : ""}
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => setOrderItemView(initialOrderItemView)}
              >
                Undo changes
              </Button>
            </>
          ) : (
            ""
          )}
          {currentStatus?.status === "pending" ? (
            <Button
              title={isEditMode ? "Undo changes and cancel editing" : "Edit Order"}
              className={`${isEditMode ? "bg-danger text-white" : "bg-success text-white"}`}
              onClick={() => {
                if (isEditMode) {
                  setOrderItemView(initialOrderItemView);
                }
                setIsEditMode(!isEditMode);
              }}
            >
              {isEditMode ? (
                <>
                  Cancel Edit <TbCancel />
                </>
              ) : (
                <>
                  Edit Order <HiOutlinePencil />
                </>
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="mt-[24px] flex w-full flex-col items-start justify-between gap-[20px] lg:flex-row">
          <div className="flex w-full flex-col gap-[15px] rounded-[6px] bg-white p-[15px]">
            <div className="flex w-full flex-col gap-[5px]">
              <h5 className="text-[20px] font-[500]">Customer Information</h5>
              <HorizontalLine className="h-[2px]" />
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[8px]">
                <span className="h-[50px] w-[50px] overflow-hidden rounded-full border-[1px] border-border-main">
                  <Image
                    src={customer.avatar || profileFallBack}
                    width={50}
                    height={50}
                    alt={customer.fullName || "Customer Avatar"}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-[16px] font-[600]">{orderItemView.shippingAddress.name}</span>
              </div>

              {isEditMode ? (
                <PhoneInput
                  international
                  defaultCountry="BD"
                  placeholder="Enter phone number"
                  countryCallingCodeEditable={false}
                  className={`rounded-[5px] border-[1px] border-border-muted bg-white px-3 py-[12px] text-sm`}
                  value={orderItemView.shippingAddress.phoneNumber}
                  onChange={(value) =>
                    setOrderItemView({
                      ...orderItemView,
                      shippingAddress: {
                        ...orderItemView.shippingAddress,
                        phoneNumber: value || "",
                      },
                    })
                  }
                />
              ) : (
                <p className="text-flat">
                  <span className="font-[700]">Phone:</span>{" "}
                  <Link
                    href={`tel:${orderItemView.shippingAddress.phoneNumber}`}
                    className="hover:underline"
                  >
                    {orderItemView.shippingAddress.phoneNumber}
                  </Link>
                </p>
              )}
              <p className="text-flat">
                <span className="font-[700]">Email:</span>{" "}
                <Link href={`mailto:${customer.email}`} className="hover:underline">
                  {customer.email || "N/A"}
                </Link>
              </p>
            </div>
          </div>
          {isEditMode ? (
            <EditOrderShippingInfo
              onChange={(shippingInfo) =>
                setOrderItemView({ ...orderItemView, shippingAddress: shippingInfo })
              }
              shippingInfo={orderItemView.shippingAddress}
            />
          ) : (
            <div className="flex w-full flex-col gap-[15px] rounded-[6px] bg-white p-[15px]">
              <div className="flex w-full flex-col gap-[5px]">
                <h5 className="text-[20px] font-[500]">Shipping Information</h5>
                <HorizontalLine className="h-[2px]" />
              </div>

              <div className="flex flex-col gap-[10px]">
                <p className="text-flat">
                  <span className="font-[700]">Address:</span>{" "}
                  {orderItemView.shippingAddress.division},{orderItemView.shippingAddress.district},{" "}
                  {orderItemView.shippingAddress.upazila}
                </p>
                <p className="text-flat">
                  <span className="font-[700]">Shipping Method:</span> Regular Delivery
                </p>
                <p className="text-flat">
                  <span className="font-[700]">Estimated Delivery: </span>{" "}
                  {formatDate(estimatedDeliveryDate.toString())}
                </p>
                <p className="text-flat">
                  <span className="font-[700]">Shipping Address:</span>{" "}
                  <span>{orderItemView.shippingAddress.address}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-[24px] flex w-full flex-col gap-[15px] rounded-[6px] bg-white p-[15px]">
          <div className="flex w-full flex-col gap-[5px]">
            <h5 className="text-[20px] font-[500]">Order Items</h5>
            <HorizontalLine className="h-[2px]" />
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border border-border-muted">
              <thead className="bg-gray-50">
                <tr>
                  <th className="min-w-[100px] border border-border-muted px-4 py-2 text-left font-semibold">
                    Product
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    Product Code
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    Current Stock
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    QTY
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    Variation
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    Unit Price
                  </th>
                  <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                    Total
                  </th>
                  {isEditMode ? (
                    <th className="border border-border-muted px-4 py-2 text-left font-semibold">
                      Action
                    </th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item, i) => (
                  <tr key={item.product_id + i}>
                    <td className="min-w-[100px] border border-border-muted px-4 py-2">
                      {/* <Link
                        href={`/dashboard/products/${item.product_id}`}
                        className="hover:underline"
                      > */}
                      {item.product.name}
                      {/* </Link> */}
                    </td>
                    <td className="border border-border-muted px-4 py-2">
                      {item.product.sku || "N/A"}
                    </td>
                    <td className="border border-border-muted px-4 py-2">
                      {item.product.currentStock || 0}
                    </td>
                    <td className="border border-border-muted px-4 py-2">{item.quantity}</td>
                    <td className="border border-border-muted px-4 py-2">
                      <span className="flex flex-col gap-[4px] text-[14px]">
                        <span>
                          <span className="font-[600]">Color:</span> {item.color}
                        </span>
                        <span>
                          <span className="font-[600]">Size:</span>
                          {item.size}
                        </span>
                      </span>
                    </td>
                    <td className="border border-border-muted px-4 py-2">
                      {Math.round(item.product.price)} BDT
                    </td>
                    <td className="border border-border-muted px-4 py-2">
                      {Math.round(item.product.price * item.quantity)} BDT
                    </td>
                    {isEditMode ? (
                      <td className="border border-border-muted px-4 py-2">
                        <button
                          onClick={() => handleRemoveOrderItem(i)}
                          className="mx-auto flex w-[100px] cursor-pointer items-center justify-center gap-[4px] rounded-[4px] bg-danger/10 px-[10px] py-[4px] text-danger duration-[0.3s] hover:bg-danger hover:text-white"
                        >
                          <FaRegTrashAlt /> Delete
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditMode ? (
            <AddNewItemOnOrder
              onAddItem={(item) =>
                setOrderItemView({
                  ...orderItemView,
                  orderItems: [...orderItemView.orderItems, item],
                })
              }
            />
          ) : (
            ""
          )}
        </div>
        <div className="mt-[24px] flex w-full items-center justify-end">
          <div className="flex w-[100%] flex-col gap-[15px] rounded-[6px] bg-white p-[15px] lg:w-[50%]">
            <div className="flex w-full flex-col gap-[5px]">
              <h5 className="text-[20px] font-[500]">Order Summary</h5>
              <HorizontalLine className="h-[2px]" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex w-full items-center justify-between text-[15px]">
                <span>Subtotal:</span>
                <span>{Math.round(subTotal)} BDT</span>
              </div>
              <div className="flex w-full items-center justify-between text-[15px]">
                <span>Shipping Charge:</span>
                <span>{shippingCharge} BDT</span>
              </div>
              {couponDiscount ? (
                <div className="flex w-full items-center justify-between text-[15px]">
                  <span>Discount:</span>
                  <span>- {Math.round(couponDiscount)} BDT</span>
                </div>
              ) : (
                ""
              )}

              <div className="flex w-full items-center justify-between text-[15px]">
                <span className="font-[700]">Total:</span>
                <span className="font-[700]">
                  {Math.round(subTotal + (shippingCharge || 0) - (couponDiscount || 0))} BDT
                </span>
              </div>
            </div>
            <HorizontalLine className="h-[2px]" />
            <div className="flex flex-col gap-[6px]">
              <span>
                <span className="font-[700]">Payment Method: </span>
                {orderItemView.paymentStatus === "COD" ? "Cash on Delivery (COD)" : "Online"}
              </span>
              <span>
                <span className="font-[700]">Payment Status: </span>
                {orderItemView.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </span>
              <span>
                <span className="font-[700]">Transaction ID: </span>
                N/A
              </span>
            </div>

            {shouldShowInvoice ? (
              <div className="mt-[20px] flex w-full items-center justify-end">
                <InvoiceModal orderItem={orderItemView} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ChangeOrderStatusModal
        orderId={orderId}
        status={selectedStatus || ""}
        setState={setIsStatusChangeModalOpen}
        state={isStatusChangeModalOpen}
        onChangeStatus={(status, note) => {
          const newStatusEntry = {
            status: status as OrderStatusType,
            createdAt: new Date().toISOString(),
            note,
          };
          if (orderItemView) {
            setOrderItemView({
              ...orderItemView,
              status: [...orderItemView.status, newStatusEntry], // ========= add the new status at the beginning =======>
            });
          }
        }}
      />
    </div>
  );
}
