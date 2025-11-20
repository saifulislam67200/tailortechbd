"use client";
import Button from "@/components/ui/Button";
import { removeAllItemsFromCheckout } from "@/redux/features/checkout/checkout.slice";
import { IOrder } from "@/types/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  orderData: IOrder;
}
const CheckoutSuccess: React.FC<IProps> = ({ orderData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const deliveryFee = orderData?.deliveryFee || 120;
  const grandTotal = orderData?.totalProductAmount + deliveryFee;

  const hasMounted = { current: false };
  useEffect(() => {
    return () => {
      if (hasMounted.current) {
        dispatch(removeAllItemsFromCheckout());
      }
      hasMounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-10">
      <div className="mx-auto max-w-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">✅ Order Placed Successfully</h2>
        <p className="mb-6 text-sm text-muted">ID: #{orderData?.orderId}</p>

        {orderData?.orderItems?.map((item, index) => {
          const price = item.product.price;
          const totalPrice = price * item.quantity;

          return (
            <div key={index} className="flex items-start justify-between border-t py-4">
              <div className="flex gap-4">
                <Image
                  width={80}
                  height={80}
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <div className="text-sm">
                    <p>
                      <span className="mr-2 text-success">৳ {item.product.price.toFixed(0)}</span>
                    </p>
                    <p>
                      Color: {item.color} - Size: {item.size} - Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="font-semibold whitespace-nowrap">৳ {totalPrice.toFixed(0)}</div>
            </div>
          );
        })}

        <div className="mt-4 space-y-1 border-t pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>৳ {orderData?.totalProductAmount?.toFixed(0)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>৳ {deliveryFee}</span>
          </div>

          {orderData.couponDiscount ? (
            <div className="mt-2 flex justify-between border-t border-primary pt-2 font-semibold text-success">
              <span>Coupon Discount</span>
              <span>- ৳ {orderData.couponDiscount.toFixed(0)}</span>
            </div>
          ) : (
            ""
          )}
          <div className="mt-2 flex justify-between border-t pt-2 font-semibold text-black">
            <span>Grand Total</span>
            <span>৳ {grandTotal.toFixed(0)}</span>
          </div>
        </div>
        <Button className="mx-auto mt-4" onClick={() => router.replace("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
