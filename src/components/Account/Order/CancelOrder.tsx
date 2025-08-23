"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useChangeOrderStatusMutation } from "@/redux/features/order/order.api";
import { toast } from "sonner";

interface IProps {
  order: { _id: string; orderId: string };
  onSuccess?: () => void;
}

const reasons = ["Change of mind", "Too expensive", "I want to try another product", "Other"];

const schema = Yup.object({
  note: Yup.string().required("Please select a rason for cancellation"),
});

const CancelOrder: React.FC<IProps> = ({ order, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [changeStatus, { isLoading }] = useChangeOrderStatusMutation();

  const handleSubmit = async (values: { note: string }) => {
    if (isLoading) return;
    const res = await changeStatus({
      id: order._id,
      data: { status: "cancelled", note: values.note },
    });

    const error = res.error;
    if (error) {
      toast.error("Something went wrong while cancelling order");
      return;
    }

    toast.success("Order cancelled successfully");
    setIsOpen(false);
    onSuccess?.();
  };

  return (
    <div className="flex items-center justify-end">
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-[5px] bg-danger px-4 py-2 transition-opacity hover:opacity-90"
      >
        Cancel Order
      </Button>

      <DialogProvider
        setState={setIsOpen}
        state={isOpen}
        className="w-full max-w-[560px] overflow-y-auto"
      >
        <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="mb-1 text-[20px] font-semibold">Cancel Order</h4>
              <p className="text-sm text-gray-600">
                You are about to cancel order <span className="font-medium">#{order?.orderId}</span>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          <HorizontalLine className="my-4" />

          <Formik initialValues={{ note: "" }} validationSchema={schema} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="note" className="text-sm font-medium">
                  Reason for Cancelation
                </label>
                <Field
                  as="select"
                  id="note"
                  name="note"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-gray-300 focus:bg-white"
                >
                  <option value="" hidden>
                    Select a reason
                  </option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="note" component="div" className="text-sm text-red-600" />
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Keep Order
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-danger px-4 py-2 hover:opacity-90 disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? "Canceling…" : "Confirm Cancelation"}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </DialogProvider>
    </div>
  );
};

export default CancelOrder;
