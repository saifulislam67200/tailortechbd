"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { getProductDiscountPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image?: string;
  size: string;
  color?: string | undefined;
}

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const cartItems = useAppSelector((state) => state?.cart?.items);

  return (
    <>
      <div
        className={`fixed inset-0 z-[50] bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer - fully opaque */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[9999999999] h-full w-full transform bg-white transition-transform duration-300 ease-in-out sm:w-[75vw] lg:w-[384px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b bg-quaternary p-[16px]">
          <h2 className="flex items-center gap-[3px] text-[16px] font-bold text-black">
            <FaCartPlus size={18} />
            Cart({cartItems?.length})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer font-bold text-black"
            aria-label="Close cart"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        <div className="h-[calc(100vh-150px)] overflow-y-auto px-[10px]">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </>
          ) : (
            <EmptyCart setIsOpen={setIsOpen} />
          )}
        </div>
        {cartItems.length > 0 && <CartFooter cartItems={cartItems} setIsOpen={setIsOpen} />}
      </div>
    </>
  );
}

function CartItem({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: string, color: string, size: string) => {
    dispatch(removeFromCart({ id, color, size }));
  };

  return (
    <div className="flex items-center border-b border-quaternary py-4 text-strong">
      <div className="relative h-[76px] w-[76px] flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="rounded object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="line-clamp-1 text-sm font-medium">{item.name}</h3>
        {item.discount ? (
          <p className="flex items-center text-sm">
            <TbCurrencyTaka size={16} />
            {Math.floor(getProductDiscountPrice(item.price, item.discount))} X {item.quantity}
          </p>
        ) : (
          <p className="flex items-center text-sm">
            <TbCurrencyTaka size={16} />
            {Math.floor(item.price)} x {item.quantity}
          </p>
        )}
        <p className="text-sm">Size: {item.size}</p>
        <p className="text-sm">Color: {item.color}</p>
      </div>

      <button
        onClick={() => handleRemoveItem(item.id, item.color!, item.size)}
        aria-label="Remove item from cart"
        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-end"
      >
        <RiDeleteBin6Line size={18} className="text-primary" />
      </button>
    </div>
  );
}

function EmptyCart({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <FiShoppingCart size={48} className="mb-4 text-gray-300" />
      <p className="text-gray-500">Your cart is empty</p>
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className="mt-4 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function CartFooter({
  cartItems,
  setIsOpen,
}: {
  cartItems: CartItem[];
  setIsOpen: (isOpen: boolean) => void;
}) {
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.discount ? getProductDiscountPrice(item.price, item.discount) : item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="absolute right-0 bottom-0 left-0 bg-white p-[8px]">
      <hr className="border-t border-quaternary" />
      <div className="flex justify-between py-[8px]">
        <span className="font-medium text-black">Subtotal:</span>
        <span className="flex items-center font-semibold text-black">
          <TbCurrencyTaka size={16} />
          {Math.floor(subtotal)}
        </span>
      </div>
      <Link
        href="/cart"
        onClick={() => setIsOpen(false)}
        className="mb-[8px] flex h-[36px] w-full items-center justify-center bg-black text-[12px] font-bold text-white transition-colors duration-200 hover:bg-primary"
      >
        View Cart
      </Link>
    </div>
  );
}
