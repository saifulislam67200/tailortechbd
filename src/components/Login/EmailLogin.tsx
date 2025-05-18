import { useLoginUserMutation } from "@/redux/features/user/user.api";
import { setUser } from "@/redux/features/user/user.slice";
import { IQueruMutationErrorResponse } from "@/types";
import { IUser } from "@/types/user";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import Button from "../ui/Button";
import Input from "../ui/Input";
const initialValues = { email: "", password: "" };
const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Please enter a valid email address"),
  password: yup.string().required("Password is required"),
});
const EmailLogin = () => {
  const [login, { isLoading }] = useLoginUserMutation(undefined);
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const router = useRouter();
  const onSubmit = async (values: typeof initialValues) => {
    const res = await login({
      ...values,
      mode: "email",
    });
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data.message) {
        setFormError(error.data.message);
      } else {
        setFormError("Something went wrong");
      }
      return;
    }

    dispatch(setUser(res.data?.data.result as IUser));

    setFormError(null);
    router.push("/");
  };
  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      {({ touched, errors }) => (
        <Form className="flex w-full flex-col gap-[16px]">
          <div className="flex flex-col gap-[5px]">
            <Field type="email" name="email" placeholder="Enter Your Email Address" as={Input} />

            {touched.email && errors.email && (
              <span className="text-[12px] text-danger">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <Field type="password" name="password" placeholder="Enter Your Password" as={Input} />

            {touched.password && errors.password && (
              <span className="text-[12px] text-danger">{errors.password}</span>
            )}
          </div>

          {formError && <span className="text-[12px] text-danger">{formError}</span>}
          <Button isLoading={isLoading} type="submit" className="w-full">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailLogin;
