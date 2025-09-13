import { getPageMetaData } from "@/utils/meta";
import CreateDamageProductView from "@/views/Dashboard/CreateDamageProductView";
export const metadata = getPageMetaData("Create Damage Product");
const page = () => {
  return <CreateDamageProductView />;
};

export default page;
