import Button from "@/components/ui/Button";
import { useCreateCategoryMutation } from "@/redux/features/category/category.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsEye } from "react-icons/bs";
import { toast } from "sonner";
import * as Yup from "yup";
import ImageUploader from "../Product/ImageUploader";

const CreateCategoryForm = () => {
  const [create, { isLoading }] = useCreateCategoryMutation();

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Category label is required"),
    thumbnail: Yup.string()
      .url("Invalid URL")
      .when("display", {
        is: true,
        then: (schema) => schema.required("Thumbnail URL is required when visibility is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
    banner: Yup.string()
      .url("Invalid URL")
      .when("display", {
        is: true,
        then: (schema) => schema.required("Banner URL is required when visibility is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
    display: Yup.boolean(),
    bannerDisplay: Yup.boolean(),
  });

  const initialValues = {
    label: "",
    thumbnail: "",
    display: false,
    banner: "",
    bannerDisplay: false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await create(values);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Category created successfully");
    router.push("/dashboard/manage-category");
  };

  return (
    <>
      <div className="relative w-full transform rounded-lg bg-white transition-all">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6 p-6">
              <div className="space-y-2">
                <label htmlFor="label" className="block text-sm font-[700] text-primary">
                  Category Label <span className="text-danger">*</span>
                </label>
                <Field
                  id="label"
                  name="label"
                  placeholder="Enter category name"
                  className="w-full rounded-md border border-border-muted px-3 py-2 placeholder-muted shadow-sm focus:ring-2 focus:outline-none"
                />
                <ErrorMessage name="label" component="p" className="text-sm text-danger" />
              </div>

              <div className="space-y-2">
                <ImageUploader
                  inputId="thumbnail-uploader"
                  onChange={(images) => {
                    const lastImage = images ? images[images.length - 1] : "";
                    setFieldValue("thumbnail", lastImage);
                  }}
                >
                  <label htmlFor="thumbnail" className="block text-sm font-[700] text-primary">
                    Thumbnail URL <span className="text-muted">(optional)</span>
                  </label>
                </ImageUploader>
                <ErrorMessage name="thumbnail" component="p" className="text-sm text-danger" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">Visibility</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setFieldValue("display", !values.display)}
                    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                      values.display ? "bg-success" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        values.display ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <div className="flex items-center space-x-2">
                    {values.display ? (
                      <>
                        <BsEye className="h-4 w-4 text-success" />
                        <span className="text-sm text-primary">Visible to Homepage</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Toggle whether this category should be displayed to users on the homepage bellow
                  the banner is top categories section.
                </p>
              </div>

              {/* banner  */}

              <div className="mt-10 space-y-2 border-t border-slate-200 pt-10">
                <ImageUploader
                  inputId="banner-uploader"
                  onChange={(images) => {
                    const lastImage = images ? images[images.length - 1] : "";
                    setFieldValue("banner", lastImage);
                  }}
                >
                  <label htmlFor="banner" className="block text-sm font-[700] text-primary">
                    Banner URL <span className="text-muted">(optional)</span>
                  </label>
                </ImageUploader>
                <ErrorMessage name="banner" component="p" className="text-sm text-danger" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">Banner Visibility</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setFieldValue("bannerDisplay", !values.bannerDisplay)}
                    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                      values.bannerDisplay ? "bg-success" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        values.bannerDisplay ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <div className="flex items-center space-x-2">
                    {values.bannerDisplay ? (
                      <>
                        <BsEye className="h-4 w-4 text-success" />
                        <span className="text-sm text-primary">Visible on Category Page</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Toggle to show or hide this category banner on the category page.
                </p>
              </div>

              <div className="flex gap-3 rounded-b-lg border-t border-gray-200 bg-gray-50 pt-6">
                <Link
                  href="/dashboard/manage-category"
                  className="flex-1 cursor-pointer rounded-md border border-border-muted bg-white px-4 py-2 text-center text-sm font-medium text-primary shadow-sm hover:bg-primary/5"
                >
                  Cancel
                </Link>
                <Button isLoading={isLoading} type="submit" className="flex-1">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateCategoryForm;
