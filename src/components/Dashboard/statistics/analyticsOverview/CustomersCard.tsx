import { FiUsers } from "react-icons/fi";

const CustomersCard = ({ value, selectedFilter }: { value: number; selectedFilter: string }) => {
  return (
    <div className="h-[180px] w-full bg-white p-[16px] 2xl:h-[200px]">
      <div className="flex items-center gap-[5px]">
        <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">Customers</h3> |{" "}
        <p className="line text-[14px] font-semibold text-info capitalize">{selectedFilter}</p>
      </div>

      <div className="mt-[32px] flex w-full items-center gap-[16px]">
        <div className="h-full w-[90px] 2xl:w-[120px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-danger/50 font-bold text-white 2xl:h-[80px] 2xl:w-[80px]">
            <FiUsers className="size-[20px] 2xl:size-[25px]" />
          </div>
        </div>
        <div className="h-full w-full">
          <h1 className="text-[20px] font-bold 2xl:text-[25px]">{value}</h1>
          <p className="text-[14px] font-bold 2xl:text-[16px]">
            <span className="text-success">10%</span> increase
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersCard;
