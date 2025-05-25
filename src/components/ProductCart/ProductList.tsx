"use client";
import { useAppSelector } from "@/hooks/redux";
import { deleteCheckedItems, toggleSelectAll } from "@/redux/features/cart/cartSlice";
import { BiSupport } from "react-icons/bi";
import { useDispatch } from "react-redux";
import CartCard from "./CartCard";

const ProductList = () => {
  const { items: cartItems, checkedItems } = useAppSelector((state) => state?.cart) ?? [];
  const dispatch = useDispatch();

  const handleDeleteCheckedProducts = () => {
    dispatch(deleteCheckedItems());
  };

  const handleSelectAll = () => {
    dispatch(toggleSelectAll());
  };

  return (
    <div className="w-full bg-white p-[5px]">
      <div className="flex h-[40px] items-center justify-between bg-tertiary px-[8px] py-[8px] sm:px-[16px]">
        <p className="text-[12px] font-bold text-black sm:text-[16px]">
          You have ({cartItems?.length}) items in your cart
        </p>
        <p className="flex items-center gap-[3px] text-[12px] font-bold text-primary underline sm:text-[15px]">
          <BiSupport />
          Need Help?
        </p>
      </div>
      {cartItems?.length > 0 && (
        <div className="mt-[27px] flex items-center justify-between pr-[12px] pl-[20px] md:pl-[35px]">
          <div className="flex items-center gap-[35px]">
            <input
              onChange={() => {}}
              checked={cartItems?.length > 0 && cartItems?.length === checkedItems?.length}
              onClick={() => handleSelectAll()}
              type="checkbox"
              name=""
              id="select-all"
              className="cursor-pointer"
            />
            <label htmlFor="select-all" className="cursor-pointer text-[16px]">
              {" "}
              Check All{" "}
            </label>
          </div>
          <button
            title="Delete Checked Products"
            onClick={handleDeleteCheckedProducts}
            className={`cursor-pointer rounded-full ${checkedItems?.length > 0 ? "bg-primary text-white" : "bg-quaternary"} px-[10px] font-bold text-info`}
          >
            Delete
          </button>
        </div>
      )}
      <div className="max-h-[600px] overflow-y-auto">
        {cartItems?.length > 0 ? (
          cartItems?.map((item) => <CartCard key={item?.id} item={item} />)
        ) : (
          <h3 className="mt-[50px] text-center text-[16px] text-info">
            Cart Empty, No Product Added
          </h3>
        )}
      </div>
    </div>
  );
};

export default ProductList;
