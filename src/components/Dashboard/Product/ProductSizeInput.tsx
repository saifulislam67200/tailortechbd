import TableInput from "@/components/ui/TableInput";
import { useGetAllSizeChartQuery } from "@/redux/features/productSizeChart/productSizeChart.api";
import React, { useState } from "react";
import AddNewProductSizeChart from "./AddNewProductSizeChart";
import { LiaEdit } from "react-icons/lia";
import DeleteSizeChartById from "./DeleteSizeChartById";
interface IProps {
  defaultValue?: string[][];
  onChange?: (value: string[][]) => void;
}

interface ISizeChart {
  label: string;
  chart: string[][];
  _id: string;
}

const ProductSizeInput: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const [isEdit, setIsEdit] = useState(false);
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
        <div className="flex items-center text-[12px] font-[700]">
          Quick size select:{" "}
          <button
            title="Click to edit quick chart"
            onClick={() => setIsEdit(!isEdit)}
            type="button"
            className="cursor-pointer p-[5px]"
          >
            <LiaEdit size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[10px]">
          {productSizeChart?.map(({ chart, label, _id }: ISizeChart) => (
            <div key={_id} className="flex">
              <button
                type="button"
                onClick={() => setSelectedSize({ chart, label })}
                disabled={isEdit}
                className={`${isEdit ? "cursor-not-allowed" : "cursor-pointer"} items-enter flex items-center-safe border-[1px] border-primary px-[8px] py-[4px] text-[12px] text-primary ${
                  selectedSize?.label === label ? "bg-primary text-white" : "bg-white text-primary"
                }`}
              >
                {label}
              </button>
              {isEdit && (
                <DeleteSizeChartById chartLabel={label} sizeChartId={_id} setIsEdit={setIsEdit} />
              )}
            </div>
          ))}
          <AddNewProductSizeChart />
        </div>
      </div>
    </div>
  );
};

export default ProductSizeInput;
