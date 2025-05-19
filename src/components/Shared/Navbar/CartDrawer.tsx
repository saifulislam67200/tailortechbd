"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
}

export default function CartDrawer({ isOpen, setIsOpen, cartItems }: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer - fully opaque */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full transform bg-white transition-transform duration-300 ease-in-out w-full sm:w-[75vw] lg:w-[384px] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-[16px] bg-quaternary">
          <h2 className="text-[16px] font-bold flex items-center gap-[3px]"><FaCartPlus size={18} />
            Cart(10)</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer font-bold"
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
  return (
    <div className="flex items-center border-b border-quaternary py-4">
      <div className="relative w-[76px] h-[76px] flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="rounded object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <p className="text-sm ">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>

      <button className="pl-[10px]">
        <RiDeleteBin6Line className="text-blue-500" />
      </button>
    </div>
  );
}

function EmptyCart({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <FiShoppingCart size={48} className="mb-4 text-gray-300" />
      <p className="text-gray-500">Your cart is empty</p>
      <button
        onClick={() => setIsOpen(false)}
        className="mt-4 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        Continue Shopping
      </button>
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
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="absolute right-0 bottom-0 left-0 bg-white p-[8px]">
      <hr className="border-t border-quaternary" />
      <div className=" flex justify-between py-[8px]">
        <span className="font-medium">Subtotal:</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <Link href="/cart" onClick={() => setIsOpen(false)} className="w-full h-[26px] bg-black mb-[8px] flex justify-center items-center text-[12px] font-bold text-white">View Cart</Link>
    </div>
  );
}
