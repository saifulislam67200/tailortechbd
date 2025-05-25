"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addItemsOnCheckout } from "@/redux/features/checkout/checkout.slice";
import { IOrderItem } from "@/types/order";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DetailsAndPrice = () => {
  const cartItems = useAppSelector((state) => state?.cart?.checkedItems) ?? [];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initial = { subtotal: 0, totalDiscount: 0 };

  const { subtotal, totalDiscount } = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        const price = Number(item?.price) || 0;
        const quantity = Number(item?.quantity) || 0;
        const discount = Number(item?.discount) || 0;

        const itemSubtotal = price * quantity;
        const itemDiscount = (itemSubtotal * discount) / 100;

        acc.subtotal += itemSubtotal;
        acc.totalDiscount += itemDiscount;
        return acc;
      }, initial)
    : initial;

  const total = subtotal - totalDiscount;

  const handleCheckout = () => {
    const payload: (IOrderItem & { discount?: number })[] = [];

    cartItems.forEach((item) => {
      payload.push({
        product_id: item?.id,
        product: {
          image: item?.image || "",
          name: item?.name,
          price: item?.price,
        },
        color: item?.color || "",
        quantity: item?.quantity,
        size: item?.size || "",
        discount: item?.discount,
      });
    });
    dispatch(addItemsOnCheckout(payload));
    router.push("/checkout");
  };

  return (
    <div className="h-[246px] w-full lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[578px]">
      <div className="mb-[16px] bg-white p-[5px]">
        <div className="h-[40px] bg-tertiary">
          <p className="px-[16px] py-[8px] text-[16px] font-bold text-black capitalize">
            Price details
          </p>
        </div>

        <ul className="px-[13px] pt-[20px] pb-[23px]">
          <li className="mb-[8px] flex items-center justify-between">
            <p className="text-[14px] font-bold">Subtotal</p>
            <p className="text-[14px] font-bold">TK {parseFloat(subtotal.toFixed(2))}</p>
          </li>
          <li className="mb-[8px] flex items-center justify-between">
            <p className="text-[14px] font-bold">Ecom Discount</p>
            <p className="text-[14px] font-bold">TK {parseFloat(totalDiscount.toFixed(2))}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-[14px] font-bold">Total</p>
            <p className="text-[14px] font-bold">TK {parseFloat(total.toFixed(2))}</p>
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className="mb-[8px] flex h-[26px] w-full cursor-pointer items-center justify-center bg-black text-[12px] font-bold text-white"
      >
        Continue Shopping
      </Link>
      <button
        disabled={cartItems?.length === 0}
        onClick={handleCheckout}
        className="flex h-[26px] w-full cursor-pointer items-center justify-center bg-primary text-[12px] font-bold text-white disabled:opacity-50"
      >
        Checkout
      </button>
    </div>
  );
};

export default DetailsAndPrice;
