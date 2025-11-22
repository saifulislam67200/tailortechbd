import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

const Label = ({ required = false, className, children, ...props }: LabelProps) => {
  return (
    <label className={twMerge("text-[14px] font-[700] text-strong", className)} {...props}>
      {children}
      {required && (
        <span className="ml-0.5 align-text-top text-[12px] font-bold text-danger">*</span>
      )}
    </label>
  );
};

export default Label;
