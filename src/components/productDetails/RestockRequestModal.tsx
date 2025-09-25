import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useCreateRestockRequestMutation } from "@/redux/features/restockRequest/restockRequest.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  requestedQty: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
  details: Yup.string().optional(),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  details: "",
  requestedQty: 0,
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
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
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
        className="checkoutBtn w-full cursor-pointer py-[8px] text-white transition-all duration-300 hover:bg-info disabled:cursor-not-allowed disabled:opacity-[50] sm:max-w-[230px]"
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
                    Requested Quantity
                  </label>
                  <Field
                    as="input"
                    type="number"
                    name="requestedQty"
                    className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 outline-none"
                  />
                  <ErrorMessage
                    name="requestedQty"
                    component="div"
                    className="text-xs text-red-500"
                  />
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
