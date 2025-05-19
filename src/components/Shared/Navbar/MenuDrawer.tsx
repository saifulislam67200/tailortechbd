"use client";
import { useRef } from "react";
import {
  FiX,
} from "react-icons/fi";
import CategoryAccordion from "./CategoryAccordion";

interface MenuDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuDrawer({ isOpen, setIsOpen }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);


  return (
    <>
      {/* Overlay - separate element with opacity */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer - fully opaque */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-50 h-full transform bg-primary-foreground shadow-lg transition-transform duration-300 ease-in-out w-full sm:w-[75vw] ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 h-screen overflow-y-auto">
          {/* Menu Items */}
          <CategoryAccordion setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}
