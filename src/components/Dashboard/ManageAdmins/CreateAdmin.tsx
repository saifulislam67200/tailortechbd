import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import Input from "@/components/ui/Input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  phoneNumber: Yup.string().required("Phone number is required"),

  email: Yup.string().email("Invalid email address").notRequired(),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
const CreateAdmin = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button>Create Admin</Button>
      <DialogProvider state={isOpen} setState={setIsOpen} className="w-[95vw] md:w-[600px]">
        <div className="w-full bg-white">
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-center text-2xl font-semibold">Create Admin</h2>
            <HiDotsCircleHorizontal className="my-[10px]" />

            <Formik
              initialValues={{
                fullName: "",
                phoneNumber: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form values:", values);
              }}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label>Full Name</label>
                    <Field as={Input} name="fullName" type="text" />
                    <ErrorMessage name="fullName" component="div" />
                  </div>

                  <div>
                    <label>Phone Number</label>
                    <Field as={Input} name="phoneNumber" type="text" />
                    <ErrorMessage name="phoneNumber" component="div" />
                  </div>

                  <div>
                    <label>Email (Optional)</label>
                    <Field as={Input} name="email" type="email" />
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <label>Password</label>
                    <Field as={Input} name="password" type="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default CreateAdmin;
