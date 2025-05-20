"use client";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/redux";
import { removeAllItemsFromCheckout } from "@/redux/features/checkout/checkout.slice";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const OrderSuccess = () => {
  const { items: orderItems } = useAppSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const router = useRouter();

  const getParams = useSearchParams();
  const orderId = getParams.get("o_id");

  const calculateDiscountedPrice = (price: number, discount: number) =>
    price - (price * discount) / 100;

  const subtotal = orderItems.reduce(
    (acc, item) =>
      acc + calculateDiscountedPrice(item.product.price, item.discount || 0) * item.quantity,
    0
  );
  const totalDiscount = orderItems.reduce(
    (acc, item) => acc + ((item.product.price * (item.discount || 0)) / 100) * item.quantity,
    0
  );
  const deliveryFee = 60;
  const grandTotal = subtotal + deliveryFee;

  const hasMounted = { current: false };
  useEffect(() => {
    return () => {
      if (hasMounted.current) {
        console.log("cleanup");
        dispatch(removeAllItemsFromCheckout());
      }
      hasMounted.current = true;
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-10">
      <div className="mx-auto max-w-3xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">✅ Order Placed Successfully</h2>
        {orderId ? <p className="mb-6 text-sm text-muted">Order ID: #{orderId}</p> : ""}

        {orderItems.map((item, index) => {
          const discountedPrice = calculateDiscountedPrice(item.product.price, item.discount || 0);
          const totalPrice = discountedPrice * item.quantity;

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
                      {item.discount ? (
                        <>
                          <span className="mr-2 text-muted line-through">
                            TK. {item.product.price}
                          </span>
                          <span className="font-semibold text-success">
                            TK. {discountedPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="mr-2 text-success">TK. {item.product.price}</span>
                      )}
                    </p>
                    <p>
                      Color: {item.color} - Size: {item.size} - Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="font-semibold whitespace-nowrap">TK. {totalPrice.toFixed(2)}</div>
            </div>
          );
        })}

        <div className="mt-4 space-y-1 border-t pt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>TK. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-danger">- TK. {totalDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>TK. {deliveryFee}</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-2 font-semibold text-black">
            <span>Grand Total</span>
            <span>TK. {grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <Button className="mx-auto mt-4" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
