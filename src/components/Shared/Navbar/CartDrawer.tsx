"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiX, FiShoppingCart } from "react-icons/fi";

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
        className={`fixed top-0 right-0 z-50 h-full w-4/5 transform bg-white transition-transform duration-300 ease-in-out sm:w-[384px] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-[16px]">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="h-[calc(100vh-180px)] overflow-y-auto p-4">
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
    <div className="flex items-center border-b py-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="rounded object-cover"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
      <div className="flex items-center">
        <button className="px-2 text-gray-500 hover:text-gray-700" aria-label="Decrease quantity">
          -
        </button>
        <span className="mx-1">{item.quantity}</span>
        <button className="px-2 text-gray-500 hover:text-gray-700" aria-label="Increase quantity">
          +
        </button>
      </div>
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
    <div className="absolute right-0 bottom-0 left-0 border-t bg-white p-4">
      <div className="mb-4 flex justify-between">
        <span className="font-medium">Subtotal:</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <button className="w-full rounded-md bg-black py-3 text-white">Checkout</button>
      <button
        onClick={() => setIsOpen(false)}
        className="mt-2 w-full py-2 text-gray-700 hover:text-gray-900"
      >
        Continue Shopping
      </button>
    </div>
  );
}
