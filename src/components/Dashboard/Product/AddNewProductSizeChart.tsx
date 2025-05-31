import DialogProvider from "@/components/ui/DialogProvider";
import TableInput from "@/components/ui/TableInput";
import { useCreateSizeChartMutation } from "@/redux/features/productSizeChart/productSizeChart.api";
import { IQueruMutationErrorResponse } from "@/types";
import { Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "sonner";
import Input from "@/components/ui/Input";

export interface ISizeChart {
  label: string;
  chart: string[][];
}

const initialValues: ISizeChart = {
  label: "",
  chart: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
};

const validationSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  chart: Yup.array().of(Yup.array().of(Yup.string())).min(1, "Chart must have at least one row"),
});

const AddNewProductSizeChart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createSizeChart, { isLoading }] = useCreateSizeChartMutation();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (payload: ISizeChart) => {
    const result = await createSizeChart(payload);

    const error = result.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }

    toast.success("Size chart created successfully");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer border-[1px] border-primary bg-primary/80 px-[8px] py-[4px] text-[12px] text-white hover:bg-primary/100"
      >
        Add New
      </button>

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="mx-[16px] min-h-[60dvh] w-full max-w-[1300px] flex-col bg-white p-[16px] md:mx-[0px] md:w-full"
      >
        <h1 className="mb-5 w-full text-left text-[14px] font-semibold text-info capitalize md:text-[16px] lg:text-[18px]">
          Create new Quick Size Chart
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="text-sm font-medium text-info">Label</label>
                <div className="flex w-full items-center gap-2">
                  <Field
                    as={Input}
                    name="label"
                    placeholder="Label"
                    className="flex-1 rounded border p-2"
                  />
                </div>
                <ErrorMessage name="label" component="span" className="text-sm text-red-500" />
              </div>

              <div>
                <label className="text-sm font-medium text-info">Size Chart</label>
                <TableInput
                  defaultValue={values.chart}
                  onChange={(data) => setFieldValue("chart", data)}
                />
                <ErrorMessage name="chart" component="span" className="text-sm text-red-500" />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer rounded bg-info px-4 py-2 text-sm text-white hover:bg-primary disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </DialogProvider>
    </div>
  );
};

export default AddNewProductSizeChart;
