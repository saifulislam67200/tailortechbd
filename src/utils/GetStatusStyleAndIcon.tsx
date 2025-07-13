import { IoCheckmarkDoneCircle, IoHourglass } from "react-icons/io5";
import {
  MdCancel,
  MdCheckCircle,
  MdLocalShipping,
  MdPending,
  MdRunningWithErrors,
} from "react-icons/md";
import { PiKeyReturnFill } from "react-icons/pi";
import { RiExchangeFill, RiRefundFill } from "react-icons/ri";

const GetStatusStyleAndIcon = (status: string) => {
  switch (status) {
    case "pending":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <MdPending className="h-3 w-3" />,
        label: "Pending",
      };
    case "confirmed":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <IoCheckmarkDoneCircle className="h-3 w-3" />,
        label: "Confirmed",
      };
    case "processing":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        icon: <MdRunningWithErrors className="h-3 w-3 animate-spin" />,
        label: "Processing",
      };
    case "on-delivery":
      return {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: <MdLocalShipping className="h-3 w-3" />,
        label: "On Delivery",
      };
    case "delivered":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <MdCheckCircle className="h-3 w-3" />,
        label: "Delivered",
      };
    case "cancelled":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <MdCancel className="h-3 w-3" />,
        label: "Cancelled",
      };
    case "exchange":
      return {
        bg: "bg-pink-100",
        text: "text-pink-800",
        icon: <RiExchangeFill className="h-3 w-3" />,
        label: "Exchange",
      };
    case "returned":
      return {
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: <PiKeyReturnFill className="h-3 w-3" />,
        label: "Returned",
      };
    case "refunded":
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        icon: <RiRefundFill className="h-3 w-3" />,
        label: "Refunded",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: <IoHourglass className="h-3 w-3" />,
        label: "Unknown",
      };
  }
};

export default GetStatusStyleAndIcon;
