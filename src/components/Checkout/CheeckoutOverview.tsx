"use client";

import { useAppSelector } from "@/hooks/redux";
import { useApplyCouponMutation } from "@/redux/features/coupon/coupon.api";
import { IQueruMutationErrorResponse } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export interface IAppliedCouponResponse {
  appliedCoupon: string;
  couponDiscount: number;
  grandTotal: number;
  subtotal: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ICouponResult {
  data: {
    data: IAppliedCouponResponse;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

const CheeckoutOverview = ({
  district,
  successfulCouponResponse,
  setSuccessfulCouponResponse,
}: {
  district?: string;
  successfulCouponResponse: IAppliedCouponResponse | null;
  setSuccessfulCouponResponse: (value: IAppliedCouponResponse | null) => void;
}) => {
  const [couponValue, setCouponValue] = useState("");

  const { items } = useAppSelector((state) => state.checkout);
  const [applyCoupon, { isLoading }] = useApplyCouponMutation();
  const isInsideDhaka = district?.toLowerCase() === "dhaka";
  const deliveryFee = isInsideDhaka ? 70 : 120;

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const mainTotal = items.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
  const totalDiscount = items.reduce((acc, cur) => {
    const mainPrice = cur.product.price * cur.quantity;
    const discountPrice = getDiscountedPrice(cur.product.price, cur.discount || 0) * cur.quantity;
    return acc + (mainPrice - discountPrice);
  }, 0);

  const handleApplyCoupon = async () => {
    if (!couponValue) {
      toast.error("Please enter a coupon code");
      setCouponValue("");
      return;
    }

    const products = items.map((item) => ({
      productId: item.product_id.split("-")[0],
      quantity: item.quantity,
    }));

    const payload = {
      code: couponValue.trim(),
      products,
    };

    console.log(payload);

    const result = await applyCoupon(payload);

    const couponSuccessResponse: IAppliedCouponResponse = result?.data?.data;

    if (couponSuccessResponse) {
      setSuccessfulCouponResponse(couponSuccessResponse);
    }

    const error = result.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Coupon applied successfully");
    setCouponValue("");
    return;
  };

  return (
    <div className="flex flex-col gap-[16px] bg-white py-[8px]">
      <div className="w-full px-[5px]">
        <div className="w-full bg-tertiary px-[16px] py-[8px]">
          <span className="text-[16px] font-[700]">3. Complete Order</span>
        </div>
      </div>
      <div className="px-[16px]">
        <div className="border-[1px] border-border-main">
          <div className="w-full border-b-[1px] border-border-main px-[8px] py-[8px]">
            <span className="text-[12.8px] font-[700]">Order Summary</span>
          </div>
          {items.map((item, i) => (
            <div
              key={item.product_id + i}
              className="flex w-full items-end justify-between gap-[10px] border-b-[1px] border-border-main px-[8px] py-[8px]"
            >
              <div className="flex items-start justify-start gap-[5px]">
                <Image
                  src={item.product.image}
                  width={50}
                  height={50}
                  alt=""
                  className="shrink-0"
                />
                <div className="flex flex-col gap-[5px]">
                  <span className="line-clamp-2 text-[12.8px] font-[400]">{item.product.name}</span>
                  {item.discount ? (
                    <span className="flex items-center justify-start gap-[10px]">
                      <span className="lin text-[12.8px] font-[600] text-primary">
                        ৳ {getDiscountedPrice(item.product.price, item.discount).toFixed(2)}
                      </span>
                      <span className="lin text-[12.8px] font-[600] text-muted line-through">
                        ৳ {item.product.price.toFixed(2)}
                      </span>
                    </span>
                  ) : (
                    <span className="lin text-[12.8px] font-[600] text-primary">
                      ৳ {item.product.price.toFixed(2)}
                    </span>
                  )}
                  <span className="lin text-[12.8px] font-[600] text-muted">
                    Color: {item.color} - Size: {item.size} - Quantity: {item.quantity}
                  </span>
                </div>
              </div>

              <span className="shrink-0 text-[16px] font-[700]">
                {(
                  getDiscountedPrice(item.product.price, item.discount || 0) * item.quantity
                ).toFixed(2)}{" "}
                TK.
              </span>
            </div>
          ))}
        </div>
      </div>{" "}
      <p className="px-[16px] text-[14px] text-muted">
        Delivery and additional costs are calculated based on the values you have entered.
      </p>
      <div className="flex flex-col gap-[16px] px-[16px]">
        <div className="flex w-full items-center justify-between gap-[10px]">
          <span className="text-[14px] font-[700]">Sub Total</span>
          <span className="font-[600]">{Math.floor(mainTotal)} TK.</span>
        </div>
        <div className="flex w-full items-center justify-between gap-[10px]">
          <span className="text-[14px] font-[700]">Discount</span>
          <span className="font-[600]"> - {Math.floor(totalDiscount)} TK.</span>
        </div>
        {/* // coupon input start here  */}
        <div className="relative">
          <input
            type="text"
            disabled={!!successfulCouponResponse?.couponDiscount}
            onChange={(e) => setCouponValue(e.target.value)}
            className="h-[40px] w-full border border-quaternary pl-[15px] focus:outline-none"
            placeholder="Coupon Code"
            value={couponValue}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isLoading}
            className="absolute top-0 right-0 h-full cursor-pointer bg-info px-[20px] text-white transition-colors delay-150 hover:bg-primary"
          >
            Apply
          </button>
        </div>

        {/* // coupon input end here  */}
        <div className="flex w-full items-center justify-between gap-[10px]">
          <span className="text-[14px] font-[700]">Delivery Fee</span>
          <span className="font-[600]"> {deliveryFee} TK.</span>
        </div>
        <span className="h-[1px] w-full bg-border-muted"></span>
        {successfulCouponResponse?.couponDiscount && (
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-[700] text-success">Coupon Discount</span>

            <span className="text-[14px] font-[700] text-success">
              - {Math.floor(successfulCouponResponse?.couponDiscount)}
            </span>
          </div>
        )}
        <div className="flex w-full items-center justify-between gap-[10px]">
          <span className="text-[14px] font-[700]">Grand Total</span>

          <span className="font-[600]">
            {Math.floor(
              mainTotal -
                totalDiscount +
                deliveryFee -
                (successfulCouponResponse?.couponDiscount || 0)
            )}
            TK.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheeckoutOverview;
