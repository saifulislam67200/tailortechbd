import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input"; // to avoid issues in React DevTools

export default Input;
