"use client";
import AdminEmailLogin from "@/components/adminLogin/AdminEmailLogin";
import AdminPhoneNumberLogin from "@/components/adminLogin/AdminPhoneNumberLogin";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import Image from "next/image";
import { useState } from "react";

const AdminLoginView = () => {
  const [loginMode, setLoginMode] = useState<"phoneNumber" | "email">("phoneNumber");
  return (
    <div className="main_container flex h-screen flex-col gap-[16px] py-[20px]">
      <Breadcrumb />
      <Image src="/images/logos/logo.png" alt="logo" width={100} height={100} className="mx-auto" />
      <h4 className="text-center text-[20px] font-[700] text-primary">Admin Login</h4>
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
        {loginMode === "phoneNumber" ? <AdminPhoneNumberLogin /> : <AdminEmailLogin />}
      </FormCard>
    </div>
  );
};

export default AdminLoginView;
