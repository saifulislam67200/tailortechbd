import Link from "next/link";
import FormCard from "../ui/FormCard";
import RegisterWithMobile from "./RegisterWithMobile";

const RegisterForm = () => {
  return (
    <FormCard headerButtons={[{ title: "Register with Mobile" }]}>
      <RegisterWithMobile />

      <div className="flex flex-col justify-end gap-[10px] sm:flex-row sm:items-center">
        <span className={"text-[14px] text-primary-foreground"}>
          Already have an account?
          <Link href={"/login"} className="font-[600] hover:underline">
            {" "}
            Login Here
          </Link>
        </span>
      </div>
    </FormCard>
  );
};

export default RegisterForm;
