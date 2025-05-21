"use client";
import ProductForm from "@/components/Dashboard/Admin/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ProductCreateView = () => {
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();

  const handleSubmit = async (payload: Partial<IProduct>) => {
    const data = await createProduct(payload);
    const error = data.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data.message);
      } else {
        toast("Something went wrong");
      }

      return;
    }

    toast.success("Product created successfully");
    router.push("/dashboard/admin/products");

    return;
  };
  return (
    <div className="flex flex-col gap-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <ProductForm formLabel="Create a new product" onSubmit={(value) => handleSubmit(value)} />;
      </div>
    </div>
  );
};

export default ProductCreateView;
