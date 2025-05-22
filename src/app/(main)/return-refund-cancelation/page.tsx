import ReturnRefundAndCancellation from "@/components/ReturnRefundAndCancellation/ReturnRefundAndCancellation";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Return, Refund & Cancellation");
const page = () => {
  return (
    <div>
      <ReturnRefundAndCancellation />
    </div>
  );
};

export default page;