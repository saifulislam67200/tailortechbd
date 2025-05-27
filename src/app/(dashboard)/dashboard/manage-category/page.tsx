import { getPageMetaData } from "@/utils/meta";
import CategoryManagementView from "@/views/Dashboard/CategoryManagementView";

export const metadata = getPageMetaData("Category Management");
const page = () => {
  return <CategoryManagementView />;
};

export default page;
