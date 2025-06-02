import AllOrders from "@/components/Dashboard/AllOrders/AllOrders";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("All Orders");
const page = () => {
  return <AllOrders />;
};

export default page;
