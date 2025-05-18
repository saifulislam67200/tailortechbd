import { getPageMetaData } from "@/utils/meta";
import VerificationView from "@/views/VerificationView";
import { Metadata } from "next";
export const metadata: Metadata = getPageMetaData("Verification");
const page = () => {
  return <VerificationView />;
};

export default page;
