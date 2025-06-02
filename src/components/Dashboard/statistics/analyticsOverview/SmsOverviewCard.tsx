import { MdOutlineSms } from "react-icons/md";

interface IProps {
  sms?: {
    balance: number;
    validity: string;
    totalSmsRemaining: number;
  };
}

const SmsOverviewCard: React.FC<IProps> = ({
  sms,
  // increase,
}) => {
  return (
    <div className="min-h-[160px] w-full bg-white p-[16px] 2xl:h-[180px]">
      <div className="flex flex-col gap-[5px]">
        <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">SMS</h3>
        <p className="text-[14px] font-semibold text-info capitalize">Current stats</p>
      </div>

      <div className="mt-[32px] flex w-full items-center gap-[16px]">
        <div className="w-fit">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[5px] bg-[#ffc88641] font-bold text-[#ff9e27]">
            <MdOutlineSms className="size-[25px] 2xl:size-[30px]" />
          </div>
        </div>
        <div className="h-full w-full">
          <h1 className="text-[20px] font-bold 2xl:text-[20px]">{sms?.balance || 0} BDT</h1>
          {sms?.validity ? <span>Valid till: {}</span> : ""}
        </div>
      </div>
    </div>
  );
};

export default SmsOverviewCard;
