"use client";

import Breadcrumb from "@/components/ui/BreadCrumbs";
import Button from "@/components/ui/Button";
import CountrySelector from "@/components/ui/CountrySelector";
import FormCard from "@/components/ui/FormCard";
import Input from "@/components/ui/Input";
import { ICountry } from "@/hooks/useCountries";
import { useForgotPasswordMutation } from "@/redux/features/user/user.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").optional(),
  phoneNumber: Yup.string().optional(),
});

const ForgotPasswordView = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [country, setCountry] = useState<ICountry>();
  const [mode, setMode] = useState<"email" | "phoneNumber">("email");
  const [isSent, setIsSent] = useState(true);

  const handleSubmit = async (
    values: { email: string; phoneNumber: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await forgotPassword({
        email: values.email,
        mode,
      });
      console.log({ data: res?.data });
      const error = res.error as IQueruMutationErrorResponse;

      if (error) {
        if (error.data?.message) {
          toast.error(error.data?.message);
        } else {
          toast.error("Something went wrong");
        }
        return;
      }

      setIsSent(true);
      toast.success("Password reset link sent to your email!");
      resetForm();
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="main_container min-h-[100dvh] py-[20px]">
      <Breadcrumb />
      {!isSent ? (
        <FormCard
          headerButtons={[
            { title: "Forgot Password (email)", onClick: () => setMode("email") },
            { title: "Forgot Password (phone)", onClick: () => setMode("phoneNumber") },
          ]}
          className="mt-[20px]"
        >
          <Formik
            initialValues={{ email: "", phoneNumber: "" }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form>
                {mode == "email" ? (
                  <>
                    <label className="text-[14px] font-[600] text-primary">Email</label>
                    <Field name="email" as={Input} type="email" placeholder="Email" />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="mt-1 text-[12px] text-red-500"
                    />
                  </>
                ) : (
                  <>
                    <CountrySelector onCountrySelect={setCountry} />
                    <div className="mt-[16px] flex flex-col gap-[5px]">
                      <div className="flex items-center justify-start gap-0">
                        <span className="border-y-[1px] border-l-[1px] border-border-main bg-solid-slab px-[12px] py-[6px] text-[12px] text-strong">
                          {country?.dial_code || "+880"}
                        </span>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Enter Your Mobile Number"
                          as={Input}
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <span className="text-[12px] text-danger">{errors.phoneNumber}</span>
                      )}
                    </div>
                  </>
                )}

                <Button isLoading={isLoading} className="mt-[20px] w-full">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </FormCard>
      ) : (
        <div className="mx-auto mt-[50px] flex w-full max-w-[500px] flex-col gap-[10px] border-[1px] border-border-muted bg-white p-[16px] shadow-md">
          <Image src="/images/logos/logo.png" width={100} height={100} alt="success" />
          <h6 className="fot-[700] text-start text-[25px] text-primary">
            Password reset link sent
          </h6>
          <span className="text-start text-[14px] text-muted">
            We have sent a password reset link to your provided information. Check your inbox or
            spam section for the link. if you did not receive the link, please try again.
          </span>
          <Button className="w-full" onClick={() => setIsSent(false)}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordView;
