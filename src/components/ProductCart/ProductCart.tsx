import Breadcrumb from "../ui/BreadCrumbs";
import DetailsAndPrice from "./DetailsAndPrice";
import ProductList from "./ProductList";

const ProductCart = () => {
  return (
    <section className="mx-auto max-w-[1756px] px-[16px] py-[10px] transition-all sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px]">
      <Breadcrumb />
      <div className="mt-[18px] flex min-h-[60vh] flex-col gap-[10px] lg:flex-row">
        <ProductList />
        <DetailsAndPrice />
      </div>
    </section>
  );
};

export default ProductCart;
