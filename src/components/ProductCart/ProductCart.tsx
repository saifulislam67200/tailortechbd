import MostPopular from "../Home/MostPopular";
import Breadcrumb from "../ui/BreadCrumbs";
import DetailsAndPrice from "./DetailsAndPrice";
import ProductList from "./ProductList";

const ProductCart = () => {
  return (
    <section className="main_container w-full py-[10px]">
      <Breadcrumb />
      <div className="mt-[18px] flex min-h-[40vh] flex-col gap-[10px] lg:flex-row">
        <ProductList />
        <DetailsAndPrice />
      </div>
      <div className="mt-[20px]">
        <MostPopular title="People also buy" />
      </div>
    </section>
  );
};

export default ProductCart;
