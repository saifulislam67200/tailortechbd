import ProductDetails from "@/components/productDetails/ProductDetails";

export interface ProductDetailsProps {
  params: { slug: string };
}

const page = ({ params }: ProductDetailsProps) => {
  return (
    <>
      <ProductDetails params={params} />
    </>
  );
};

export default page;
