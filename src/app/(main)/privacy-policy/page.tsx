import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Privacy Policy");
const page = () => {
  return <PrivacyPolicy />;
};

export default page;
