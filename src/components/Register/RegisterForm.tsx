import FormCard from "../ui/FormCard";
import RegisterWithMobile from "./RegisterWithMobile";

const RegisterForm = () => {
  return (
    <FormCard headerButtons={[{ title: "Register with Mobile" }]}>
      <RegisterWithMobile />
    </FormCard>
  );
};

export default RegisterForm;
