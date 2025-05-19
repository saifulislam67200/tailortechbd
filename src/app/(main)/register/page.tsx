import { getPageMetaData } from "@/utils/meta";
import RegisterView from "@/views/RegisterView";
export const metadata = getPageMetaData("Register");
const page = () => {
  return <RegisterView />;
};

export default page;
