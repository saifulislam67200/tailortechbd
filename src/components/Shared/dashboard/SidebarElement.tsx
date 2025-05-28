import { useGetPendingOrderCountQuery } from "@/redux/features/order/order.api";
import { useGetPendingQuestionCountQuery } from "@/redux/features/Q&A/questionAndAnswer.api";

const PendingOrderCount = () => {
  const { isLoading, data } = useGetPendingOrderCountQuery(undefined);

  return (
    <>
      {isLoading || !data?.data?.pendingOrderCount ? (
        ""
      ) : (
        <span className="center absolute top-[-5px] left-[0px] flex h-[20px] w-[20px] rounded-full bg-danger/90 text-[10px] text-white">
          {data.data.pendingOrderCount > 9 ? "9+" : data.data.pendingOrderCount}
        </span>
      )}
    </>
  );
};
const PendingQuestionCount = () => {
  const { isLoading, data } = useGetPendingQuestionCountQuery(undefined);
  console.log(data);

  return (
    <>
      {isLoading || !data?.data?.pendingQuestionCount ? (
        ""
      ) : (
        <span className="center absolute top-[-5px] left-[0px] flex h-[20px] w-[20px] rounded-full bg-danger/90 text-[10px] text-white">
          {data.data.pendingQuestionCount > 9 ? "9+" : data.data.pendingQuestionCount}
        </span>
      )}
    </>
  );
};

const SidebarElement = {
  PendingOrderCount,
  PendingQuestionCount,
};

export default SidebarElement;
