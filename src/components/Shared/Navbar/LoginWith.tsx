import Link from "next/link";
import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const LoginWith = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleDrop = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
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
      {isOpen ? (
        <div className="absolute right-0 z-50 mt-[20px] flex w-54 flex-col gap-[15px] rounded-lg border border-gray-200 bg-white p-[20px] shadow-lg">
          <Link
            href="/login"
            className="btn btn-primary hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Login as User
          </Link>
          <Link
            href="/login-admin"
            className="btn btn-secondary hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Login as Admin
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginWith;
