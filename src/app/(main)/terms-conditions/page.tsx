import TermsAndConditions from "@/components/TermsAndConditions/TermsAndConditions";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Terms and Conditions");
const page = () => {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
};

export default page;