import { twMerge } from "tailwind-merge";

const SectionTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("w-full bg-dashboard/10 px-[16px] py-[8px]", className)}>
      <span className="text-[16px] font-[700] text-dashboard">{children}</span>
    </div>
  );
};

export default SectionTitle;
