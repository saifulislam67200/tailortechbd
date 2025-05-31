import TableInput from "@/components/ui/TableInput";
import { useGetAllSizeChartQuery } from "@/redux/features/productSizeChart/productSizeChart.api";
import React, { useState } from "react";
import AddNewProductSizeChart from "./AddNewProductSizeChart";
interface IProps {
  defaultValue?: string[][];
  onChange?: (value: string[][]) => void;
}

interface ISizeChart {
  label: string;
  chart: string[][];
}

const ProductSizeInput: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const { data } = useGetAllSizeChartQuery(undefined);
  const productSizeChart = data?.data || [];
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
          {productSizeChart?.map(({ chart, label }: ISizeChart) => (
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
          <AddNewProductSizeChart />
        </div>
      </div>
    </div>
  );
};

export default ProductSizeInput;
