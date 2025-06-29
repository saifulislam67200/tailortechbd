"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addItemsOnCheckout } from "@/redux/features/checkout/checkout.slice";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { IoBagCheckOutline } from "react-icons/io5";
const ProcutCheckout = ({
  product,
  btnStyle,
  ...props
}: { product: IProduct; btnStyle?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      addItemsOnCheckout([
        {
          color: product?.colors?.[0]?.color || "",
          product_id: product?._id || "",
          quantity: 1,
          size: product?.colors?.[0]?.sizes?.[0]?.size || "",
          product: {
            name: product?.name || "",
            price: product?.price || 0,
            image: product?.images?.[0] || "",
          },
        },
      ])
    );

    router.push("/checkout");
  };

  return (
    <button
      onClick={handleClick}
      className={`checkoutBtn center mt-1 w-full cursor-pointer gap-[3px] border border-[#c5c5c5] py-[6px] text-sm font-bold ${btnStyle}`}
      {...props}
    >
      Buy Now <IoBagCheckOutline />
    </button>
  );
};

export default ProcutCheckout;
