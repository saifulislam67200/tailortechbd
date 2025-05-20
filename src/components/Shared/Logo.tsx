import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-1 justify-center md:flex-none md:justify-start">
      <Link href={"/"} className={twMerge("text-[28px] font-bold text-white", className)}>
        Bd<span className="text-primary">Shop</span>
      </Link>
    </div>
  );
};

export default Logo;
