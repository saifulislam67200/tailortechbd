"use client";

import Breadcrumb from "@/components/ui/BreadCrumbs";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";

const ForgotPasswordView = () => {
  return (
    <div className="main_container min-h-[100dvh] py-[20px]">
      <Breadcrumb />
      <FormCard headerButtons={[{ title: "Forgot Password" }]} className="mt-[20px]">
        <form action="">
          <label className="text-[14px] font-[600] text-primary">Email</label>
          <Input type="email" placeholder="Email" />
        </form>
      </FormCard>
    </div>
  );
};

export default ForgotPasswordView;
