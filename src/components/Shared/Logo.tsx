import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-1 justify-center md:flex-none md:justify-start">
      <Link href={"/"} className={twMerge("text-[28px] font-bold text-white", className)}>
        <Image
          src="/images/logos/logo.jpg"
          alt="logo"
          width={230}
          height={60}
          className="w-[130px] sm:w-[230px]"
        />
      </Link>
    </div>
  );
};

export default Logo;
