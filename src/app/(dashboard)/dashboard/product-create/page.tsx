import { getPageMetaData } from "@/utils/meta";
import ProductCreateView from "@/views/Dashboard/ProductCreateView";
export const metadata = getPageMetaData("Create Product");
const page = () => {
  return <ProductCreateView />;
};

export default page;
