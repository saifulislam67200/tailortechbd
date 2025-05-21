"use client";

import ProductForm from "@/components/Dashboard/Admin/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import DataNotFound from "@/components/ui/DataNotFound";
import Loader from "@/components/ui/Loader";
import {
  useGetProductByProductSlugQuery,
  useUpdateProductByProductIdMutation,
} from "@/redux/features/product/product.api";
import { IQueruMutationErrorResponse } from "@/types";
import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditProductView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetProductByProductSlugQuery(slug);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductByProductIdMutation();
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Product Not Found" />;
  }

  const handleSubmit = async (payload: Partial<IProduct>) => {
    if (isUpdating) {
      return;
    }
    const res = await updateProduct({
      productId: data.data._id,
      payload,
    });
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error?.data?.message) {
        toast(error.data.message);
      } else {
        toast("Something went wrong");
      }
      return;
    }

    toast.success("Product updated successfully");
    router.push("/dashboard/admin/products");
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <ProductForm
          formLabel={`Edit product - ${data.data.name}`}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          defaultValue={{
            ...data.data,
            category:
              typeof data.data.category === "string" ? data.data.category : data.data.category?._id,
          }}
        />
      </div>
    </div>
  );
};

export default EditProductView;
