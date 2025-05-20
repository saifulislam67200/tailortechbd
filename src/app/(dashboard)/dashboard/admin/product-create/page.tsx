import ProductForm from "@/components/Dashboard/Admin/Product/ProductForm";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("Create Product");
const page = () => {
  return (
    <div className="bg-white p-[16px]">
      <ProductForm />;
    </div>
  );
};

export default page;
