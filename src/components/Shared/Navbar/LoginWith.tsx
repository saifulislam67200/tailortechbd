import Link from "next/link";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

const LoginWith = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div>
      <Link
        href="/customers/login"
        className="mt-2 cursor-pointer text-primary"
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        // onClick={handleDrop}
      >
        <div className="relative">
          <FaCircleUser size={22} />

          {isMouseOver && (
            <div className="absolute -bottom-10 left-1/2 z-10 w-fit -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[12px] whitespace-nowrap text-white opacity-100 transition duration-200">
              Profile
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default LoginWith;
