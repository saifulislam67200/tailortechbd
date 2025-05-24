import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex h-screen w-full items-center justify-center", className)}>
      <div className="flex h-screen w-full items-center justify-center bg-primary/80">
        <Image
          src={"/images/logos/logo-symbol-foreground.png"}
          width={200}
          height={200}
          alt="loading"
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
