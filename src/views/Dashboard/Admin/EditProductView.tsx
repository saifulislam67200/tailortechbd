"use client";

import ProductForm from "@/components/Dashboard/Admin/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import DataNotFound from "@/components/ui/DataNotFound";
import Loader from "@/components/ui/Loader";
import { useGetProductByProductSlugQuery } from "@/redux/features/product/product.api";

const EditProductView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = useGetProductByProductSlugQuery(slug);

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <DataNotFound title="Product Not Found" />;
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <ProductForm
          formLabel={`Edit product - ${data.data.name?.slice(0, 20)}....`}
          onSubmit={() => {}}
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
