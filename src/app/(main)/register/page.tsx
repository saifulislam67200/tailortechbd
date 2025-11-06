import { getPageMetaData } from "@/utils/meta";
import RegisterView from "@/views/RegisterView";

export const metadata = getPageMetaData("Register");

const RegisterPage = () => {
  return <RegisterView />;
};

export default RegisterPage;
