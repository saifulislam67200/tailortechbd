import TableInput from "@/components/ui/TableInput";
import sizeChartsConst from "@/utils/sizeConst";
import React, { useState } from "react";
interface IProps {
  defaultValue?: string[][];
  onChange?: (value: string[][]) => void;
}

const ProductSizeInput: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const [selectedSize, setSelectedSize] = useState<
    { label: string; chart: string[][] } | undefined
  >();

  return (
    <div className="flex w-full flex-col items-start justify-start gap-[10px]">
      <TableInput
        key={selectedSize?.label}
        defaultValue={selectedSize?.chart || defaultValue}
        onChange={(data) => onChange?.(data)}
      />

      <div className="flex flex-col gap-[5px]">
        <span className="text-[12px] font-[700]">Quick size select: </span>
        <div className="flex items-center justify-center gap-[10px]">
          {sizeChartsConst.map(({ chart, label }) => (
            <button
              type="button"
              onClick={() => setSelectedSize({ chart, label })}
              key={label}
              className={`cursor-pointer border-[1px] px-[8px] py-[4px] text-[12px] text-primary ${
                selectedSize?.label === label ? "bg-primary text-white" : "bg-white text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSizeInput;
