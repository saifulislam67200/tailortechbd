import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useAppSelector } from "@/hooks/redux";
import {
  useCreateComplaintSuggestionMutation,
  useUpdateComplaintSuggestionByIdMutation,
} from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useMemo } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";
import * as Yup from "yup";

const FEEDBACK_TYPES = ["Complaint", "Suggestion", "Both", "Other"];
const CS_CATEGORIES = [
  "Delivery & Packing",
  "Product Quality",
  "Website Usability",
  "Customer service",
  "Price & Discount",
  "Return & Refund",
  "New Product Request",
  "Color",
  "Print/Embroidery",
  "Product Design",
  "Others",
];
export interface IComplainFormValues {
  customerName: string;
  orderId: string;
  feedbackType: string;
  csCategory: string;
  priority: string;
  satisfaction: string;
  message: string;
}
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

const validationSchema = Yup.object({
  customerName: Yup.string().required("* Customer name is required"),
  orderId: Yup.string()
    .matches(/^ORD-\d{8}-\d{3,}$/, "Invalid order ID format")
    .required("Order ID is required"),
  feedbackType: Yup.string().required("* Feedback type is required"),
  csCategory: Yup.string().required("* Category is required"),
  priority: Yup.string().required("* Priority is required"),
  satisfaction: Yup.number()
    .typeError("Satisfaction must be 1–5")
    .min(1, "Min 1")
    .max(5, "Max 5")
    .required("* Satisfaction is required"),
  message: Yup.string()
    .required("* Message is required")
    .min(10, "Please write at least 10 characters."),
});
const ComplainAndSuggestionForm = ({
  defaultValues,
  onSuccess,
  onCancel,
}: {
  defaultValues?: IComplainFormValues & { _id: string };
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [createComplaint, { isLoading }] = useCreateComplaintSuggestionMutation();
  const [updateComplaint, { isLoading: isUpdating }] = useUpdateComplaintSuggestionByIdMutation();

  const initialValues = useMemo(
    () =>
      defaultValues || {
        customerName: user?.fullName || "",
        orderId: "",
        feedbackType: "",
        csCategory: "",
        priority: "",
        satisfaction: "",
        message: "",
      },
    [user?.fullName, defaultValues]
  );

  const handleComplain = async (
    values: IComplainFormValues,
    { resetForm }: FormikHelpers<IComplainFormValues>
  ) => {
    if (isLoading || isUpdating) return;
    const payload = {
      customerName: values.customerName,
      orderId: values.orderId,
      feedbackType: values.feedbackType,
      csCategory: values.csCategory,
      priority: values.priority,
      satisfaction: Number(values.satisfaction),
      status: "pending" as const,
      message: values.message,
    };

    const response = await (defaultValues
      ? updateComplaint({ payload, id: defaultValues?._id || "" })
      : createComplaint(payload));
    const error = response.error as IQueruMutationErrorResponse;
    if (error) {
      toast.error(error.data?.message || "Something went wrong");
      return;
    }

    toast.success("Complaint/Suggestion sent successfully");
    resetForm();
    onSuccess?.();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleComplain}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-[16px] md:space-y-[24px]">
          {/* Row 1: Customer Name, Order ID */}
          <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Customer Name *</label>
              <Field
                name="customerName"
                as={Input}
                placeholder="Enter customer name"
                className="rounded-md border border-border-main bg-white px-3 text-[14px] outline-none"
              />
              <ErrorMessage
                name="customerName"
                component="span"
                className="text-[12px] text-danger"
              />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Order ID *</label>
              <Field
                name="orderId"
                as={Input}
                placeholder="Enter order ID"
                className="rounded-md border border-border-main bg-white px-3 text-[14px] outline-none"
              />
              <ErrorMessage name="orderId" component="span" className="text-[12px] text-danger" />
            </div>
          </div>

          {/* Row 2: Category, Feedback Type */}
          <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">C &amp; S-Category *</label>
              <Field
                as="select"
                name="csCategory"
                className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
              >
                <option value="" disabled>
                  Select category
                </option>
                {CS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="csCategory"
                component="span"
                className="text-[12px] text-danger"
              />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Feedback Type *</label>
              <Field
                as="select"
                name="feedbackType"
                className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
              >
                <option value="" disabled>
                  Select feedback type
                </option>
                {FEEDBACK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="feedbackType"
                component="span"
                className="text-[12px] text-danger"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 md:gap-[24px]">
            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Priority *</label>
              <Field
                as="select"
                name="priority"
                className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
              >
                <option value="" disabled>
                  Select priority
                </option>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="priority" component="span" className="text-[12px] text-danger" />
            </div>

            <div className="flex w-full flex-col gap-[6px]">
              <label className="text-[12px] text-strong">Satisfaction Rating (1–5) *</label>
              <Field
                as="select"
                name="satisfaction"
                className="w-full rounded-md border border-border-main bg-white px-3 py-2 text-[14px] outline-none"
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="satisfaction"
                component="span"
                className="text-[12px] text-danger"
              />
            </div>
          </div>

          {/* Row 4: Action Taken */}
          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] text-strong">Message *</label>
            <Field
              name="message"
              as={TextArea}
              rows={5}
              placeholder="Describe your issue in details"
            />
            <ErrorMessage name="message" component="span" className="text-[12px] text-danger" />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full cursor-pointer rounded-lg border border-border-main px-6 py-3 font-semibold text-strong hover:bg-solid-slab"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading || isUpdating}
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:opacity-90"
            >
              <span className="relative">
                {isSubmitting || isLoading || isUpdating ? (
                  <span className="mr-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent align-[-2px]" />
                ) : (
                  <FiSend className="mr-2 h-[20px] w-[20px]" />
                )}
              </span>
              {isSubmitting || isLoading || isUpdating ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ComplainAndSuggestionForm;
