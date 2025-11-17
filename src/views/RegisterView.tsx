"use client";

import RegisterForm from "@/components/Register/RegisterForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterView = () => {
  const { isLoading, user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      if (user.isVerified) {
        router.push("/");
      } else {
        router.push("/register/verification");
      }
    }
  }, [isLoading, user, router]);

  return (
    <div className="main_container flex h-[80dvh] w-full flex-col gap-[20px] overflow-y-auto py-[20px]">
      <Breadcrumb />
      <RegisterForm />
    </div>
  );
};

export default RegisterView;
