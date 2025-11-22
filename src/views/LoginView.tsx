"use client";

import PhoneNumberLogin from "@/components/Login/PhoneNumberLogin";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import Link from "next/link";

const LoginView = () => {
  return (
    <div className="main_container flex h-[80dvh] flex-col gap-[16px] overflow-y-auto py-[20px]">
      <Breadcrumb />
      <FormCard
        headerButtons={[
          {
            title: "Login with mobile",
          },
        ]}
      >
        <PhoneNumberLogin />
        <div className="flex flex-col justify-end gap-[10px] sm:flex-row sm:items-center">
          <span className={"text-[14px] text-primary-foreground"}>
            New Customer?
            <Link href={"/register"} className="font-[600] hover:underline">
              {" "}
              Sign Up Here
            </Link>
          </span>
        </div>
      </FormCard>
    </div>
  );
};

export default LoginView;
