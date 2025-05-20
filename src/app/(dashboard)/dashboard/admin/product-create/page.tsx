import ProductForm from "@/components/Dashboard/Admin/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("Create Product");
const page = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <ProductForm />;
      </div>
    </div>
  );
};

export default page;
