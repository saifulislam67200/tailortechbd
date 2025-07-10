import { formatNumberWithSuffix } from "@/utils";
import dateUtils from "@/utils/date";
import { MdOutlineSms } from "react-icons/md";

interface IProps {
  sms?: {
    balance: number;
    validity: string;
    totalSmsRemaining: number;
  };
}

const SmsOverviewCard: React.FC<IProps> = ({ sms }) => {
  return (
    <div className="min-h-[170px] w-full bg-white p-[16px] 2xl:min-h-[180px]">
      <div className="flex flex-col gap-[5px]">
        <h3 className="text-[14px] font-bold text-primary sm:text-[16px]">SMS</h3>
        <p className="text-[14px] font-semibold text-info capitalize">Current stats</p>
      </div>

      <div className="mt-[10px] flex w-full flex-col items-start gap-[6px]">
        <span className="flex w-fit items-center justify-start gap-[10px]">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[5px] bg-[#ffc88641] font-bold text-[#ff9e27]">
            <MdOutlineSms className="size-[25px]" />
          </span>{" "}
          <h1 className="text-[20px] leading-[90%] font-bold 2xl:text-[20px]">
            ৳{formatNumberWithSuffix(sms?.balance || 0)}
          </h1>
        </span>
        <div className="flex h-full w-full flex-col gap-[2px]">
          {sms?.totalSmsRemaining ? (
            <span className="text-[13px]">
              <span className="font-[700]">SMS Remaining:</span> {sms.totalSmsRemaining}
            </span>
          ) : (
            ""
          )}

          {sms?.validity ? (
            <span className="text-[13px]">
              <span className="font-[700]">Valid till:</span>{" "}
              {dateUtils.formateCreateOrUpdateDate(sms?.validity)}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SmsOverviewCard;
