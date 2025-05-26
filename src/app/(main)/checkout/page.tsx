import Protectedroute from "@/provider/Protectedroute";
import { getPageMetaData } from "@/utils/meta";
import CheckoutView from "@/views/CheckoutView";

export const metadata = getPageMetaData("Checkout");

const page = () => {
  return (
    <Protectedroute role="user">
      <CheckoutView />
    </Protectedroute>
  );
};

export default page;
