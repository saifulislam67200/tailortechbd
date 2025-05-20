import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-1 justify-center md:flex-none md:justify-start">
      <Link href={"/"} className={twMerge("text-[28px] font-bold text-white", className)}>
        <Image src="/images/logos/logo-foreground.webp" alt="logo" width={80} height={80} />
      </Link>
    </div>
  );
};

export default Logo;
