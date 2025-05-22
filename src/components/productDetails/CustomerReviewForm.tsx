import { Formik, Form, Field, ErrorMessage } from "formik";
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
  const handleSubmit = async (values: ReviewFormValues) => {
    //! temporary => no-unused-vars, i will fix this when i implement the api
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const reviewData = {
      productId,
      name: values.name,
      reviewText: values.reviewText,
      starRating: values.starRating,
    };
  };

  return (
    <div className="mt-[15px] w-full rounded-[5px] border border-quaternary bg-white p-[20px]">
      <Formik
        initialValues={{ name: "", reviewText: "", starRating: 0 }}
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
              className="flex h-[35px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-primary text-[14px] font-semibold text-white hover:text-black sm:w-[127px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
