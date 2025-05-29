import CookiePolicy from "@/components/CookiePolicy/CookiePolicy";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Cookie Policy");
const page = () => {
  return <CookiePolicy />;
};

export default page;
