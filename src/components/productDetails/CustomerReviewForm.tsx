"use client";
import { useAppSelector } from "@/hooks/redux";
import { useCreateReviewMutation } from "@/redux/features/review/review.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

interface ReviewFormValues {
  name: string;
  reviewText: string;
  starRating: number;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  reviewText: Yup.string().required("Review is required"),
  starRating: Yup.number().required("Rating is required").min(1, "Please select a rating"),
});

const ReviewForm = ({ productId }: { productId: string }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = async (
    values: ReviewFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const payload = {
      productId,
      name: values.name,
      reviewText: values.reviewText,
      starRating: Number(values.starRating),
    };
    const result = await createReview(payload);
    const error = result?.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast.error(error.data.message, { id: "error" });
      } else {
        toast("Something went wrong");
      }

      return;
    }
    resetForm();
    toast("Review submitted successfully!");
  };

  return (
    <div className="mt-[15px] w-full rounded-[5px] border border-quaternary bg-white p-[20px]">
      <Formik
        initialValues={{ name: user?.fullName as string, reviewText: "", starRating: 0 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            {/* Star Rating Input */}
            <div className="mb-4">
              <label className="mb-2 block">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`cursor-pointer text-2xl ${star <= values.starRating ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setFieldValue("starRating", star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <ErrorMessage
                name="starRating"
                component="div"
                className="text-[12px] text-red-500"
              />
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="h-[55px] w-full rounded-[5px] border border-quaternary p-[10px] focus:outline-none"
              />
              <ErrorMessage name="name" component="div" className="text-[12px] text-red-500" />
            </div>

            {/* Review Text Input */}
            <div className="mb-4">
              <label htmlFor="reviewText" className="mb-2 block">
                Review
              </label>
              <Field
                id="reviewText"
                name="reviewText"
                as="textarea"
                className="h-[80px] w-full rounded-[5px] border border-quaternary p-[10px] focus:outline-none lg:h-[150px]"
              />
              <ErrorMessage
                name="reviewText"
                component="div"
                className="text-[12px] text-red-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[5px] ${user && user.role === "user" ? "bg-primary" : "pointer-events-none bg-info"} text-[14px] font-semibold text-white opacity-85 hover:text-black hover:opacity-100 sm:w-[127px]`}
              disabled={isSubmitting || isLoading || !user || user?.role !== "user"}
            >
              {isLoading ? "Submitting..." : "Submit Question"}
            </button>
            {(!user || user?.role !== "user") && (
              <p className="mt-[10px] text-[12px] text-red-500">
                You need to be logged in as a user to review a product.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
