import React, { useState } from "react";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateRestockRequestMutation } from "@/redux/features/restockRequest/restockRequest.api";
import { IQueruMutationErrorResponse } from "@/types";
import { toast } from "sonner";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  details: Yup.string().optional(),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  details: "",
};

const RestockRequestModal = ({
  productId,
  color,
  size,
}: {
  productId: string;
  color: string;
  size: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createRestockRequest, { isLoading }] = useCreateRestockRequestMutation();

  const handleSubmit = async (
    values: typeof initialValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, resetForm }: any
  ) => {
    const payload = {
      ...values,
      color,
      size,
      product: productId,
    };

    const result = await createRestockRequest(payload);
    const error = result.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    if (result?.data?.success) {
      toast.success("Your restock request has been submitted successfully.");
    }

    setTimeout(() => {
      setSubmitting(false);
      setIsOpen(false);
      resetForm();
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-[40px] w-full cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-info disabled:cursor-not-allowed disabled:opacity-[50] sm:max-w-[230px]"
      >
        Request Restock
      </button>
      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[700px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="mx-4 w-full max-w-[600px] overflow-hidden rounded-lg bg-white shadow-xl">
              {/* Modal Header */}
              <div className="border-b border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-primary">Restock Request</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Fill in the form to request a restock for this product.
                </p>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 p-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="name" component="div" className="text-xs text-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">Phone</label>
                  <Field
                    name="phone"
                    type="tel"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="phone" component="div" className="text-xs text-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">
                    Details(Optional)
                  </label>
                  <Field
                    as="textarea"
                    name="details"
                    rows={3}
                    className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 outline-none"
                  />
                  <ErrorMessage name="details" component="div" className="text-xs text-red-500" />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-primary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-primary text-white"
                  disabled={!isValid || !dirty || isSubmitting || isLoading}
                >
                  Submit Request
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogProvider>
    </>
  );
};

export default RestockRequestModal;
