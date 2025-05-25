"use client";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IProduct } from "@/types/product";
import { BsEye } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
// import ProductAddToCartModal from "../ui/ProductAddToCartModal";

const TopProductCardActions = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const payload = {
      discount: product.discount,
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: "M",
      stock: 5,
      color: "",
      image: product?.images[0],
    };

    dispatch(addToCart(payload));
    toast.success("Added to cart!", { id: "addToCartToastId" });
  };

  console.log(product, "product in TopProductCardActions");

  return (
    <div className="mt-[10px] flex items-center gap-[8px]">
      <button
        onClick={handleAddToCart}
        className="flex h-[26px] w-[75px] cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[12px] font-semibold text-white"
      >
        Add to Cart
      </button>

      <button className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-tertiary text-info">
        <FiRefreshCw />
      </button>

      <button className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-tertiary text-info">
        <BsEye />
      </button>
    </div>
  );
};

export default TopProductCardActions;
