import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge(
        "center cursor-pointer gap-[10px] rounded-[5px] bg-primary py-[6px] text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-primary/50",
        className
      )}
    ></button>
  );
};

export default Button;
