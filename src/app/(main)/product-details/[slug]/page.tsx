import ProductDetails from "@/components/productDetails/ProductDetails";



export interface ProductDetailsProps {
    params: { slug: string };
}

const page = ({ params }: ProductDetailsProps) => {

    return (
        <div>
            <ProductDetails params={params} />
        </div>
    );
};

export default page;