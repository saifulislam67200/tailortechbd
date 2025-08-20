import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useChangeOrderStatusMutation } from "@/redux/features/order/order.api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface IProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  onChangeStatus?: (status: string, note?: string) => void;
  orderId: string;
}

const noteSchema = Yup.object().shape({
  note: Yup.string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(1000, "Keep the note under 1000 characters.")
    .required("A note is required."),
});

const initialValue = { note: "" };

const ChangeOrderStatusModal: React.FC<IProps> = ({
  setState,
  state,
  status,
  orderId,
  onChangeStatus,
}) => {
  const [changeOrderStatus, { isLoading }] = useChangeOrderStatusMutation();

  const handleStatusChange = async (values: typeof initialValue) => {
    if (!status) return;
    const result = await changeOrderStatus({
      id: orderId,
      data: { status: status, note: values.note },
    });
    const error = result.error;
    if (error) {
      const errorMessage =
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
          ? (error.data as { message?: string }).message
          : "Something went wrong, please try again later!";
      toast.error(errorMessage || "Something went wrong, please try again later!");
      return;
    }
    toast.success("Order status changed successfully!");
    setState(false);
    onChangeStatus?.(status, values.note);
  };

  return (
    <DialogProvider setState={setState} state={state} className="w-full max-w-[560px]">
      <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-semibold text-dashboard">Change order status</h1>
            <p className="text-sm text-gray-600">
              Confirm the new status and leave a short note for audit history.
            </p>
          </div>
          {status && (
            <span className="shrink-0 rounded-full border border-dashboard/30 bg-dashboard/5 px-3 py-1 text-xs font-medium text-dashboard">
              New status: {status}
            </span>
          )}
        </div>

        <Formik
          initialValues={initialValue}
          validationSchema={noteSchema}
          onSubmit={handleStatusChange}
        >
          {({ values }) => {
            const count = values.note.length;
            return (
              <Form className="mt-2 space-y-4">
                <label className="block text-sm font-medium text-gray-800" htmlFor="note">
                  Why are you changing the status to{" "}
                  <span className="font-semibold">{status || "—"}</span>? Please leave a note.
                </label>

                <Field
                  as="textarea"
                  id="note"
                  name="note"
                  placeholder="Your note..."
                  className="mt-1 h-[120px] w-full resize-y rounded-lg border border-gray-300/80 p-3 text-sm transition outline-none focus:border-dashboard/60 focus:ring-2 focus:ring-dashboard/20"
                  maxLength={1000}
                />

                <div className="flex items-center justify-between">
                  <ErrorMessage name="note">
                    {(msg) => <p className="text-xs text-red-600">{msg}</p>}
                  </ErrorMessage>
                  <span className="text-xs text-gray-500">{count}/1000</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setState(false)}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full rounded-xl bg-dashboard/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-dashboard disabled:opacity-60"
                  >
                    Confirm
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </DialogProvider>
  );
};

export default ChangeOrderStatusModal;
