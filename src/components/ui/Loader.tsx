import { twMerge } from "tailwind-merge";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("flex h-screen w-full items-center justify-center", className)}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
