"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdPhone } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { ICoupon } from "@/views/Dashboard/CreateCouponView";

const CouponInfoModal = ({ coupon }: { coupon: ICoupon }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="relative flex cursor-pointer items-center justify-center rounded-full border border-dashboard/20 p-[7px] text-dashboard transition-all duration-200 hover:border-dashboard/40 hover:bg-dashboard/10 hover:text-dashboard/80"
      >
        <FiEye size={18} />
      </button>

      <DialogProvider className="w-[95vw] max-w-[800px] md:w-full" state={open} setState={setOpen}>
        <div className="w-full bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary">Coupon Details</h3>
            <button className="cursor-pointer text-xl text-primary" onClick={() => setOpen(false)}>
              <RxCross1 />
            </button>
          </div>

          <HorizontalLine className="my-3" />

          <div className="flex flex-col gap-2 text-[15px] text-primary">
            <p>
              <span className="font-semibold">Code:</span> {coupon.code}
            </p>
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {coupon.discountType === "amount" ? `৳${coupon.discount}` : `${coupon.discount}%`}
            </p>
            <p>
              <span className="font-semibold">Minimum Order:</span> ৳{coupon.minOrderValue}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {coupon.isActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-500">Inactive</span>
              )}
            </p>
            <p>
              <span className="font-semibold">Expires At:</span>{" "}
              {new Date(coupon.expiresAt).toLocaleDateString()}
            </p>
          </div>

          {coupon.assignedTo?.length > 0 && (
            <>
              <HorizontalLine className="my-3" />
              <h4 className="text-[17px] font-semibold text-primary">Assigned Users</h4>
              <div className="mt-2 flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-1">
                {coupon.assignedTo?.map((user) => (
                  <div key={user._id} className="bg-primary/10 p-3 text-[14px]">
                    <p className="flex items-center gap-2">
                      <FaRegUser /> <span className="font-medium">Name:</span> {user.fullName}
                    </p>
                    <p className="flex items-center gap-2">
                      <TfiEmail /> <span className="font-medium">Email:</span>{" "}
                      <Link href={`mailto:${user.email}`} className="text-primary">
                        {user.email}
                      </Link>
                    </p>
                    <p className="flex items-center gap-2">
                      <MdPhone /> <span className="font-medium">Phone:</span>{" "}
                      <Link href={`tel:${user.phoneNumber}`} className="text-primary">
                        {user.phoneNumber || "--- N/A ---"}
                      </Link>
                    </p>
                    <p>
                      <span className="font-medium">Role:</span> {user.role || "---"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogProvider>
    </>
  );
};

export default CouponInfoModal;
