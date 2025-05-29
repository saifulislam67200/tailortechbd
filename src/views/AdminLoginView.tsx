"use client";
import AdminEmailLogin from "@/components/adminLogin/AdminEmailLogin";
import AdminPhoneNumberLogin from "@/components/adminLogin/AdminPhoneNumberLogin";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import { useState } from "react";

const AdminLoginView = () => {
  const [loginMode, setLoginMode] = useState<"phoneNumber" | "email">("phoneNumber");
  return (
    <div className="main_container flex h-screen flex-col gap-[16px] py-[20px]">
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
        {loginMode === "phoneNumber" ? <AdminPhoneNumberLogin /> : <AdminEmailLogin />}
      </FormCard>
    </div>
  );
};

export default AdminLoginView;
