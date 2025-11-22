import { getPageMetaData } from "@/utils/meta";
import CheckoutView from "@/views/CheckoutView";

export const metadata = getPageMetaData("Checkout");

const CheckoutPage = () => {
  return <CheckoutView />;
};

export default CheckoutPage;
