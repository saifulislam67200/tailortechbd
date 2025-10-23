"use client";
import ImageUploader from "@/components/Dashboard/Product/ImageUploader";
import { useAppSelector } from "@/hooks/redux";
import { useCreateReviewMutation } from "@/redux/features/review/review.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IProduct } from "@/types/product";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import * as Yup from "yup";

const MAX_REVIEW_LENGTH = 500;

const validationSchema = Yup.object({
  rating: Yup.number().min(1, "Please provide a rating").required("Required"),
  reviewText: Yup.string().optional(),
  images: Yup.array()
    .of(Yup.string().url("Invalid image URL"))
    .max(3, `You can upload up to ${3} images`)
    .optional(),
});

const initialValues = {
  rating: 0,
  reviewText: "",
  images: [],
};

type ReviewFormProps = {
  productToReview: {
    item: Partial<IProduct> & { product_id: string };
    orderId?: string;
  };
  setIsReviewOpen: (value: boolean) => void;
};

const ReviewForm = ({ productToReview, setIsReviewOpen }: ReviewFormProps) => {
  const [createReview] = useCreateReviewMutation();
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    const reviewData = {
      productId: productToReview?.item?.product_id,
      starRating: values.rating,
      reviewText: values.reviewText,
      name: user?.fullName,
      orderId: productToReview?.orderId,
      images: values.images,
    };

    const result = await createReview(reviewData);
    const error = result.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        if (error?.data?.message === "Validation error") {
          toast("Something went wrong");
        } else {
          toast(error.data?.message);
        }
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Review submitted successfully");
    resetForm();
    setIsReviewOpen(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="relative my-[30px] w-full sm:p-[10px]">
          <button
            onClick={() => setIsReviewOpen(false)}
            className="absolute -top-13 right-0 flex cursor-pointer items-center gap-1 text-info transition-colors duration-200 hover:text-black sm:-top-3 sm:right-3"
          >
            <MdOutlineKeyboardBackspace size={20} /> <span className="sm:hidden">back</span>{" "}
            <span className="hidden sm:block"> back to product</span>
          </button>

          <div className="mb-[20px]">
            <label className="sr-only">Rating</label>
            <Rating
              onClick={(rate) => setFieldValue("rating", rate)}
              initialValue={values.rating}
              size={24}
              allowHover={true}
              SVGstyle={{ display: "inline-block" }}
              transition
              className="flex"
            />
            <span className="ml-3 text-[14px] font-medium">
              {values.rating === 1 && "Disappointed"}
              {values.rating === 2 && "Bad"}
              {values.rating === 3 && "Good"}
              {values.rating === 4 && "Great"}
              {values.rating === 5 && "Excellent Product"}
            </span>
            <ErrorMessage name="rating" component="div" className="mt-1 text-xs text-red-500" />
          </div>

          <div className="mb-[16px]">
            <label className="text-dark text-[14px] font-medium">Write About This Product</label>
            <Field
              as="textarea"
              name="reviewText"
              className="border-accent-light mt-[10px] h-[50px] w-full rounded-[10px] border px-[12px] pt-[13px] text-[12px] focus:border-primary focus:outline-none sm:h-[75px] sm:px-[18px] sm:pt-[10px] sm:text-[14px]"
              placeholder="Write about the product"
              maxLength={MAX_REVIEW_LENGTH}
            />
            <div className="flex items-center justify-between">
              <span
                className={`text-xs ${values.reviewText.length > MAX_REVIEW_LENGTH ? "text-red-500" : "text-gray-400"}`}
              >
                {values.reviewText.length}/{MAX_REVIEW_LENGTH}
              </span>
            </div>
          </div>

          <div className="mb-[16px]">
            <ImageUploader
              inputId="review-image-upload"
              labelStyle="!h-[120px] !rounded-[5px]"
              defaultImages={values.images}
              onChange={(urls) => setFieldValue("images", urls || [])}
            />
            <ErrorMessage name="images" component="div" className="mt-1 text-xs text-red-500" />
          </div>

          <button
            type="submit"
            className="mt-[20px] flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[16px] text-background disabled:opacity-60 sm:w-[150px]"
            disabled={isSubmitting || values.rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
