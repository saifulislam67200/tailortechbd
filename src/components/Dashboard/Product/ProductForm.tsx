"use client";

import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import RichTextArea from "@/components/ui/RichTextArea";
import SectionTitle from "@/components/ui/SectionTitle";
import { IProduct } from "@/types/product";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { FaRegTrashAlt } from "react-icons/fa";
import * as Yup from "yup";
import CategorySelector from "./CategorySelector";
import ImageUploader from "./ImageUploader";
import ProductSizeInput from "./ProductSizeInput";
import UploadProductVideo from "./UploadProductVideo";

const initialValues: Omit<
  IProduct,
  "avgRating" | "brand" | "slug" | "_id" | "specifications" | "createdAt"
> = {
  name: "",
  description: "",
  quickOverview: `
   <p><strong>Quick Overview</strong></p>
  <ul>
    <li><strong>Brand</strong> - Tailortech</li>
    <li><strong>Country of origin</strong> - Bangladesh</li>
    <li><strong>Item</strong> - panjabi</li>
    <li><strong>GSM</strong> - 180</li>
    <li><strong>Fabric composition</strong> -100% cotton</li>
  </ul>
  `,
  chart: [],
  price: 0,
  discount: 0,
  tag: "",
  category: "",
  video: "",
  images: [],
  videoThumbnail: "",
  // specifications: [{ label: "", value: "" }],
  colors: [
    {
      color: "",
      images: [],
      sizes: [{ size: "", stock: 0 }],
    },
  ],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  quickOverview: Yup.string().required("Quick Overview is required"),
  price: Yup.number().required("Price is required").min(0, "Price must be >= 0"),
  discount: Yup.number().min(0).max(100),
  tag: Yup.string(),
  fabric: Yup.string().required("Fabric is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .of(Yup.string().url("Must be a valid URL")),
  category: Yup.string().required("Category is required"),
  video: Yup.string().optional(),
  videoThumbnail: Yup.string().optional(),
  colors: Yup.array().of(
    Yup.object().shape({
      color: Yup.string().required("Please enter a color name"),
      images: Yup.array().of(Yup.string().url("Must be a valid URL")).optional(),
      sizes: Yup.array().of(
        Yup.object().shape({
          size: Yup.string().required("Please enter a size for this color"),
          stock: Yup.number()
            .min(0, "Stock must be greater than 0")
            .required("Please enter stock for his size"),
        })
      ),
    })
  ),
});

const labelClass = "text-[10px] md:text-[14px] font-[600] text-black";

export default function ProductForm({
  onSubmit,
  defaultValue,
  isLoading = false,
  buttonLabel,
}: {
  isLoading?: boolean;
  defaultValue?: typeof initialValues;
  onSubmit: (data: typeof initialValues, helper: FormikHelpers<typeof initialValues>) => void;
  buttonLabel?: string;
}) {
  const initValue = defaultValue
    ? {
        ...defaultValue,
        category:
          typeof defaultValue.category == "string"
            ? defaultValue.category
            : defaultValue.category?._id,
      }
    : undefined;

  return (
    <Formik
      initialValues={initValue || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, ...args) => {
        onSubmit({ ...values, discount: values.discount || 0 }, ...args);
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched, isValid, submitCount }) => (
        <Form className="flex flex-col gap-[16px]">
          {values.videoThumbnail}
          <div className="grid grid-cols-1 gap-[16px] xl:grid-cols-2">
            <div className="flex w-full flex-col gap-[16px] bg-white p-[16px]">
              <SectionTitle>Basic Information</SectionTitle>
              <div className="w-full">
                <label className={labelClass}>Product Name</label>
                <Field as={Input} name="name" placeholder="Product name" />
                {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}
              </div>

              <div className="flex w-full flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Price</label>
                  <Field as={Input} name="price" type="number" placeholder="Price" />
                  {touched.price && errors.price && (
                    <span className="text-danger">{errors.price}</span>
                  )}
                </div>

                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Discount</label>
                  <Field as={Input} name="discount" type="number" placeholder="Discount %" />
                  {touched.discount && errors.discount && (
                    <span className="text-danger">{errors.discount}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start justify-start gap-[16px] sm:flex-row">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Tag</label>
                  <Field as={Input} name="tag" placeholder="Tag" />
                </div>
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Category</label>
                  <CategorySelector
                    category={
                      defaultValue?.category
                        ? typeof defaultValue?.category == "string"
                          ? defaultValue.category
                          : defaultValue.category?.label
                        : undefined
                    }
                    onSelect={({ value }) => setFieldValue("category", value)}
                  />

                  <ErrorMessage name="category" component="span" className="text-sm text-danger" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[16px]">
                <div className="flex w-full flex-col gap-[5px]">
                  <label className={labelClass}>Fabric</label>
                  <Field as={Input} name="fabric" placeholder="Fabric" />
                  {touched.fabric && errors.fabric && (
                    <span className="text-danger">{errors.fabric}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-[16px] bg-white p-[16px]">
              <SectionTitle>Product Image Gallery</SectionTitle>
              <ImageUploader
                defaultImages={defaultValue?.images}
                onChange={(urls) => {
                  setFieldValue("images", urls || []);
                }}
              />
              <ErrorMessage name="images" component="span" className="text-sm text-danger" />
            </div>
          </div>
          <div className="w-full bg-white p-[16px]">
            <SectionTitle className="mb-[15px]">Product Video</SectionTitle>

            <label className={labelClass}>Product Video</label>

            <UploadProductVideo
              onChange={(video) => {
                setFieldValue("video", video.videoUrl);
                setFieldValue("videoThumbnail", video.thumbnailUrl);
              }}
            />

            {touched.video && errors.video && <span className="text-danger">{errors.video}</span>}
          </div>
          <HorizontalLine className="my-[16px]" />
          <div className="w-full bg-white p-[16px]">
            <SectionTitle className="mb-[15px]">Product Description</SectionTitle>

            <label className={labelClass}>Description</label>
            {/* <Field as={TextArea} name="description" placeholder="Description" /> */}

            <RichTextArea
              onChange={(e) => {
                setFieldValue("description", e);
              }}
              handleBlur={() => setFieldTouched("description", true)}
              defaultValue={values.description}
            />

            {touched.description && errors.description && (
              <span className="text-danger">{errors.description}</span>
            )}
          </div>
          <HorizontalLine className="my-[16px]" />
          <div className="w-full bg-white p-[16px]">
            <SectionTitle className="mb-[15px]">Quick Overview</SectionTitle>

            <label className={labelClass}>Overview</label>
            <RichTextArea
              onChange={(e) => {
                setFieldValue("quickOverview", e);
              }}
              handleBlur={() => setFieldTouched("quickOverview", true)}
              defaultValue={values.quickOverview}
            />

            {touched.quickOverview && errors.quickOverview && (
              <span className="text-danger">{errors.quickOverview}</span>
            )}
          </div>
          <HorizontalLine className="my-[16px]" />
          <div className="flex w-full flex-col gap-[5px] bg-white p-[16px]">
            <SectionTitle>Product Chart (Size)</SectionTitle>
            <ProductSizeInput
              defaultValue={defaultValue?.chart}
              onChange={(data) => setFieldValue("chart", data)}
            />
          </div>
          <HorizontalLine className="my-[16px]" />
          <div className="flex flex-col gap-[5px] bg-white p-[16px]">
            <SectionTitle>Product Color & Sizes</SectionTitle>
            <FieldArray name="colors">
              {({ push, remove }) => (
                <div className="mt-[20px] flex w-full flex-col items-start gap-[16px]">
                  {values.colors.map((color, i) => (
                    <div key={i} className="w-full space-y-2 rounded border border-solid-slab p-4">
                      <div className="flex w-full flex-col items-start gap-[8px]">
                        <label className={labelClass}>Color</label>
                        <div className="flex w-full items-center justify-start gap-[8px]">
                          <Field
                            as={Input}
                            name={`colors.${i}.color`}
                            placeholder="Color"
                            className="flex-1 rounded border p-[8px]"
                          />
                          <button
                            className="cursor-pointer text-danger"
                            type="button"
                            onClick={() => remove(i)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                        <ErrorMessage
                          name={`colors.${i}.color`}
                          component="span"
                          className="text-sm text-danger"
                        />
                      </div>

                      {/* Sizes inside each color */}
                      <FieldArray name={`colors.${i}.sizes`}>
                        {({ push, remove }) => (
                          <div className="flex w-full flex-col items-start gap-[16px]">
                            {color.sizes.map((_size, j) => (
                              <div key={j} className="flex w-full items-start gap-[8px]">
                                <div className="flex w-full flex-col items-start gap-[8px]">
                                  <label className={labelClass}>Size </label>
                                  <Field
                                    as={Input}
                                    name={`colors.${i}.sizes.${j}.size`}
                                    placeholder="Size"
                                    className="flex-1 rounded border p-[8px]"
                                  />
                                  <ErrorMessage
                                    name={`colors.${i}.sizes.${j}.size`}
                                    component="span"
                                    className="text-sm text-danger"
                                  />
                                </div>
                                <div className="flex w-full flex-col gap-[8px]">
                                  <label className={labelClass}>Stock </label>
                                  <div className="flex items-center gap-[8px]">
                                    <Field
                                      as={Input}
                                      name={`colors.${i}.sizes.${j}.stock`}
                                      placeholder="Stock"
                                      type="number"
                                      className="flex-1 rounded border p-[8px]"
                                    />{" "}
                                    <button
                                      type="button"
                                      onClick={() => remove(j)}
                                      className="cursor-pointer text-danger"
                                    >
                                      <FaRegTrashAlt />
                                    </button>
                                  </div>
                                  <ErrorMessage
                                    name={`colors.${i}.sizes.${j}.stock`}
                                    component="span"
                                    className="text-sm text-danger"
                                  />
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ size: "", stock: "" })}
                              className="cursor-pointer text-[14px] text-primary md:text-[16px]"
                            >
                              + Add Size
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <ImageUploader
                        defaultImages={defaultValue?.colors[i]?.images}
                        inputId={`colors.${i}.image_uploader`}
                        onChange={(urls) => setFieldValue(`colors.${i}.images`, urls)}
                      >
                        <h6 className="text-[14px] font-[700] md:text-[16px]">
                          You can upload image for this color{" "}
                        </h6>
                        <p className="text-[14px] text-muted md:text-[16px]">
                          uploading image for color variant is optional
                        </p>
                      </ImageUploader>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ color: "", sizes: [{ size: "", stock: "" }], images: [] })
                    }
                    className="cursor-pointer text-[14px] text-primary md:text-[16px]"
                  >
                    + Add Color
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
          {submitCount > 0 && !isValid && (
            <div className="flex w-full flex-col gap-[10px] bg-white p-[16px]">
              <span className="font-[700] text-danger">Please Fix These Errors Below:</span>
              {Object.values(errors).map((value, i) => (
                <span key={i + "error"} className="text-sm text-danger">
                  *{" "}
                  {typeof value === "string"
                    ? value
                    : "Please fill the color and sizes form correctly"}
                </span>
              ))}
            </div>
          )}
          <Button type="submit" isLoading={isLoading} className="mt-[26px]">
            {buttonLabel || "Create Product"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
