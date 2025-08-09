"use client";

import { useState } from "react";
import FormCard from "../ui/FormCard";
import RegisterWithEmail from "./RegisterWithEmail";
import RegisterWithMobile from "./RegisterWithMobile";

const RegisterForm = () => {
  const [mode, setMode] = useState<"email" | "phoneNumber">("email");
  return (
    <FormCard
      headerButtons={[
        { title: "Register with Mobile", onClick: () => setMode("phoneNumber") },
        { title: "Register with Email", onClick: () => setMode("email") },
      ]}
    >
      {mode == "phoneNumber" ? <RegisterWithMobile /> : <RegisterWithEmail />}
    </FormCard>
  );
};

export default RegisterForm;
