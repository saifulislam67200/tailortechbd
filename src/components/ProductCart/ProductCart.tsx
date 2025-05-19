import Breadcrumb from "../ui/BreadCrumbs"
import DetailsAndPrice from "./DetailsAndPrice";
import ProductList from "./ProductList";

const ProductCart = () => {
  return (
    <section className="max-w-[1756px] mx-auto px-[16px] sm:px-[36px] md:px-[50px] lg:px-[95px] 2xl:px-[0px] transition-all py-[10px]">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row mt-[18px] gap-[10px]">
        <ProductList />
        <DetailsAndPrice />
      </div>
    </section>
  )
}

export default ProductCart;