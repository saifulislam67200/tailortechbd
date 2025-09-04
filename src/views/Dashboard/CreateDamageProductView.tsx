"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import Input from "@/components/ui/Input";
import SectionTitle from "@/components/ui/SectionTitle";
import SelectionBox from "@/components/ui/SelectionBox";
import TextArea from "@/components/ui/TextArea";
import useDebounce from "@/hooks/useDebounce";
import {
  useCreateDamagedProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/product.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IProduct } from "@/types/product";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";
import * as Yup from "yup";
const schema = Yup.object().shape({
  productId: Yup.string().required("Please Select a product"),
  quantity: Yup.number().required("Quantity is required").positive("Quantity must be positive"),
  causeOfDamage: Yup.string().required("Cause of damage is required"),
  price: Yup.number().required("Price is required").min(0, "Price must be positive"),
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
});

const initialValues = {
  productId: "",
  quantity: 0,
  causeOfDamage: "",
  price: 0,
  color: "",
  size: "",
};

const CreateDamageProductView = () => {
  const [search, setSearch] = useDebounce("");
  const { data } = useGetAllProductsQuery({ searchTerm: search });

  const [selectProduct, setSelectProduct] = useState<IProduct | null>();
  const [isOpen, setIsOpen] = useState(false);

  const [createDamageProduct] = useCreateDamagedProductMutation();

  const router = useRouter();

  const hanldeSubmit = async (
    values: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    const size = selectProduct?.colors
      .find((color) => color.color === values.color)
      ?.sizes.find((size) => size.size === values.size);

    if (!size) {
      toast.error("Select a valid color and size");
      return;
    }

    if (size.stock < values.quantity) {
      helper.setFieldError(
        "quantity",
        `Damage product qunatity must be less than actual poduct stock:${size.stock}`
      );
      return;
    }

    const res = await createDamageProduct(values);
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Damage product created successfully");

    helper.resetForm();
  };

  return (
    <>
      {" "}
      <button
        onClick={() => router.back()}
        className="mb-5 flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
      >
        <BsArrowLeft size={14} />
      </button>
      <div className="min-h-[50vh] w-full bg-white p-4">
        <DashboardPageHeadingTitle title="Create Damaged Products" />

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={hanldeSubmit}>
          {({ setFieldValue, values, touched, errors }) => (
            <>
              <Form className="mt-4">
                <SectionTitle>Product information</SectionTitle>
                {selectProduct ? (
                  <>
                    <div className="mt-4 flex flex-col gap-3">
                      <div className="mt-4 flex flex-col gap-[10px]">
                        <label className="font-primary text-[14px] font-bold">
                          Damaged product
                        </label>
                        <div className="flex w-[400px] cursor-pointer items-center gap-2 border-[1px] border-border-main bg-white p-2">
                          <span className="w-[60px]">
                            <Image
                              src={selectProduct.images[0]}
                              width={100}
                              height={100}
                              alt={selectProduct.name}
                              className="w-full object-contain"
                            />
                          </span>

                          <div className="flex flex-col gap-1">
                            <h4 className="line-clamp-2 text-[16px] font-bold">
                              {selectProduct.name}
                            </h4>
                            <p className="text-[14px] font-semibold text-muted">
                              ৳ {selectProduct.price}
                            </p>
                            <span className="text-[12px]">{selectProduct.sku}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="flex w-fit cursor-pointer items-center gap-1 bg-success/20 px-4 py-1 text-success duration-[0.2s] hover:bg-success hover:text-white"
                          onClick={() => setIsOpen(true)}
                        >
                          Select Other <GoPlus />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-col gap-[10px]">
                        <label className="font-primary text-[14px] font-bold">Price</label>
                        <Field
                          type="number"
                          as={Input}
                          name="price"
                          placeholder="Price"
                          className="mt-2 w-full border-[1px] border-border-main bg-white p-2"
                        />

                        <ErrorMessage
                          name="price"
                          component={"span"}
                          className="text-[12px] text-danger"
                        />
                      </div>

                      <div className="mt-4 flex flex-col gap-[10px]">
                        <label className="font-primary text-[14px] font-bold">Color</label>
                        <SelectionBox
                          onSelect={(item) => setFieldValue("color", item.value)}
                          data={selectProduct.colors.map((color) => {
                            return {
                              label: color.color,
                              value: color.color,
                            };
                          })}
                        />
                        <ErrorMessage
                          name="color"
                          component="span"
                          className="text-[12px] text-danger"
                        />
                      </div>

                      {values.color ? (
                        <div className="mt-4 flex flex-col gap-[10px]">
                          <label className="font-primary text-[14px] font-bold">Size</label>
                          <SelectionBox
                            onSelect={(item) => setFieldValue("size", item.value)}
                            data={
                              selectProduct.colors
                                .find((color) => color.color === values.color)
                                ?.sizes.map((size) => {
                                  return {
                                    label: size.size,
                                    value: size.size,
                                  };
                                }) || []
                            }
                          />
                          <ErrorMessage
                            name="size"
                            component="span"
                            className="text-[12px] text-danger"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {values.size ? (
                        <div className="mt-4 flex flex-col gap-[10px]">
                          <label className="font-primary text-[14px] font-bold">Quantity</label>
                          <Field
                            type="number"
                            as={Input}
                            name="quantity"
                            placeholder="Quantity"
                            className="mt-2 w-full border-[1px] border-border-main bg-white p-2"
                          />

                          {touched.quantity && errors.quantity && (
                            <span className="text-[12px] text-danger">{errors.quantity}</span>
                          )}
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="mt-4 flex flex-col gap-[10px]">
                        <label className="font-primary text-[14px] font-bold">
                          Cause of damage
                        </label>
                        <Field
                          as={TextArea}
                          name="causeOfDamage"
                          placeholder="Cause of damage"
                          className="mt-2 w-full border-[1px] border-border-main bg-white p-2"
                        />

                        <ErrorMessage
                          name="causeOfDamage"
                          component={"span"}
                          className="text-[12px] text-danger"
                        />
                      </div>

                      <Button type="submit" title="Submit" className="mt-4">
                        Submit
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="mt-4 flex w-fit cursor-pointer items-center gap-1 bg-success/20 px-4 py-1 text-success duration-[0.2s] hover:bg-success hover:text-white"
                      type="button"
                      onClick={() => setIsOpen(true)}
                    >
                      Select Product
                    </button>
                    <ErrorMessage name="productId" component={"span"} />
                  </>
                )}
              </Form>
              <DialogProvider state={isOpen} setState={setIsOpen} className="max-w-[800px]">
                <div className="bg-white p-4">
                  <label className="font-primary text-[14px] font-bold">Select Product</label>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Product"
                    className="mt-2 w-full border-[1px] border-border-main bg-white p-2"
                  />
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    {data?.data.map((product) => {
                      return (
                        <div
                          key={product._id}
                          onClick={() => {
                            setSelectProduct(product);
                            setFieldValue("productId", product._id);
                            setIsOpen(false);
                          }}
                          className="flex cursor-pointer items-center gap-2 border-[1px] border-border-main bg-white p-2 hover:bg-primary/5"
                        >
                          <span className="w-[60px]">
                            <Image
                              src={product.images[0]}
                              width={100}
                              height={100}
                              alt={product.name}
                              className="w-full object-contain"
                            />
                          </span>

                          <div className="flex flex-col gap-1">
                            <h4 className="line-clamp-2 text-[16px] font-bold">{product.name}</h4>
                            <p className="text-[14px] font-semibold text-muted">
                              ৳ {product.price}
                            </p>
                            <span className="text-[12px]">{product.sku}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DialogProvider>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateDamageProductView;
