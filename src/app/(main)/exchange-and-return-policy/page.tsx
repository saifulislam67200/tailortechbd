import ExchangeAndReturnPolicy from "@/components/ExchangeAndReturnPolicy/ExchangeAndReturnPolicy";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Exchange & Return Policy");
const page = () => {
  return <ExchangeAndReturnPolicy />;
};

export default page;
