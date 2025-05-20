"use client";

import Button from "@/components/ui/Button";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { BiPlusCircle } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import * as Yup from "yup";

const initialValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
  tag: "",
  images: [],
  specifications: [{ label: "", value: "" }],
  colors: [
    {
      color: "",
      images: [],
      sizes: [{ size: "", stock: "" }],
    },
  ],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").min(0, "Price must be >= 0"),
  discount: Yup.number().min(0).max(100),
  tag: Yup.string(),
  images: Yup.array().of(Yup.string().url("Must be a valid URL")),
  specifications: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Plase enter a title for this specification"),
      value: Yup.string().required("Please enter a value for this specification"),
    })
  ),
  colors: Yup.array().of(
    Yup.object().shape({
      color: Yup.string().required("Please enter a color name"),
      images: Yup.array().of(Yup.string().url("Must be a valid URL")),
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

const labelClass = "text-[14px] font-[600] text-black";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-tertiary px-[16px] py-[8px]">
      <span className="text-[16px] font-[700]">{children}</span>
    </div>
  );
};

export default function ProductForm() {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => {}}>
      {({ values, errors, touched }) => (
        <Form className="flex flex-col gap-[16px]">
          <SectionTitle>Basic Information</SectionTitle>
          <div className="w-full">
            <label className={labelClass}>Product Name</label>
            <Field as={Input} name="name" placeholder="Product name" />
            {touched.name && errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="w-full">
            <label className={labelClass}>Description</label>
            <Field as={TextArea} name="description" placeholder="Description" />
            {touched.description && errors.description && (
              <span className="text-danger">{errors.description}</span>
            )}
          </div>

          <div className="flex w-full items-start justify-start gap-[16px]">
            <div className="flex w-full flex-col gap-[5px]">
              <label className={labelClass}>Price</label>
              <Field as={Input} name="price" type="number" placeholder="Price" />
              {touched.price && errors.price && <span className="text-danger">{errors.price}</span>}
            </div>

            <div className="flex w-full flex-col gap-[5px]">
              <label className={labelClass}>Discount</label>
              <Field as={Input} name="discount" type="number" placeholder="Discount %" />
              {touched.discount && errors.discount && (
                <span className="text-danger">{errors.discount}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label className={labelClass}>Tag</label>
            <Field as={Input} name="tag" placeholder="Tag" />
          </div>

          <HorizontalLine className="my-[16px]" />

          <div className="flex flex-col gap-[5px]">
            <SectionTitle>Product Spesification</SectionTitle>
            <FieldArray name="specifications">
              {({ push, remove }) => (
                <div className="mt-[20px] flex flex-col gap-[16px]">
                  {values.specifications.map((spec, index) => (
                    <div key={index} className="flex w-full items-start gap-[8px]">
                      <div className="flex w-full flex-col gap-[8px]">
                        <label className={labelClass}>Spesification Title</label>
                        <Field
                          as={Input}
                          name={`specifications.${index}.label`}
                          placeholder="Title of specification"
                          className="flex-1 rounded border p-[8px]"
                        />
                        <ErrorMessage
                          name={`specifications.${index}.label`}
                          component="span"
                          className="text-sm text-danger"
                        />
                      </div>

                      <div className="flex w-full flex-col gap-[8px]">
                        <div className="flex flex-col gap-[8px]">
                          <label className={labelClass}>Spesification Value</label>
                          <div className="flex w-full items-center gap-[8px]">
                            <Field
                              as={Input}
                              name={`specifications.${index}.value`}
                              placeholder="Value of specification"
                              className="flex-1 rounded border p-[8px]"
                            />{" "}
                            <button
                              className="cursor-pointer"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <BsTrash2 />
                            </button>
                          </div>
                        </div>
                        <ErrorMessage
                          name={`specifications.${index}.value`}
                          component="span"
                          className="text-sm text-danger"
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    className="w-fit bg-primary-foreground"
                    type="button"
                    onClick={() => push({ label: "", value: "" })}
                  >
                    <BiPlusCircle className="mr-1 inline" />
                    Add Specification
                  </Button>
                </div>
              )}
            </FieldArray>
          </div>
          <HorizontalLine className="my-[16px]" />
          {/* Colors */}
          <div className="flex flex-col gap-[5px]">
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
                            className="cursor-pointer"
                            type="button"
                            onClick={() => remove(i)}
                          >
                            <BsTrash2 />
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
                                    <button type="button" onClick={() => remove(j)}>
                                      <BsTrash2 />
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
                              className="cursor-pointer text-primary"
                            >
                              + Add Size
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ color: "", sizes: [{ size: "", stock: "" }], images: [] })
                    }
                    className="cursor-pointer text-primary"
                  >
                    + Add Color
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
            Submit Product
          </button>
        </Form>
      )}
    </Formik>
  );
}
