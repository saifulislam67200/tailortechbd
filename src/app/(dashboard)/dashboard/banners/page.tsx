import Banners from "@/components/Dashboard/Banners/Banners";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("Banners");
const page = () => {
  return <Banners />;
};

export default page;