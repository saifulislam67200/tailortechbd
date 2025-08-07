import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

const LoginWith = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDrop = () => {
    setIsOpen(!isOpen);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
      <button
        className="hidden cursor-pointer text-primary lg:block"
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onClick={handleDrop}
      >
        <div className="relative">
          <FaCircleUser size={22} />

          {isMouseOver && (
            <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
              Profile
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[55px] right-[60px] z-50 flex flex-col gap-[0px] rounded-lg border border-gray-200 bg-white shadow-lg">
          <Link
            href="/login"
            className="btn btn-primary flex w-full items-center justify-between gap-[5px] px-[10px] py-[8px] hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Login as User <MdKeyboardArrowRight />
          </Link>
          <Link
            href="/login-admin"
            className="btn btn-secondary flex w-full items-center justify-between gap-[5px] px-[10px] py-[8px] hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Login as Admin <MdKeyboardArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginWith;
