"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addItemsOnCheckout } from "@/redux/features/checkout/checkout.slice";
import { IOrderItem } from "@/types/order";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdShoppingCartCheckout } from "react-icons/md";
import Tooltip from "../ui/ToolTip";

const DetailsAndPrice = () => {
  const cartItems = useAppSelector((state) => state?.cart?.items) ?? [];
  const router = useRouter();
  const dispatch = useAppDispatch();

  const checkedItems = cartItems?.filter((item) => item?.isChecked);

  const { subtotal, totalDiscount } = checkedItems?.reduce(
    (acc, item) => {
      const itemSubtotal = item?.price * item?.quantity;
      const itemDiscountAmount = (item?.price * item?.discount * item?.quantity) / 100;

      acc.subtotal += itemSubtotal;
      acc.totalDiscount += itemDiscountAmount;
      return acc;
    },
    { subtotal: 0, totalDiscount: 0 }
  );

  const total = subtotal - totalDiscount;

  const handleCheckout = () => {
    const payload: (IOrderItem & { discount?: number })[] = [];

    checkedItems.forEach((item) => {
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
            <p className="text-[14px] font-bold">৳ {parseFloat(subtotal.toFixed(2))}</p>
          </li>
          <li className="mb-[8px] flex items-center justify-between">
            <p className="text-[14px] font-bold">Ecom Discount</p>
            <p className="text-[14px] font-bold">৳ {parseFloat(totalDiscount.toFixed(2))}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-[14px] font-bold">Total</p>
            <p className="text-[14px] font-bold">৳ {parseFloat(total.toFixed(2))}</p>
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className="mb-[8px] flex w-full cursor-pointer items-center justify-center bg-black py-[8px] text-[14px] font-bold text-white"
      >
        Continue Shopping
      </Link>
      {checkedItems.length ? (
        <button
          disabled={checkedItems?.length === 0}
          onClick={handleCheckout}
          className="center group/checkout flex w-full cursor-pointer items-center justify-center gap-[10px] overflow-hidden bg-primary py-[8px] text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-[0.4]"
        >
          Checkout
          <MdShoppingCartCheckout
            className={`relative left-0 text-[18px] duration-[0.3s] group-hover/checkout:left-[40%]`}
          />
        </button>
      ) : (
        <Tooltip content="Please select at least one item" className="w-full">
          <button className="center flex w-full cursor-not-allowed items-center justify-center gap-[10px] overflow-hidden bg-primary/50 py-[8px] text-[14px] font-bold text-primary">
            Checkout
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default DetailsAndPrice;
