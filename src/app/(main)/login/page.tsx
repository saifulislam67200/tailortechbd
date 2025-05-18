import { getPageMetaData } from "@/utils/meta";
import LoginView from "@/views/LoginView";
export const metadata = getPageMetaData("Login");
const page = () => {
  return <LoginView />;
};

export default page;
