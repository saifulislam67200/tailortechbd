import About from "@/components/About/About";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("About");
const page = () => {
  return (
    <div>
      <About />
    </div>
  );
};

export default page;
