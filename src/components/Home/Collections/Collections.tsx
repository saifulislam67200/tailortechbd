import { IProduct } from "@/types/product";
import Title from "../../ui/Title";
import ProductCard from "./ProductCard";
const Collections = async () => {
  const res = await fetch("http://localhost:5000/api/v1/product/get", {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    return (
      <section className="w-full py-[16px]">
        <Title title="Collections" className="!text-[14px]" />
        <div className="mt-4 flex h-[200px] items-center justify-center text-center">
          <div className="rounded-md bg-red-100 px-6 py-4 text-red-700">
            <p className="text-[14px] font-semibold">Failed to load collections.</p>
            <p className="text-[13px]">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const data = await res.json();
  const collections: IProduct[] = data?.data || [];

  return (
    <section className="w-full py-[16px]">
      <Title title="Collections" className="!text-[14px]" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {collections?.map((item) => <ProductCard key={item._id} product={item} />)}
      </div>
    </section>
  );
};

export default Collections;
