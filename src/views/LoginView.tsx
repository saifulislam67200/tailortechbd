"use client";
import EmailLogin from "@/components/Login/EmailLogin";
import PhoneNumberLogin from "@/components/Login/PhoneNumberLogin";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import Link from "next/link";
import { useState } from "react";
const LoginView = () => {
  const [loginMode, setLoginMode] = useState<"phoneNumber" | "email">("phoneNumber");
  return (
    <div className="main_container flex flex-col gap-[16px] py-[20px]">
      <Breadcrumb />
      <FormCard
        headerButtons={[
          {
            title: "Login with mobile",
            onClick: () => setLoginMode("phoneNumber"),
          },
          {
            title: "Login with email",
            onClick: () => setLoginMode("email"),
          },
        ]}
      >
        {loginMode === "phoneNumber" ? <PhoneNumberLogin /> : <EmailLogin />}
        <div className="flex items-center justify-between gap-[10px]">
          <Link
            href={"/forgot-password"}
            className={"text-[14px] text-primary-foreground hover:underline"}
          >
            Forgot Password ?
          </Link>
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
