"use client";
import { useRef } from "react";
import { FiX } from "react-icons/fi";
import CategoryAccordion from "./CategoryAccordion";

interface MenuDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuDrawer({ isOpen, setIsOpen }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Overlay  */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-50 h-full w-full transform bg-primary-foreground shadow-lg transition-transform duration-300 ease-in-out sm:max-w-[334px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-[16px] flex items-center justify-between border-b px-[16px]">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-white" aria-label="Close menu">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex h-full flex-col justify-between px-[16px]">
          {/* Menu Items */}
          <CategoryAccordion setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}
