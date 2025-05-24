import { getPageMetaData } from "@/utils/meta";
import AllProductsView from "@/views/Dashboard/AllProductsView";

export const metadata = getPageMetaData("All Products");

const page = () => {
  return <AllProductsView />;
};

export default page;
