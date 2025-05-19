"use client";
import Button from "@/components/ui/Button";
import FormMessage, { IFormMessage } from "@/components/ui/FormMessage";
import Input from "@/components/ui/Input";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formMessage, setFormMessage] = useState<IFormMessage | null>(null);
  const handleSubmit = async (values: typeof initialValues) => {
    setFormMessage(null);
    const res = await changePassword(values);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data.message) {
        setFormMessage({ message: error.data.message, type: "error" });
      } else {
        setFormMessage({ message: "Something went wrong", type: "error" });
      }
      return;
    }
    setFormMessage({ message: "Password updated successfully", type: "success" });
  };

  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-main p-[10px]">
      <h4 className="text-[16px] font-[700] text-strong">Password</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-3 gap-[8px]">
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Old Password</label>
              <Field
                name="oldPassword"
                as={Input}
                placeholder="Enter your Old password"
                type="password"
              />
              <ErrorMessage
                name="oldPassword"
                component="span"
                className="text-[12px] text-red-500"
              />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">New Password</label>
              <Field
                name="password"
                as={Input}
                placeholder="Enter your New password"
                type="password"
              />
              <ErrorMessage name="password" component="span" className="text-[12px] text-red-500" />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Confirm Password</label>
              <Field
                name="confirmPassword"
                as={Input}
                placeholder="Confirm your new password"
                type="password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="text-[12px] text-red-500"
              />
            </div>
          </div>
          <FormMessage formMessage={formMessage} />
          <Button isLoading={isLoading} type="submit" className="mt-[16px] bg-primary-foreground">
            Update Password
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
