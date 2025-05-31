"use client";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";
import ProductForm from "@/components/Dashboard/Product/ProductForm";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ProductCreateView = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const handleSubmit = async (payload: Partial<IProduct>) => {
    const data = await createProduct(payload);
    const error = data.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data?.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Product created successfully");
    router.push("/dashboard/products");

    return;
  };
  return (
    <div className="flex flex-col gap-[20px]">
      <DashboardPageHeadingTitle title="Create Product" />
      <ProductForm isLoading={isLoading} onSubmit={(value) => handleSubmit(value)} />
    </div>
  );
};

export default ProductCreateView;
