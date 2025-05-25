import Contact from "@/components/Contact/Contact";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Contact");
const page = () => {
  return (
    <div>
      <Contact />
    </div>
  );
};

export default page;
