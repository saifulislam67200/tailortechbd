import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useUpdateCategoryMutation } from "@/redux/features/category/category.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ICategory } from "@/types/category";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { cloneElement, isValidElement, ReactElement, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";
import * as Yup from "yup";
import ImageUploader from "../Product/ImageUploader";

interface IProps {
  children?: React.ReactNode;
  onSuccess?: (id: string) => void;
  defaultValue: Partial<ICategory>;
  categoryId: string;
}

const UpdateCategory: React.FC<IProps> = ({ children, onSuccess, defaultValue, categoryId }) => {
  const [open, setOpen] = useState(false);

  const [updatecategory, { isLoading }] = useUpdateCategoryMutation();

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Category label is required"),
    thumbnail: Yup.string()
      .url("Invalid URL")
      .when("display", {
        is: true,
        then: (schema) => schema.required("Thumbnail URL is required when visibility is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
    display: Yup.boolean(),
    parent: Yup.string().optional(),
    banner: Yup.string()
      .url("Invalid URL")
      .when("display", {
        is: true,
        then: (schema) => schema.required("Banner URL is required when visibility is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
    bannerDisplay: Yup.boolean(),
  });

  const initialValues = {
    label: defaultValue.label || "",
    thumbnail: defaultValue.thumbnail || "",
    display: defaultValue.display || false,
    parent: defaultValue.parent || undefined,
    banner: defaultValue.banner || "",
    bannerDisplay: defaultValue.bannerDisplay || false,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await updatecategory({
      _id: categoryId || "",
      payload: values,
    });
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
    onSuccess?.(categoryId || "");
    setOpen(false);
  };

  return (
    <>
      {children && isValidElement(children) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, { onClick: () => setOpen(true) })
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mt-1 w-full cursor-pointer border border-[#c5c5c5] bg-primary py-[6px] text-sm font-bold text-white"
        >
          update Category
        </button>
      )}
      <DialogProvider state={open} setState={setOpen} className="w-full max-w-[700px]">
        <div className="relative w-full transform rounded-lg bg-white shadow-xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Update Category</h3>
              <p className="text-sm text-gray-500">Update category your existing category</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted transition-colors hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

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
                    defaultImages={values.thumbnail ? [values.thumbnail] : undefined}
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
                      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${values.display ? "bg-success" : "bg-muted"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${values.display ? "translate-x-6" : "translate-x-1"
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
                    defaultImages={values.banner ? [values.banner] : undefined}
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
                  <label className="block text-sm font-medium text-primary">
                    Banner Visibility
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setFieldValue("bannerDisplay", !values.bannerDisplay)}
                      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${values.bannerDisplay ? "bg-success" : "bg-muted"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${values.bannerDisplay ? "translate-x-6" : "translate-x-1"
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
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex-1 cursor-pointer rounded-md border border-border-muted bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/5"
                  >
                    Cancel
                  </button>
                  <Button isLoading={isLoading} type="submit" className="flex-1">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogProvider>
    </>
  );
};

export default UpdateCategory;
